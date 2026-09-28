import AttendanceMarker from "@/components/AttendanceMarker";
import prisma from "@/lib/prisma";
import { todayIST } from "@/lib/today";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

const MarkAttendancePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ classId?: string; date?: string }>;
}) => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  if (!userId) redirect("/sign-in");
  if (role !== "admin" && role !== "teacher") redirect("/list/attendance");
  
  const sp = await searchParams;
  const today = todayIST();
  const date =
    sp.date && /^\d{4}-\d{2}-\d{2}$/.test(sp.date) && sp.date <= today
      ? sp.date
      : today;

  const parsedClass = sp.classId ? parseInt(sp.classId) : NaN;
  const classId = Number.isNaN(parsedClass) ? undefined : parsedClass;

  const classes = await prisma.class.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  let students: {
    id: string;
    name: string;
    username: string;
    present: boolean | null;
  }[] = [];
  let hasSaved = false;

  if (classId) {
    const list = await prisma.student.findMany({
      where: { classId },
      select: { id: true, name: true, surname: true, username: true },
      orderBy: [{ name: "asc" }, { surname: "asc" }],
    });

    const records = await prisma.attendance.findMany({
      where: {
        studentId: { in: list.map((s) => s.id) },
        date: new Date(`${date}T00:00:00.000Z`),
        lessonId: null,
      },
      select: { studentId: true, present: true },
    });

    const saved = new Map(records.map((r) => [r.studentId, r.present]));
    hasSaved = records.length > 0;

    students = list.map((s) => ({
      id: s.id,
      name: `${s.name} ${s.surname}`,
      username: s.username,
      present: saved.has(s.id) ? (saved.get(s.id) as boolean) : null,
    }));
  }

  return (
    <div className="m-3 mt-0 flex-1 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:m-4 sm:mt-0">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Mark Attendance</h1>
        <Link
          href="/list/attendance"
          className="text-sm text-blue-600 hover:underline"
        >
          View records
        </Link>
      </div>

      {/* The key resets the checkboxes whenever the class or date changes */}
      <AttendanceMarker
        key={`${classId ?? "none"}-${date}`}
        classes={classes}
        classId={classId}
        date={date}
        today={today}
        students={students}
        hasSaved={hasSaved}
      />
    </div>
  );
};

export default MarkAttendancePage;