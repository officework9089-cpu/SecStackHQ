import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useLocation } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Copy, RotateCcw, ShieldCheck, X, MessageSquare } from "lucide-react";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse, MessageActions, MessageAction } from "@/components/ai-elements/message";
import { PromptInput, PromptInputTextarea, PromptInputFooter, PromptInputSubmit } from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { usePlatform } from "@/store/platform";
import { Logo } from "@/components/common/Logo";

export default function Assistant() {
  const open = usePlatform((s) => s.assistantOpen); const setOpen = usePlatform((s) => s.setAssistantOpen);
  const demo = usePlatform((s) => s.demo); const setDemo = usePlatform((s) => s.setDemo);
  const prompt = usePlatform((s) => s.prompt); const pathname = useLocation({ select: (s) => s.pathname });
  const [input, setInput] = useState(""); const ref = useRef<HTMLTextAreaElement>(null); const reduced = useReducedMotion();
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/ai", body: () => ({ route: window.location.pathname, mode: usePlatform.getState().demo ? "demo" : "live" }), prepareSendMessagesRequest: ({ messages, body }) => ({ body: { ...body, messages: messages.map((m) => ({ id: m.id, role: m.role, parts: m.parts.filter((p) => p.type === "text") })) } }) }), []);
  const { messages, status, sendMessage, stop, regenerate, setMessages, error, clearError } = useChat({ transport });
  const busy = status === "submitted" || status === "streaming";
  useEffect(() => { if (prompt) { setInput(prompt); usePlatform.setState({ prompt: "" }); } }, [prompt]);
  useEffect(() => { if (open && !busy) ref.current?.focus(); }, [open, busy]);
  const suggestions = pathname.includes("pricing") ? ["Compare the sample plans", "What is billed annually?"] : pathname.includes("projects") ? ["Show me your delivery process", "How do you secure web apps?"] : ["Explain pentesting like I'm a founder", "Help me scope a web application", "What services do you offer?"];
  return <>
    <Button onClick={() => setOpen(true)} className="fixed bottom-5 right-5 z-50 h-12 shadow-depth gap-2 rounded-lg" aria-label="Open SecStack Copilot"><ShieldCheck className="size-5" /><span className="hidden sm:inline">Ask SecStack</span></Button>
    <Sheet open={open} onOpenChange={setOpen}><SheetContent side="right" className="p-0 flex flex-col gap-0 w-full sm:max-w-lg h-[88svh] sm:h-full top-auto bottom-0 rounded-t-lg sm:rounded-none" onOpenAutoFocus={(e) => { e.preventDefault(); ref.current?.focus(); }}>
      <div className="px-6 py-5 border-b"><div className="flex items-center gap-3"><Logo showText={false} /><div><SheetTitle>SecStack Copilot</SheetTitle><SheetDescription>AI-generated · {demo ? "Demo mode" : "Live AI"}</SheetDescription></div></div><div className="mt-4 flex gap-2"><Button variant={demo ? "secondary" : "ghost"} size="sm" onClick={() => { stop(); setMessages([]); clearError(); setDemo(true); }}>Demo</Button><Button variant={!demo ? "secondary" : "ghost"} size="sm" onClick={() => { stop(); setMessages([]); clearError(); setDemo(false); }}>Live AI</Button><Button variant="ghost" size="icon-sm" className="ml-auto" title="Clear conversation" aria-label="Clear conversation" onClick={() => { stop(); setMessages([]); clearError(); }}><RotateCcw /></Button></div></div>
      <Conversation className="min-h-0 flex-1"><ConversationContent className="px-6 py-6 gap-6">
        {messages.length === 0 && <div className="py-6"><ShieldCheck className="size-9 text-primary mb-5" /><h3 className="text-xl font-bold">What are you building?</h3><p className="text-sm text-muted-foreground mt-3 leading-6">Let's turn your next idea into a clear starting point.</p><div className="mt-6 grid gap-2">{suggestions.map((s) => <Button key={s} variant="outline" className="h-auto min-h-11 whitespace-normal justify-start text-left py-3" onClick={() => setInput(s)}>{s}</Button>)}</div></div>}
        {messages.map((message, i) => <Message from={message.role} key={message.id}><MessageContent className={message.role === "user" ? "bg-primary text-primary-foreground" : "bg-transparent"}>{message.parts.map((part, j) => part.type === "text" ? (message.role === "assistant" && !(reduced && busy) ? <MessageResponse key={j}>{part.text}</MessageResponse> : message.role === "user" ? <span key={j}>{part.text}</span> : null) : part.type === "reasoning" ? <details key={j} className="text-xs text-muted-foreground"><summary>Thinking</summary>{part.text}</details> : null)}</MessageContent>{message.role === "assistant" && !busy && <><span className="text-[11px] text-muted-foreground">AI-generated · {demo ? "Demo" : "Live"}</span><MessageActions><MessageAction tooltip="Copy answer" onClick={() => void navigator.clipboard.writeText(message.parts.filter((p) => p.type === "text").map((p) => p.text).join(""))}><Copy /></MessageAction>{i === messages.length - 1 && <MessageAction tooltip="Regenerate" onClick={() => void regenerate()}><RotateCcw /></MessageAction>}</MessageActions></>}</Message>)}
        {(status === "submitted" || (reduced && busy)) && <Shimmer>Thinking…</Shimmer>}
        {error && <div role="alert" className="text-sm text-destructive border border-destructive/30 p-4 rounded-md">{error.message}<Button variant="ghost" className="mt-2" onClick={() => { clearError(); void regenerate(); }}>Retry</Button></div>}
      </ConversationContent><ConversationScrollButton /></Conversation>
      <div className="border-t p-5"><PromptInput onSubmit={({ text }) => { if (!text.trim() || busy) return; clearError(); void sendMessage({ text }); setInput(""); ref.current?.focus(); }}><PromptInputTextarea ref={ref} value={input} onChange={(e) => setInput(e.target.value)} maxLength={2000} placeholder="Ask about your project…" aria-label="Message SecStack Copilot" /><PromptInputFooter><span className="text-xs text-muted-foreground">{input.length}/2000</span><PromptInputSubmit status={status} onStop={stop} disabled={!busy && input.trim().length < 3} className="ml-auto size-11" /></PromptInputFooter></PromptInput><p className="mt-3 text-[11px] leading-5 text-muted-foreground">AI can be inaccurate. Prices and portfolio proof are samples. History is not saved after reload.</p></div>
    </SheetContent></Sheet>
  </>;
}