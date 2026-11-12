import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, ArrowLeft, Check, Calculator } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { services } from "@/data/platform";
import { usePlatform } from "@/store/platform";
import { estimateScope } from "./rules";
import { useAIAction } from "./use-action";

const featuresList = ["Authentication", "Payments", "Dashboard", "Integrations", "Content management", "Analytics"];
export default function ProjectEstimator() {
  const [step, setStep] = useState(0); const [type, setType] = useState("web"); const [features, setFeatures] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("Standard"); const [budget, setBudget] = useState("Not sure yet"); const navigate = useNavigate(); const ai = useAIAction();
  const estimate = estimateScope(type, features, timeline); const service = services.find((s) => s.id === type);
  const summary = `${service?.title ?? "Web Development"}. Features: ${features.join(", ") || "Core essentials"}. Timeline: ${timeline}. Budget: ${budget}. Illustrative estimate: $${estimate.low.toLocaleString()}–$${estimate.high.toLocaleString()} USD, approximately ${estimate.weeks} weeks. Suggested stack: ${estimate.stack}.`;
  return <div className="border rounded-lg bg-card overflow-hidden"><div className="p-6 sm:p-8 border-b"><div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold flex gap-3 items-center"><Calculator className="text-primary" />Project estimator</h2><Badge variant="secondary">{step === 3 ? "Summary" : `${step + 1} / 3`}</Badge></div><div className="flex gap-2">{[0,1,2,3].map((i) => <span key={i} className={`h-1 flex-1 rounded-full ${i <= step ? "bg-primary" : "bg-muted"}`} />)}</div></div><div className="p-6 sm:p-8 min-h-80">
    {step === 0 && <><h3 className="font-semibold mb-5">What are we building together?</h3><div className="grid sm:grid-cols-2 gap-3">{services.map((s) => <Button key={s.id} variant={type === s.id ? "secondary" : "outline"} className="justify-start min-h-12 h-auto whitespace-normal py-3 text-left" onClick={() => setType(s.id)}><s.icon />{s.short}{type === s.id && <Check className="ml-auto" />}</Button>)}</div></>}
    {step === 1 && <><h3 className="font-semibold mb-5">Which capabilities matter?</h3><div className="grid sm:grid-cols-2 gap-4">{featuresList.map((f) => <Label key={f} className="border rounded-md flex gap-3 items-center p-4 cursor-pointer"><Checkbox checked={features.includes(f)} onCheckedChange={(checked) => setFeatures((prev) => checked ? [...prev, f] : prev.filter((v) => v !== f))} />{f}</Label>)}</div></>}
    {step === 2 && <div className="space-y-6"><div><Label>Delivery preference</Label><Select value={timeline} onValueChange={setTimeline}><SelectTrigger className="h-12 mt-2"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Standard">Standard</SelectItem><SelectItem value="Accelerated">Accelerated</SelectItem></SelectContent></Select></div><div><Label>Budget range (USD)</Label><Select value={budget} onValueChange={setBudget}><SelectTrigger className="h-12 mt-2"><SelectValue /></SelectTrigger><SelectContent>{["Not sure yet", "Under $5,000", "$5,000–$15,000", "$15,000–$50,000", "$50,000+"].map((v) => <SelectItem value={v} key={v}>{v}</SelectItem>)}</SelectContent></Select></div></div>}
    {step === 3 && <div aria-live="polite"><Badge variant="outline">AI-generated · {ai.demo ? "Demo" : "Live"} · Sample estimate</Badge><h3 className="text-3xl font-bold mt-5">${estimate.low.toLocaleString()}–${estimate.high.toLocaleString()}</h3><p className="text-sm text-muted-foreground mt-2">USD · indicative only, not a quote</p><p className="mt-5 leading-7 text-sm">{summary}</p><div className="border-t mt-6 pt-5 text-sm leading-7">{ai.isPending && <p className="text-primary">{ai.thinking ? "Thinking…" : "Writing scope guidance…"}</p>}{ai.text && <ReactMarkdown skipHtml>{ai.text}</ReactMarkdown>}{ai.error && <div role="alert" className="text-destructive">{ai.error.message}<Button variant="ghost" onClick={() => ai.mutate(summary)}>Retry</Button></div>}</div><Button className="h-12 mt-6" onClick={() => { usePlatform.getState().setIntake({ service: service?.short ?? "Web Development", subject: "Project estimate inquiry", message: `${summary}\n\n${ai.text}`.slice(0,2000) }); void navigate({ to: "/contact" }); }}>Send to SecStackHQ <ArrowRight /></Button></div>}
    <div className="flex justify-between mt-8">{step > 0 && <Button variant="ghost" onClick={() => setStep(step - 1)}><ArrowLeft />Back</Button>}{step < 3 && <Button className="ml-auto h-11" onClick={() => { setStep(step + 1); if (step === 2) ai.mutate(`Help scope this project using only SecStackHQ knowledge. ${summary}`); }}>{step === 2 ? "Generate scope" : "Continue"}<ArrowRight /></Button>}</div>
  </div></div>;
}