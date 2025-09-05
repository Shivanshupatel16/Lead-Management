import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { createLead, listLeads, updateLead, deleteLead } from "../controllers/lead.controller.js";

const router = Router();
router.use(auth);
router.get("/", listLeads);
router.post("/", createLead);
router.put("/:id", updateLead);
router.delete("/:id", deleteLead);
export default router;
