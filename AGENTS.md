<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture
- Use TanStack file routes for content and detail pages, with PlatformShell in the root; real URLs keep navigation, metadata and deep links coherent.
- Reusable motion primitives live in `src/components/motion` (built on `motion/react`); shared variants in `src/animations/variants.ts`. Reuse them instead of ad-hoc animation code.
- Site content (services, projects, stats, contact details) lives in `src/data/site.ts` so copy edits never touch components.
- Visual effects (glass, glowing borders, gradients, grid) are `@utility` classes in `src/styles.css`; components use those plus semantic color tokens only.
- Contact form validation rules live in `src/lib/contact-schema.ts` (zod) and are covered by `src/test/contact-schema.test.ts`.
- Platform content and sample plans live in data modules; shared service IDs connect tools, service pages and inquiry handoffs.
- AI Elements render message parts and the SDK transport consumes UI-message streams; conversation storage choices are pending user confirmation.
- Keep live gateway helpers under src/server/ai and use per-request providers; server routes stream AI and server functions save private inquiries.
- Usage windows and gateway blocks persist privately in Cloud; no browser-only or in-memory server counters protect paid calls.
- 3D modules are lazy-loaded behind ClientOnly with local lighting; semantic CSS tokens supply material colors.
