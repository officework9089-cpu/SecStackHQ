import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Wand2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import type { ContactInput } from "@/lib/contact-schema";
import { matchService } from "./rules";
import { useAIAction } from "./use-action";
export function SmartContact({ onApply }: { onApply: (data: Partial<ContactInput>) => void }) {
  const [need, setNeed] = useState(""); const ai = useAIAction(); const service = matchService(need);
  const priority = /urgent|asap|breach|immediately/i.test(need) ? "Time-sensitive" : "Standard";
  return <div className="bg-surface border-b p-6 sm:p-8"><h2 className="font-bold flex gap-2 items-center"><Wand2 className="text-primary size-5" />A clearer brief, with AI</h2><Textarea value={need} onChange={(e) => setNeed(e.target.value)} maxLength={1200} className="mt-4 min-h-24 bg-background" aria-label="Describe your project for AI" placeholder="I need a secure customer portal for my business…" /><Button variant="outline" className="mt-3 h-11" disabled={ai.isPending || need.trim().length < 10} onClick={() => ai.mutate(`Suggest the matching service, priority and a concise refined project inquiry. Do not invent details. Need: ${need}`)}><Wand2 />{ai.isPending ? "Thinking…" : "Refine my brief"}</Button>{ai.error && <p role="alert" className="text-sm text-destructive mt-3">{ai.error.message}</p>}{ai.text && <div className="mt-5 text-sm leading-7 space-y-3"><div className="flex flex-wrap gap-2"><Badge variant="secondary">AI-generated · {ai.demo ? "Demo" : "Live"}</Badge><Badge variant="outline">{service?.short}</Badge><Badge variant="outline">{priority}</Badge></div><ReactMarkdown skipHtml>{ai.text}</ReactMarkdown><Button className="h-11" onClick={() => onApply({ service: service?.short ?? "Web Development", subject: `${service?.short ?? "Project"} inquiry`, message: `${need}\n\nPriority: ${priority}\n\n${ai.text}`.slice(0,2000) })}><Check />Use in my form</Button></div>}</div>;
}