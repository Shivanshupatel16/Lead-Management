import { z } from "zod";

export const leadCreateDTO = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().min(7, "Phone is required").optional().or(z.literal("")),
  source: z.string().optional().default("Website"),
  notes: z.string().max(500).optional().or(z.literal("")),
  status: z.enum(["new", "in-progress", "converted", "lost"]).optional()
});

export const leadQueryDTO = z.object({
  q: z.string().optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
  status: z.string().optional()
});
