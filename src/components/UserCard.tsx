import prisma from "@/lib/prisma";
import Image from "next/image";

const UserCard = async ({
  type,
}: {
  type: "admin" | "teacher" | "student" | "parent";
}) => {
  const modelMap: Record<typeof type, any> = {
    admin: prisma.admin,
    teacher: prisma.teacher,
    student: prisma.student,
    parent: prisma.parent,
  };

  const data = await modelMap[type].count();

  const accent =
    type === "student"
      ? "border-l-blue-500"
      : type === "teacher"
      ? "border-l-purple-500"
      : type === "parent"
      ? "border-l-amber-500"
      : "border-l-slate-400";

  return (
    <div className={`min-w-32.5 flex-1 rounded-xl border border-slate-200 border-l-4 bg-white p-4 shadow-sm ${accent}`}>
      <div className="flex justify-between items-center">
        <span className="rounded-md bg-slate-50 px-2 py-1 text-[10px] font-medium text-slate-500">
          2024/25
        </span>
        <Image src="/more.png" alt="" width={20} height={20} />
      </div>
      <h1 className="my-4 text-2xl font-semibold text-slate-900">{data}</h1>
      <h2 className="text-sm font-medium capitalize text-slate-500">{type}s</h2>
    </div>
  );
};

export default UserCard;