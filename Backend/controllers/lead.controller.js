import { Lead } from "../models/Lead.js";
import { ok, created, bad } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { leadCreateDTO, leadQueryDTO } from "../validators/lead.dto.js";

export const createLead = asyncHandler(async (req, res) => {
  const parsed = leadCreateDTO.safeParse(req.body);
  if (!parsed.success) return bad(res, parsed.error.issues[0].message);
  const lead = await Lead.create({ ...parsed.data, owner: req.user.id });
  return created(res, { lead });
});

export const listLeads = asyncHandler(async (req, res) => {
  const parsed = leadQueryDTO.safeParse(req.query);
  if (!parsed.success) return bad(res, parsed.error.issues[0].message);
  const { q = "", page = "1", limit = "10", status } = parsed.data;
  const p = parseInt(page, 10), l = parseInt(limit, 10);
  const filter = { owner: req.user.id };
  if (q) {
    filter.$or = [
      { name: { $regex: q, $options: "i" } },
      { email: { $regex: q, $options: "i" } },
      { phone: { $regex: q, $options: "i" } }
    ];
  }
  if (status) filter.status = status;
  const [items, total] = await Promise.all([
    Lead.find(filter).sort({ createdAt: -1 }).skip((p - 1) * l).limit(l),
    Lead.countDocuments(filter)
  ]);
  return ok(res, { items, total, page: p, pages: Math.ceil(total / l), limit: l });
});

export const updateLead = asyncHandler(async (req, res) => {
  const parsed = leadCreateDTO.partial().safeParse(req.body);
  if (!parsed.success) return bad(res, parsed.error.issues[0].message);
  const lead = await Lead.findOneAndUpdate({ _id: req.params.id, owner: req.user.id }, parsed.data, { new: true });
  if (!lead) return bad(res, "Lead not found", 404);
  return ok(res, { lead }, "Updated");
});

export const deleteLead = asyncHandler(async (req, res) => {
  const del = await Lead.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
  if (!del) return bad(res, "Lead not found", 404);
  return ok(res, {}, "Deleted");
});
