export const ok = (res, data = {}, message = "OK") => res.status(200).json({ success: true, message, data });
export const created = (res, data = {}, message = "Created") => res.status(201).json({ success: true, message, data });
export const bad = (res, message = "Bad Request", code = 400) => res.status(code).json({ success: false, message });
