import path from "path";
import fs from "fs";
import { env } from "../../env";

/**
 * Abstracts file storage. In development files are written to /uploads and
 * served statically. In production, if Cloudinary is configured the buffer is
 * uploaded there (via dynamic import so the dep is optional in dev).
 */
export const uploadsService = {
  async store(file: { buffer: Buffer; originalname: string; mimetype: string }): Promise<{ url: string }> {
    if (env.cloudinary.enabled) {
      const { v2: cloudinary } = await import("cloudinary");
      cloudinary.config({ cloud_name: env.cloudinary.cloudName, api_key: env.cloudinary.apiKey, api_secret: env.cloudinary.apiSecret });
      const dataUri = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
      const res = await cloudinary.uploader.upload(dataUri, { folder: "alrajhi" });
      return { url: res.secure_url };
    }
    const dir = path.resolve(process.cwd(), env.uploadDir);
    fs.mkdirSync(dir, { recursive: true });
    const safe = `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    fs.writeFileSync(path.join(dir, safe), file.buffer);
    return { url: `/uploads/${safe}` };
  },
};
