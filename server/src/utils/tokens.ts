import crypto from "crypto";
export const randomToken = (bytes = 48) => crypto.randomBytes(bytes).toString("hex");
export const sha256 = (value: string) => crypto.createHash("sha256").update(value).digest("hex");
