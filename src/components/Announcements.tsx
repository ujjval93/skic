import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const Announcements = async () => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const roleConditions = {
    teacher: { lessons: { some: { teacherId: userId! } } },
    student: { students: { some: { id: userId! } } },
    parent: { students: { some: { parentId: userId! } } },
  };

  const data = await prisma.announcement.findMany({
    take: 3,
    orderBy: { date: "desc" },
    where: {
      ...(role !== "admin" && {
        OR: [
          { classId: null },
          { class: roleConditions[role as keyof typeof roleConditions] || {} },
        ],
      }),
    },
  });

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-slate-900">Announcements</h1>
        <span className="text-xs text-slate-500">View All</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {!data.length && (
          <p className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
            No announcements yet.
          </p>
        )}
        {data[0] && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-medium text-slate-900">{data[0].title}</h2>
              <span className="rounded-md bg-white px-2 py-1 text-xs text-slate-500">
                {new Intl.DateTimeFormat("en-GB").format(data[0].date)}
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-600">{data[0].description}</p>
          </div>
        )}
        {data[1] && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-medium text-slate-900">{data[1].title}</h2>
              <span className="rounded-md bg-white px-2 py-1 text-xs text-slate-500">
                {new Intl.DateTimeFormat("en-GB").format(data[1].date)}
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-600">{data[1].description}</p>
          </div>
        )}
        {data[2] && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-medium text-slate-900">{data[2].title}</h2>
              <span className="rounded-md bg-white px-2 py-1 text-xs text-slate-500">
                {new Intl.DateTimeFormat("en-GB").format(data[2].date)}
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-600">{data[2].description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcements;