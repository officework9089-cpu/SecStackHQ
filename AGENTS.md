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
- Single-page marketing site: `src/routes/index.tsx` composes section components from `src/sections/*`; nav scrolls to section ids (user explicitly asked for one long smooth-scroll page).
- Reusable motion primitives live in `src/components/motion` (built on `motion/react`); shared variants in `src/animations/variants.ts`. Reuse them instead of ad-hoc animation code.
- Site content (services, projects, stats, contact details) lives in `src/data/site.ts` so copy edits never touch components.
- Visual effects (glass, glowing borders, gradients, grid) are `@utility` classes in `src/styles.css`; components use those plus semantic color tokens only.
- Contact form validation rules live in `src/lib/contact-schema.ts` (zod) and are covered by `src/test/contact-schema.test.ts`.
