import { prisma } from "../../prisma";
import { AppError } from "../../utils/AppError";
import { hashPassword } from "../../utils/password";

export const employeesService = {
  // Staff roles (RBAC)
  listRoles: () => prisma.staffRole.findMany({ include: { permissions: { include: { permission: true } }, _count: { select: { employees: true } } }, orderBy: { name: "asc" } }),
  listPermissions: () => prisma.permission.findMany({ orderBy: { key: "asc" } }),
  async createRole(name: string, description: string | undefined, permissionKeys: string[]) {
    const perms = await prisma.permission.findMany({ where: { key: { in: permissionKeys } } });
    return prisma.staffRole.create({ data: { name, description, permissions: { create: perms.map((p) => ({ permissionId: p.id })) } }, include: { permissions: true } });
  },
  async setRolePermissions(roleId: string, permissionKeys: string[]) {
    const perms = await prisma.permission.findMany({ where: { key: { in: permissionKeys } } });
    await prisma.rolePermission.deleteMany({ where: { roleId } });
    await prisma.rolePermission.createMany({ data: perms.map((p) => ({ roleId, permissionId: p.id })) });
    return prisma.staffRole.findUnique({ where: { id: roleId }, include: { permissions: { include: { permission: true } } } });
  },

  // Employees
  list: () => prisma.employee.findMany({ where: { deletedAt: null }, include: { user: { select: { id: true, name: true, email: true, isActive: true } }, role: true }, orderBy: { createdAt: "desc" } }),
  async create(data: { name: string; email: string; password: string; title?: string; roleId?: string }) {
    const exists = await prisma.user.findUnique({ where: { email: data.email } });
    if (exists) throw AppError.conflict("البريد مستخدم بالفعل");
    const user = await prisma.user.create({ data: { name: data.name, email: data.email, password: await hashPassword(data.password), role: "STAFF" } });
    return prisma.employee.create({ data: { userId: user.id, title: data.title, roleId: data.roleId }, include: { user: true, role: true } });
  },
  async setActive(id: string, isActive: boolean) {
    return prisma.$transaction(async (tx) => {
      const emp = await tx.employee.update({ where: { id }, data: { isActive }, include: { user: true } });
      await tx.user.update({ where: { id: emp.userId }, data: { isActive } });
      return emp;
    });
  },
  async remove(id: string) {
    await prisma.$transaction(async (tx) => {
      const emp = await tx.employee.update({ where: { id }, data: { deletedAt: new Date(), isActive: false } });
      await tx.user.update({ where: { id: emp.userId }, data: { isActive: false } });
    });
  },
};
