import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/teacher.png",
        label: "Teachers",
        href: "/list/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/student.png",
        label: "Students",
        href: "/list/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/parent.png",
        label: "Parents",
        href: "/list/parents",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/subject.png",
        label: "Subjects",
        href: "/list/subjects",
        visible: ["admin"],
      },
      {
        icon: "/class.png",
        label: "Classes",
        href: "/list/classes",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/lesson.png",
        label: "Lessons",
        href: "/list/lessons",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/exam.png",
        label: "Exams",
        href: "/list/exams",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/assignment.png",
        label: "Assignments",
        href: "/list/assignments",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/result.png",
        label: "Results",
        href: "/list/results",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/attendance.png",
        label: "Attendance",
        href: "/list/attendance",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/calendar.png",
        label: "Events",
        href: "/list/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/message.png",
        label: "Messages",
        href: "/list/messages",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/announcement.png",
        label: "Announcements",
        href: "/list/announcements",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

const homeRoutes: Record<string, string> = {
  admin: "/admin",
  teacher: "/teacher",
  student: "/student",
  parent: "/parent",
};

const Menu = async ({ mobile = false }: { mobile?: boolean }) => {
  const user = await currentUser();
  const role = user?.publicMetadata?.role as string;

  return (
    <div className="mt-6 flex flex-col gap-6 text-sm">
      {menuItems.map((section) => (
        <div key={section.title}>
          <span
            className={
              mobile
                ? "mb-3 block px-2 text-xs font-semibold uppercase tracking-wider text-slate-400"
                : "mb-3 hidden px-2 text-xs font-semibold uppercase tracking-wider text-slate-400 lg:block"
            }
          >
            {section.title}
          </span>

          <div className="flex flex-col gap-1">
            {section.items.map((item) => {
              if (!item.visible.includes(role)) {
                return null;
              }

              const href =
                item.label === "Home"
                  ? homeRoutes[role] || "/"
                  : item.href;

              return (
                <Link
                  href={href}
                  key={item.label}
                  className={
                    mobile
                      ? "flex w-full items-center gap-3 rounded-lg px-3 py-3 text-slate-600 transition-colors duration-200 hover:bg-slate-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
                      : "flex items-center justify-center gap-3 rounded-lg px-2 py-2.5 text-slate-600 transition-colors duration-200 hover:bg-slate-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 lg:justify-start"
                  }
                >
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={20}
                    height={20}
                    className="shrink-0"
                  />

                  <span className={mobile ? "block" : "hidden lg:block"}>
                    {item.label}
                  </span>
                </Link>
              );
            })}

            {section.title === "OTHER" && (
              <LogoutButton
                icon="/logout.png"
                label="Logout"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;