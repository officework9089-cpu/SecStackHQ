const brandLogos = [
  { name: "FinVault", tag: "FINTECH" },
  { name: "CloudScale", tag: "CLOUD" },
  { name: "Aether Labs", tag: "AI / ML" },
  { name: "NovaPay", tag: "PAYMENTS" },
  { name: "KiteWorks", tag: "SAAS" },
  { name: "CyberGuard", tag: "SECURITY" },
  { name: "NexusAI", tag: "INFRASTRUCTURE" },
];

export function About() {
  return (
    <section
      id="about"
      aria-label="Trusted brands and partners"
      className="relative border-y border-border/60 bg-card/30 py-8 sm:py-10 backdrop-blur-sm"
    >
      {/* <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <p className="mb-6 text-center text-xs font-bold tracking-widest text-muted-foreground uppercase">
          Trusted by innovative teams &amp; fast-growing brands
        </p>
      </div> */}

      {/* Edge-faded Infinite Marquee */}
      <div className="relative mx-auto w-full max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="animate-marquee flex w-max items-center gap-6 py-1">
          {[...brandLogos, ...brandLogos, ...brandLogos].map((brand, idx) => (
            <div
              key={`${brand.name}-${idx}`}
              className="glass flex items-center gap-3 rounded-2xl border border-border/60 px-6 py-3.5 transition-colors hover:border-[#2f6bff]/50"
            >
              <span className="size-2 rounded-full bg-[#2f6bff]" />
              <span className="font-['Sora'] text-base font-bold tracking-tight text-foreground/90">
                {brand.name}
              </span>
              <span className="rounded-md bg-muted px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider text-muted-foreground">
                {brand.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}