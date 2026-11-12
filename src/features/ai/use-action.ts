import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useReducedMotion } from "motion/react";
import { readUIMessageStream, type UIMessageChunk } from "ai";
import { usePlatform } from "@/store/platform";
import { promptSchema } from "./rules";
import { mockAnswer } from "./mock";

export interface AIClient { run(prompt: string, signal: AbortSignal, onText: (text: string) => void): Promise<string> }
export function useAIAction() {
  const [text, setText] = useState(""); const [thinking, setThinking] = useState(false);
  const controller = useRef<AbortController | null>(null); const reduced = useReducedMotion();
  const demo = usePlatform((s) => s.demo);
  const mutation = useMutation({ mutationFn: async (value: string) => {
    const prompt = promptSchema.parse(value); controller.current?.abort(); controller.current = new AbortController();
    const signal = controller.current.signal; setText(""); setThinking(true);
    const mockClient: AIClient = { run: async (p, abort, update) => {
      const result = mockAnswer(p); let output = "";
      for (const chunk of result.match(/.{1,20}/gs) ?? [result]) { if (abort.aborted) break; output += chunk; if (!reduced) update(output); await new Promise((r) => setTimeout(r, reduced ? 0 : 20)); }
      update(output); return output;
    }};
    if (demo) { setThinking(false); return mockClient.run(prompt, signal, setText); }
    const response = await fetch("/api/ai", { method: "POST", headers: { "Content-Type": "application/json" }, signal, body: JSON.stringify({ mode: "live", route: window.location.pathname, messages: [{ id: "action", role: "user", parts: [{ type: "text", text: prompt }] }] }) });
    if (!response.ok) { const error = await response.json() as { message?: string }; throw new Error(error.message ?? "Live AI is unavailable."); }
    if (!response.body) throw new Error("No AI response received.");
    const reader = response.body.getReader(); const decoder = new TextDecoder(); let buffer = "";
    const stream = new ReadableStream<UIMessageChunk>({ async start(out) {
      try { while (true) { const chunk = await reader.read(); if (chunk.done) break; buffer += decoder.decode(chunk.value, { stream: true }); const events = buffer.split("\n\n"); buffer = events.pop() ?? ""; for (const event of events) { const line = event.split("\n").find((l) => l.startsWith("data: ")); if (line && line !== "data: [DONE]") out.enqueue(JSON.parse(line.slice(6)) as UIMessageChunk); } } out.close(); } catch (error) { out.error(error); }
    }});
    let final = "";
    for await (const message of readUIMessageStream({ stream })) { final = message.parts.filter((p) => p.type === "text").map((p) => p.text).join(""); if (final) setThinking(false); if (!reduced) setText(final); }
    if (!final.trim() && !signal.aborted) throw new Error("AI returned no answer. Please start a fresh request.");
    setText(final); setThinking(false); return final;
  }, onError: () => setThinking(false), onSettled: () => setThinking(false), retry: false });
  return { ...mutation, text, thinking, demo, stop: () => { controller.current?.abort(); setThinking(false); } };
}