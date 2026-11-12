import { createOpenAI } from "@ai-sdk/openai";
import { streamText, type ModelMessage, type UIMessage } from "ai";

import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayRunId,
  withLovableAiGatewayRunIdHeader,
} from "./run-id.ts";

export function createResponsesCall(
  request: Request,
  config: { baseURL: string; apiKey: string; model: string },
  messages: ModelMessage[],
  instructions?: string,
) {
  const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
  let failure: { status: number; message: string } | undefined;
  const provider = createOpenAI({
    baseURL: `${config.baseURL.replace(/\/+$/, "").replace(/\/v1$/, "")}/v1`,
    apiKey: config.apiKey,
    headers: { "Lovable-API-Key": config.apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: async (input, init) => {
      const response = await runIdFetch.fetch(input, init);
      if (!response.ok) {
        const body = await response.clone().json().catch(() => ({})) as { message?: string; error?: { message?: string } };
        failure = { status: response.status, message: body.message ?? body.error?.message ?? "Live AI is unavailable." };
        if (response.status === 402 || response.status === 403) {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          await supabaseAdmin.from("ai_access_state").upsert({ key: "gateway", ...failure });
        }
      }
      return response;
    },
  });
  const reasoning = config.model !== "openai/chat-latest";
  const result = streamText({
    model: provider.responses(config.model),
    // AI SDK 6 lacks `instructions`: rename this key to `system` there.
    ...(instructions ? { instructions } : {}),
    messages,
    abortSignal: request.signal,
    maxRetries: 0,
    maxOutputTokens: 2000,
    providerOptions: {
      openai: {
        store: false,
        ...(reasoning
          ? {
              forceReasoning: true,
              reasoningEffort: "medium",
              reasoningSummary: "auto",
              include: ["reasoning.encrypted_content"],
            }
          : {}),
      },
    },
  });
  return {
    result,
    response: async (messages: UIMessage[]) => {
      const response = await withLovableAiGatewayRunIdHeader(result.toUIMessageStreamResponse({ originalMessages: messages, sendReasoning: true, onError: (error) => failure?.message ?? (error instanceof Error ? error.message : "Live AI request failed.") }), runIdFetch);
      if (failure) return Response.json({ message: failure.message }, { status: failure.status });
      response.headers.set("X-AI-Mode", "live");
      return response;
    },
  };
}
