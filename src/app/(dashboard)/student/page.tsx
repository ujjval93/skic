import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import EventCalendar from "@/components/EventCalendar";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const StudentPage = async () => {
  const { userId } = await auth();

  const classItem = await prisma.class.findMany({
    where: {
      students: { some: { id: userId! } },
    },
  });

  // Temporary: compare this ID with the Student table in Prisma Studio
  console.log("Clerk userId:", userId, "| classes found:", classItem.length);

  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          {classItem[0] ? (
            <>
              <h1 className="text-xl font-semibold text-slate-900">
                Schedule ({classItem[0].name})
              </h1>
              <BigCalendarContainer type="classId" id={classItem[0].id} />
            </>
          ) : (
            <>
              <h1 className="text-xl font-semibold text-slate-900">Schedule</h1>
              <p className="mt-2 text-sm text-slate-500">
                No class has been assigned to this account yet.
              </p>
            </>
          )}
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default StudentPage;