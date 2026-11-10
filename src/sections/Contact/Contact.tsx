import { AnimatePresence, motion } from "motion/react";
import { Calculator, CheckCircle2, Loader2, Mail, MapPin, MessageCircle, MessageSquare, Phone, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { Section, SectionHeading } from "@/components/common/SectionHeading";
import { GradientText, MagneticButton, MotionCard, StaggerContainer } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { brand, services } from "@/data/site";
import { buildMailto, buildWhatsApp, contactSchema, type ContactInput } from "@/lib/contact-schema";
import { cn } from "@/lib/utils/calculator";
import { validateContactForm, calculateProjectEstimate } from '@/lib/utils/calculator';


import { FadeIn } from "@/components/motion/FadeIn";

type Errors = Partial<Record<keyof ContactInput, string>>;
const empty: ContactInput = { name: "", email: "", subject: "",company: "", service: "", message: "" };

const contactCards = [
  { icon: Mail, title: "Email us", value: brand.email, href: `mailto:${brand.email}` },
  { icon: MessageCircle, title: "WhatsApp", value: "Chat instantly", href: `https://wa.me/${brand.whatsapp}` },
  { icon: Phone, title: "Call us", value: brand.phone, href: `tel:${brand.phone.replace(/\s/g, "")}` },
  { icon: MapPin, title: "Location", value: brand.location, href: undefined },
];
interface ContactProps {
  initialServiceId?: string;
}

export const Contact: React.FC<ContactProps> = ({ initialServiceId }) => {
  const [values, setValues] = useState<ContactInput>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [selectedServices, setSelectedServices] = useState<string[]>(
    initialServiceId ? [initialServiceId] : ['web', 'cyber']
  );
  const [complexity, setComplexity] = useState<'mvp' | 'growth' | 'enterprise'>('growth');
  const [urgency, setUrgency] = useState<'standard' | 'accelerated'>('standard');

  const estimate = calculateProjectEstimate(selectedServices, complexity, urgency);

  const toggleServiceInEstimate = (id: string) => {
    setSelectedServices((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // keep at least 1
        return prev.filter((s) => s !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [sent, setSent] = useState<ContactInput | null>(null);

  const set = (k: keyof ContactInput, v: string) => {
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const errs: Errors = {};
      parsed.error.issues.forEach((i) => {
        const k = i.path[0] as keyof ContactInput;
        if (!errs[k]) errs[k] = i.message;
      });
      setErrors(errs);
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1200));
    setSent(parsed.data);
    setStatus("success");
    setValues(empty);
  };

  const field = (k: keyof ContactInput) => ({
    id: `contact-${k}`,
    value: values[k],
    "aria-invalid": !!errors[k],
    "aria-describedby": errors[k] ? `contact-${k}-error` : undefined,
    className: cn("h-12 rounded-xl bg-background/60", errors[k] && "border-destructive"),
  });

  const ErrorText = ({ k }: { k: keyof ContactInput }) => (
    <AnimatePresence>
      {errors[k] && (
        <motion.p
          id={`contact-${k}-error`}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="text-destructive text-xs font-medium"
        >
          {errors[k]}
        </motion.p>
      )}
    </AnimatePresence>
  );

  return (
    <Section id="contact">
      <SectionHeading
        eyebrow="Let's talk"
        title={
          <>
            Ready to <GradientText>start your project?</GradientText>
          </>
        }
        description="Tell us what you're building. We'll reply within 24 hours with next steps and a free consultation."
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
        {/* <StaggerContainer className="grid content-start gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {contactCards.map((c) => {
            const inner = (
              <div className="flex items-center gap-4 p-5">
                <span className="bg-gradient-brand text-primary-foreground shadow-glow grid size-12 shrink-0 place-items-center rounded-2xl">
                  <c.icon className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-bold">{c.title}</span>
                  <span className="text-muted-foreground block truncate text-sm">{c.value}</span>
                </span>
              </div>
            );
            return (
              <MotionCard key={c.title} className="border-glow glass shadow-depth rounded-3xl">
                {c.href ? (
                  <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="block">
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </MotionCard>
            );
          })}
        </StaggerContainer> */}
        <div className="">
          <FadeIn direction="right">
            <div className="p-6 sm:p-7 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                    Scope Estimator
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-slate-500">
                  Transparent Benchmarks
                </span>
              </div>

              {/* Service Toggles */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  1. Select Target Disciplines:
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { id: 'web', label: 'Web & App Architecture', base: '6,500' },
                    { id: 'cyber', label: 'Cybersecurity & Pentesting', base: '8,500' },
                    { id: 'design', label: 'UI/UX & Brand Systems', base: '4,500' },
                    { id: 'seo', label: 'Technical SEO Dominance', base: '3,500' },
                    { id: 'marketing', label: 'Paid Ads & Performance Growth', base: '4,000' },
                  ].map((item) => {
                    const selected = selectedServices.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleServiceInEstimate(item.id)}
                        className={`flex items-center justify-between p-2.5 rounded-lg border text-xs font-medium transition-all text-left cursor-pointer ${selected
                          ? 'bg-blue-50 dark:bg-slate-800 border-blue-500/80 dark:border-cyan-400 text-blue-700 dark:text-cyan-300'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[10px] ${selected ? 'bg-blue-600 text-white' : 'border border-slate-300 dark:border-slate-700'}`}>
                            {selected && '✓'}
                          </span>
                          <span>{item.label}</span>
                        </div>
                        <span className="font-mono text-[11px]">{item.base}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Scale / Complexity */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  2. Scale & Surface Tier:
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {(['mvp', 'growth', 'enterprise'] as const).map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setComplexity(tier)}
                      className={`py-2 px-1 rounded-lg border font-medium capitalize text-center transition-all cursor-pointer ${complexity === tier
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                    >
                      {tier === 'mvp' ? 'MVP' : tier}
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculated Output Box */}
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Estimated Investment:
                  </span>
                  <span className="text-2xl font-extrabold font-mono text-cyan-600 dark:text-cyan-400 tabular-nums">
                    {estimate.baseCost.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-2">
                  <span>Estimated Timeline:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    ~ {estimate.timelineWeeks} Weeks
                  </span>
                </div>

                {estimate.breakdown.length > 1 && (
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-1 pt-1">
                    {estimate.breakdown.map((b, i) => (
                      <div key={i} className="flex justify-between">
                        <span className="truncate pr-2">{b.item}</span>
                        <span className="font-mono tabular-nums">
                          {b.cost < 0 ? `-$${Math.abs(b.cost).toLocaleString()}` : `$${b.cost.toLocaleString()}`}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Direct Alternative Channels */}
              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 space-y-2">
                <div className="text-xs text-slate-500 dark:text-slate-400">Prefer instant messaging?</div>
                <div className="flex gap-3">
                  <a
                    href="https://wa.me/15550192834"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2 px-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-emerald-100 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Direct</span>
                  </a>
                  <a
                    href="mailto:hello@secstackhq.com"
                    className="flex-1 py-2 px-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-slate-200 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email HQ</span>
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="border-glow glass shadow-glow-lg relative overflow-hidden rounded-[2rem]"
        >
          <AnimatePresence mode="wait">
            {status === "success" && sent ? (
              <motion.div
                key="ok"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex min-h-[520px] flex-col items-center justify-center gap-5 p-8 text-center"
              >
                <motion.span
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
                  className="bg-gradient-brand text-primary-foreground shadow-glow-lg grid size-20 place-items-center rounded-full"
                >
                  <CheckCircle2 className="size-10" />
                </motion.span>
                <h3 className="text-2xl font-bold">Thanks, {sent.name.split(" ")[0]}!</h3>
                <p className="text-muted-foreground max-w-md">
                  Your request is ready. Send it straight to our team using email or WhatsApp — we'll get back
                  within 24 hours.
                </p>
                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                  <Button variant="hero" size="xl" asChild>
                    <a href={buildMailto(brand.email, sent)}>
                      <Mail /> Send via email
                    </a>
                  </Button>
                  <Button variant="glass" size="xl" asChild>
                    <a href={buildWhatsApp(brand.whatsapp, sent)} target="_blank" rel="noreferrer">
                      <MessageCircle /> Send via WhatsApp
                    </a>
                  </Button>
                </div>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-muted-foreground hover:text-primary text-sm font-semibold"
                >
                  Start a new message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                noValidate
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid gap-5 p-6 sm:grid-cols-2 sm:p-10"
              >
                <div className="grid gap-2">
                  <Label htmlFor="contact-name">Name</Label>
                  <Input {...field("name")} placeholder="Asif Raza" autoComplete="name" maxLength={100} onChange={(e) => set("name", e.target.value)} />
                  <ErrorText k="name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contact-email">Email</Label>
                  <Input {...field("email")} type="email" placeholder="info@secstackhq.com" autoComplete="email" maxLength={255} onChange={(e) => set("email", e.target.value)} />
                  <ErrorText k="email" />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="contact-company">Company / Organization</Label>
                  <Input {...field("company")} placeholder="SecStackHQ" maxLength={150} onChange={(e) => set("company", e.target.value)} />
                  <ErrorText k="company" />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="contact-subject">Subject</Label>
                  <Input {...field("subject")} placeholder="New website for my startup" maxLength={150} onChange={(e) => set("subject", e.target.value)} />
                  <ErrorText k="subject" />
                </div>
                <fieldset className="grid gap-2.5 sm:col-span-2">
                  <legend className="mb-2.5 text-sm font-medium">Service you need</legend>
                  <div className="flex flex-wrap gap-2" role="radiogroup" aria-invalid={!!errors.service}>
                    {services.map((s) => {
                      const on = values.service === s.short;
                      return (
                        <motion.button
                          type="button"
                          key={s.id}
                          role="radio"
                          aria-checked={on}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => set("service", s.short)}
                          className={cn(
                            "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all",
                            on
                              ? "bg-gradient-brand text-primary-foreground shadow-glow border-transparent"
                              : "bg-background/60 hover:border-primary",
                          )}
                        >
                          <s.icon className="size-4" /> {s.short}
                        </motion.button>
                      );
                    })}
                  </div>
                  <ErrorText k="service" />
                </fieldset>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="contact-message">Message</Label>
                  <Textarea
                    {...field("message")}
                    className={cn("min-h-36 rounded-xl bg-background/60", errors.message && "border-destructive")}
                    placeholder="Tell us about your project, goals and timeline…"
                    maxLength={2000}
                    onChange={(e) => set("message", e.target.value)}
                  />
                  <ErrorText k="message" />
                </div>
                <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                  <a
                    href={`https://wa.me/${brand.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground hover:text-primary flex items-center gap-2 text-sm font-semibold"
                  >
                    <MessageCircle className="size-4" /> Prefer WhatsApp? Chat now
                  </a>
                  <MagneticButton className="w-full sm:w-auto">
                    <Button type="submit" variant="hero" size="xl" className="w-full" disabled={status === "loading"}>
                      {status === "loading" ? (
                        <>
                          <Loader2 className="animate-spin" /> Sending…
                        </>
                      ) : (
                        <>
                          Send message <Send />
                        </>
                      )}
                    </Button>
                  </MagneticButton>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </Section>
  );
}
