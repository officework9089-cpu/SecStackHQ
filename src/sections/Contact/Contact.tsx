import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, Loader2, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
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
import { cn } from "@/lib/utils";

type Errors = Partial<Record<keyof ContactInput, string>>;
const empty: ContactInput = { name: "", email: "", subject: "", service: "", message: "" };

const contactCards = [
  { icon: Mail, title: "Email us", value: brand.email, href: `mailto:${brand.email}` },
  { icon: MessageCircle, title: "WhatsApp", value: "Chat instantly", href: `https://wa.me/${brand.whatsapp}` },
  { icon: Phone, title: "Call us", value: brand.phone, href: `tel:${brand.phone.replace(/\s/g, "")}` },
  { icon: MapPin, title: "Location", value: brand.location, href: undefined },
];

export function Contact() {
  const [values, setValues] = useState<ContactInput>(empty);
  const [errors, setErrors] = useState<Errors>({});
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
        <StaggerContainer className="grid content-start gap-4 sm:grid-cols-2 lg:grid-cols-1">
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
        </StaggerContainer>

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
                  <Input {...field("name")} placeholder="Jane Doe" autoComplete="name" maxLength={100} onChange={(e) => set("name", e.target.value)} />
                  <ErrorText k="name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contact-email">Email</Label>
                  <Input {...field("email")} type="email" placeholder="jane@company.com" autoComplete="email" maxLength={255} onChange={(e) => set("email", e.target.value)} />
                  <ErrorText k="email" />
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
