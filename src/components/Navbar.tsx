import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import Menu from "./Menu";
import MobileSidebar from "./MobileSidebar";
import AnnouncementBell from "./AnnouncementBell";

const Navbar = async () => {
  const user = await currentUser();
  const role = user?.publicMetadata?.role as string;

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm sm:px-6">
      <div className="flex items-center gap-3">
        <MobileSidebar>
          <Menu mobile/>
        </MobileSidebar>

        <Link
          href="/"
          className="flex items-center gap-2 lg:hidden"
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={28}
            height={28}
          />

          <span className="hidden text-sm font-semibold text-slate-900 sm:block">
            Shri Krishna Inter College
          </span>
        </Link>

        <div className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 transition-colors focus-within:border-blue-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 md:flex">
          <Image
            src="/search.png"
            alt="Search"
            width={15}
            height={15}
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-40 bg-transparent p-2 text-sm text-slate-700 outline-none placeholder:text-slate-400 sm:w-52"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        <Link
          href="/list/messages"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-200 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
          aria-label="Messages"
        >
          <Image
            src="/message.png"
            alt="Messages"
            width={20}
            height={20}
          />
        </Link>

        <AnnouncementBell />

        <div className="hidden flex-col sm:flex">
          <span className="text-xs font-medium leading-4 text-slate-800">
            {user?.firstName || user?.username || "Admin"}
          </span>

          <span className="text-right text-[10px] capitalize text-slate-500">
            {role}
          </span>
        </div>

        <UserButton />
      </div>
    </header>
  );
};

export default Navbar;