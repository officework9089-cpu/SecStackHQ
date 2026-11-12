# SecStackHQ

Technology, security and growth platform built with TanStack Start, React, Tailwind, Motion, AI Elements and React Three Fiber.

## Development

Install with `bun install`, then `bun run dev`. Run tests with `bun run test` and lint with `bun run lint`. Lovable runs the production checks automatically.

## Pages

Home, About, Services and six service detail pages, Projects and case studies, sample Pricing, AI Lab and Contact have real URLs and individual metadata. Projects filters use search parameters.

## AI

The default is Demo mode. Live calls use Lovable AI Gateway Responses, server-held credentials and streamed output. All AI features use the same demo/live preference. Chat is currently a session-only prototype; conversation shape and retention remain pending user confirmation. Stop cancels the active request. Tool actions do not automatically retry.

Private usage protection currently caps live AI at 10 requests/network/hour and 100 requests/day globally, and inquiries at 3/network/hour. These proposed limits are pending approval. Without a trusted network header the shared fallback bucket is conservative. This does not guarantee abuse prevention. Gateway 402/403 blocks persist privately; recovery requires owner action after the underlying access or credit issue is resolved. No automatic probes run.

## Contact

Validated inquiries save privately in Lovable Cloud. The browser reads back only subject/service through a random bearer receipt; there is no public inquiry list. Email and WhatsApp actions open prefilled messages, not automatic delivery. QA inquiries may remain in private storage.

## Content and tools

All prices, project evidence and team illustrations are samples, not approved offers or verified customer results. Contact details remain placeholders pending confirmation. Edit content in the data modules rather than page layouts.

The security scanner is strictly simulated and never contacts its URL. Actual pentesting requires written authorization. The estimator returns indicative sample costs, not quotes. Smart contact suggestions must be reviewed before submission. No subscriptions or payments are sold here.

## Verification

15 rule/validation/routing tests pass. Browser checks covered all page URLs, demo/live chat and live follow-up, simulated scan, estimate-to-contact prefilling, private save/receipt readback, theme switching and widths 320/768/1440. Three-dimensional layers rendered in the sandbox. Real GPU performance, touch feel and published-host behavior have not been measured. Check the preview on actual devices before publishing. The homepage preview is scripted, not a live code generator.
