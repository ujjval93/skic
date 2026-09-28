"use client";

import { useClerk } from "@clerk/nextjs";
import Image from "next/image";

const LogoutButton = ({ icon, label }: { icon: string; label: string }) => {
  const { signOut } = useClerk();

  return (
    <button
      onClick={() => signOut({ redirectUrl: "/sign-in" })}
      className="flex w-full items-center justify-center gap-3 rounded-lg px-2 py-2.5 text-slate-600 transition-colors duration-200 hover:bg-red-50 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-200 lg:justify-start"
    >
      <Image src={icon} alt="" width={20} height={20} />
      <span className="hidden lg:block">{label}</span>
    </button>
  );
};

export default LogoutButton;