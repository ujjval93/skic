import type { Prisma } from "@prisma/client";

// Classes this user may mark attendance for
export function markableClassesWhere(
  role: string | undefined,
  userId: string
): Prisma.ClassWhereInput {
  if (role === "admin") return {};
  return {
    OR: [{ supervisorId: userId }, { lessons: { some: { teacherId: userId } } }],
  };
}