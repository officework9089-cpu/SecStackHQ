import { supabaseAdmin } from "@/integrations/supabase/client.server";
export async function hashValue(value: string) { return Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)))).map((v) => v.toString(16).padStart(2,"0")).join(""); }
export async function allowUsage(request: Request, kind: "ai" | "contact") {
  const ip = request.headers.get("cf-connecting-ip") ?? "unverified-network";
  const key = `${kind}:${await hashValue(ip)}`;
  const { data, error } = await supabaseAdmin.rpc("consume_usage", { _key: key, _limit: kind === "ai" ? 10 : 3, _seconds: 3600 });
  if (error) throw new Error("Usage protection is unavailable. Please try again later.");
  if (!data) return false;
  if (kind === "ai") {
    const global = await supabaseAdmin.rpc("consume_usage", { _key: "ai:daily-global", _limit: 100, _seconds: 86400 });
    if (global.error) throw new Error("Usage protection is unavailable.");
    return !!global.data;
  }
  return true;
}
export function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  return origin === new URL(request.url).origin;
}