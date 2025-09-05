import { z } from "zod";

export const registerDTO = z.object({
  name: z.string().min(2, "Name too short"),
  email: z.string().email(),
  password: z.string().min(6, "Min 6 chars")
});

export const loginDTO = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});
