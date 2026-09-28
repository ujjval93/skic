import prisma from "@/lib/prisma";
import { announcementWhere } from "@/lib/announcementFilter";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

const AnnouncementBell = async () => {
  const { userId, sessionClaims } = await auth();
  if (!userId) return null;

  const role = (sessionClaims?.metadata as { role?: string })?.role;

  // Admins write the announcements, so they get no badge
  let unread = 0;
  if (role !== "admin") {
    const seen = await prisma.announcementSeen.findUnique({ where: { userId } });
    unread = await prisma.announcement.count({
      where: {
        AND: [
          announcementWhere(role, userId),
          { id: { gt: seen?.lastSeenId ?? 0 } },
        ],
      },
    });
  }

  return (
    <Link
      href="/list/announcements"
      className="relative flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-200 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
      aria-label={
        unread > 0 ? `Announcements, ${unread} unread` : "Announcements"
      }
    >
      <Image
        src="/announcement.png"
        alt="Announcements"
        width={20}
        height={20}
      />

      {unread > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-semibold text-white">
          {unread > 9 ? "9+" : unread}
        </span>
      )}
    </Link>
  );
};

export default AnnouncementBell;