import { prisma } from "../../prisma";

export const cmsService = {
  // Banners
  listBanners: (activeOnly = false) => prisma.homepageBanner.findMany({ where: activeOnly ? { isActive: true } : {}, orderBy: { order: "asc" } }),
  createBanner: (data: { title: string; subtitle?: string; image: string; href?: string; order?: number }) => prisma.homepageBanner.create({ data }),
  updateBanner: (id: string, data: Record<string, unknown>) => prisma.homepageBanner.update({ where: { id }, data }),
  removeBanner: async (id: string) => { await prisma.homepageBanner.delete({ where: { id } }); },

  // Sections
  listSections: () => prisma.homepageSection.findMany({ orderBy: { order: "asc" } }),
  upsertSection: (key: string, data: { title?: string; subtitle?: string; order?: number; isActive?: boolean; config?: unknown }) =>
    prisma.homepageSection.upsert({ where: { key }, update: data as object, create: { key, ...(data as object) } }),

  // Settings (key/value store)
  getSettings: async () => {
    const rows = await prisma.setting.findMany();
    return Object.fromEntries(rows.map((r) => [r.key, r.value]));
  },
  setSetting: (key: string, value: unknown) =>
    prisma.setting.upsert({ where: { key }, update: { value: value as object }, create: { key, value: value as object } }),
};
