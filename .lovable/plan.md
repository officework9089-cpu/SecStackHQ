# SecStackHQ AI-native platform upgrade

## Outcome
Evolve the existing site into a premium multi-page technology and security platform with a service arm. Preserve the logo, Sora/Manrope typography, brand palette, light/dark themes, existing imagery, and reusable motion system.

## Pages and navigation
- Home: prominent SecStackHQ identity, interactive prompt-to-result preview, AI Lab teaser, six services, proof, and project/contact calls to action.
- About: story, mission, values, animated stats, and clearly labeled sample team/proof content where real details are unavailable.
- Services: six separate services, each with a dedicated detail page containing features, process, FAQs, and contact CTA.
- Projects: filterable portfolio with URL-backed filters and dedicated case studies. Label existing sample projects/results; hide unavailable external links rather than link to `#`.
- Pricing: Starter, Growth, and Enterprise with monthly/annual selection. Use **clearly labeled sample prices**, as requested; no checkout or claims that prices are approved.
- AI Lab: security scanner, guided estimator, assistant access, and prompt-to-result demonstrations.
- Contact: editable AI-assisted intake, validated form, email and WhatsApp links using the central contact data.
- Animated not-found page and route error states.
- Shared page navigation, mobile drawer, footer, skip link, progress bar, route transitions, command palette, and AI launcher.
- Omit the optional mock login/dashboard; this upgrade does not require user accounts.

## AI experiences
1. **Command palette:** fuzzy keyboard navigation, theme selection, service shortcuts, AI actions, and natural-language intents such as security case-study filtering.
2. **Assistant:** context-aware desktop panel/mobile sheet, grounded local knowledge, suggested prompts, streamed Markdown, Stop, copy, regenerate, and explicit uncertainty.
3. **Security scanner:** clearly labeled simulated results only, URL validation, progress visualization, severity findings, illustrative risk gauge, and pentest CTA. Never fetch or scan the submitted target.
4. **Project estimator:** project type, features, timeline, and budget wizard; scope, stack, rough timeline, and sample price range; send an editable summary to Contact.
5. **Generative home preview:** front-end prompt-to-result choreography, usable without a network connection.
6. **Smart contact:** suggest service, priority, and refined message, applying suggestions only after visitor confirmation.

Every generated result identifies whether it is live AI or a demo. Demo mode works without credentials. Missing credentials select demo mode; live failures remain visible errors and never silently turn into fabricated successful answers. Reduced-motion users receive immediate output without typing flourishes.

## Cloud and safety
- Enable Lovable Cloud for server-held AI credentials, private contact submissions, and durable usage protection. Cloud activation will present its own permission dialog.
- Live assistant, estimator explanations, and smart intake use Lovable AI Gateway through the Vercel AI SDK. Scanner and home choreography remain simulations.
- Implement the **custom usage limits you approved** using durable server-side counters rather than browser-only timers. Document their limitations; they cannot guarantee complete abuse prevention.
- Validate inputs on both sides, bound prompt/history sizes, ground answers in approved/sample knowledge, and render Markdown without raw HTML.
- Add contact honeypot, client throttling, server validation, and private submission storage. A success state means the request was actually saved; email/WhatsApp remain available. Automatic inbox delivery is not included without an email service connection.
- Keep provider failures and spending/access blocks visible, clear loading states, and follow terminal-error/retry rules. Live AI usage may require paid credits after the free allowance.

## Technical approach
- Keep the platform's supported **TanStack Start/TanStack Router**, replacing hash-based primary navigation with real routes under `src/routes/`; do not introduce React Router, `src/pages/`, or an Express server.
- Use TanStack's automatic route splitting and lazy AI/3D imports with accessible skeletons and error boundaries.
- Reuse the existing UI library rather than duplicate it. Document semantic tokens in a CSS token file imported by the global stylesheet; remove raw colors from touched sections.
- Centralize site content, pricing samples, service details, case studies, and AI knowledge. Normalize service identifiers across estimator, services, and contact.
- Use Zustand for theme, command palette, and assistant state; TanStack Query for async actions; React Hook Form and Zod for contact/wizard validation.
- Add one lazy-loaded React Three Fiber/drei brand scene, with a static fallback. Keep it unframed, lightweight, and reduced-motion aware.
- Use native streaming server routes for raw AI responses and server functions for serializable contact actions. Secrets and provider helpers stay server-only.
- Add unique metadata per content route, Organization/Service structured data, robots and sitemap. Preserve relative canonical URLs until a domain exists.
- Update `AGENTS.md` to replace the old single-page architecture rule and document the new module boundaries.

## Build sequence
1. Resolve the existing contact test fixture/type error; establish the roadmap and design/state foundation.
2. Shared shell, routes, static pages, detail pages, pricing, metadata, and real navigation.
3. Typed demo/live AI client, knowledge, streaming state, assistant, and command palette.
4. Scanner, estimator/contact handoff, smart contact, Cloud submission flow, and usage protection.
5. Home preview/3D, accessibility, responsive polish, documentation, and verification.

## Verification and delivery
- Run the existing tests plus focused tests for service mapping, URL-only simulated scans, sample price calculations, input limits, usage limits, and AI/contact handoffs.
- Exercise navigation, project filters/deep links, monthly/annual selection, keyboard palette, theme persistence/system preference, all six demo experiences, contact save/readback, and a real live AI request.
- Check 320, 768, 1024, 1440, and 1920px layouts, mobile assistant/drawer, focus handling, reduced motion, image rendering, and 3D fallback/nonblank rendering.
- Inspect runtime and build signals and report any live AI availability blocker without substituting providers or disguising it as demo success.
- Supply README, `.env.example` with no secrets, token documentation, and QA checklist. Target Lighthouse 90+ and report measured results rather than promise scores.
- Sample prices, testimonials, team information, projects, and unverified stats remain visibly samples until you supply approved content. No source download packaging unless requested.