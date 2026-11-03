import { describe, expect, it } from "vitest";

import { buildMailto, contactSchema } from "@/lib/contact-schema";

const valid = {
  name: "Asif Raza",
  email: "asif@example.com",
  subject: "New website",
  service: "Web Development",
  message: "We need a secure company website.",
};

describe("contact form rules", () => {
  it("accepts a complete submission", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects an invalid email", () => {
    expect(contactSchema.safeParse({ ...valid, email: "not-an-email" }).success).toBe(false);
  });

  it("requires a service to be selected", () => {
    expect(contactSchema.safeParse({ ...valid, service: "" }).success).toBe(false);
  });

  it("rejects messages shorter than 10 characters", () => {
    expect(contactSchema.safeParse({ ...valid, message: "hi" }).success).toBe(false);
  });

  it("encodes the subject in the email link", () => {
    expect(buildMailto("hello@secstackhq.com", { ...valid, subject: "A & B" })).toContain("subject=A%20%26%20B");
  });
});
