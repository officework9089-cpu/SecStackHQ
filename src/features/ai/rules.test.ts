import { describe, expect, it } from "vitest";
import { simulateScan, scanUrlSchema, matchService, estimateScope } from "./rules";
import { planTotal } from "@/data/platform";
describe("platform tool rules", () => {
  it("keeps security reports simulated", () => { expect(simulateScan("https://example.com")).toMatchObject({ simulated: true, score: 68 }); });
  it("rejects non-web schemes and credential URLs", () => { for (const url of ["file:///etc/passwd", "ftp://example.com", "https://user:pass@example.com"]) expect(scanUrlSchema.safeParse(url).success).toBe(false); });
  it("keeps SEO and digital marketing separate", () => { expect(matchService("SEO organic search")?.id).toBe("seo"); expect(matchService("paid ads campaign")?.id).toBe("marketing"); });
  it("computes annual sample billing from twelve months", () => { expect(planTotal("starter",true)).toBe(4788); expect(planTotal("growth",true)).toBe(14388); expect(planTotal("enterprise",true)).toBe(38388); });
  it("adds feature scope and accelerated sample pricing", () => { expect(estimateScope("web",["Payments"],"Accelerated")).toMatchObject({ low:9063, high:11782, weeks:5 }); });
});