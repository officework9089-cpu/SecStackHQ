import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";
import { contactSchema } from "./contact-schema";
const submission = contactSchema.extend({ website: z.string().max(200).default("") });
export const saveInquiry = createServerFn({ method: "POST" }).inputValidator((input: unknown) => submission.parse(input)).handler(async ({ data }) => {
  const request = getRequest();
  const { allowUsage, sameOrigin, hashValue } = await import("@/server/request-safety");
  if (!sameOrigin(request) || data.website) throw new Error("Unable to accept this request.");
  if (!(await allowUsage(request, "contact"))) throw new Error("Too many inquiries. Please try again later or contact us by email.");
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const receipt = crypto.randomUUID();
  const { website: _honeypot, ...values } = data;
  const { data: saved, error } = await supabaseAdmin.from("inquiries").insert({ ...values, receipt_hash: await hashValue(receipt) }).select("id").single();
  if (error || !saved) throw new Error("Your request could not be saved. Please try again or use email.");
  return { id: saved.id, receipt };
});
export const readInquiryReceipt = createServerFn({ method: "POST" }).inputValidator((input: unknown) => z.object({ id: z.string().uuid(), receipt: z.string().uuid() }).parse(input)).handler(async ({ data }) => {
  const { hashValue } = await import("@/server/request-safety");
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data: record, error } = await supabaseAdmin.from("inquiries").select("subject,service,created_at").eq("id", data.id).eq("receipt_hash", await hashValue(data.receipt)).single();
  if (error || !record) throw new Error("Receipt unavailable.");
  return record;
});