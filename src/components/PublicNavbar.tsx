"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Academics", href: "#academics" },
  { label: "Admissions", href: "#admissions" },
  { label: "News & Events", href: "#news" },
  { label: "Contact", href: "#contact" },
];

const marqueeContent = (
  <>
    <span className="mx-8">
      Shri Krishna Inter College, Purabahoriya, Gaddopur, Jaunpur
    </span>

    <span className="text-yellow-300">•</span>

    <span className="mx-8">
      Affiliated by Uttar Pradesh Madhyamik Shiksha Parishad, Prayagraj
    </span>

    <span className="text-yellow-300">•</span>
  </>
);

const PublicNavbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="w-full overflow-hidden bg-blue-950 text-white">
        <div className="flex w-max animate-marquee whitespace-nowrap py-2 text-xs md:text-sm font-medium">
          <div className="flex items-center">
            {marqueeContent}
          </div>

          <div className="flex items-center">
            {marqueeContent}
          </div>
        </div>
      </div>

      <nav className="w-full bg-blue-600 text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/school-logo.png"
              alt="School logo"
              width={42}
              height={42}
              className="rounded-full object-cover"
            />

            <span className="font-bold text-lg hidden sm:block">
              Shri Krishna Inter College
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-yellow-300 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            
            <Link
              href="/sign-in"
              className="bg-yellow-400 text-blue-700 font-semibold text-sm px-4 py-2 rounded-md hover:bg-yellow-300 transition-colors"
            >
              Sign In
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden text-white"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <span className="text-2xl">
              {open ? "✕" : "☰"}
            </span>
          </button>
        </div>

        {open && (
          <div className="md:hidden bg-blue-700 px-4 pb-5 pt-2 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-1 hover:text-yellow-300 transition-colors"
              >
                {link.label}
              </a>
            ))}

            <Link
              href="/sign-in"
              onClick={() => setOpen(false)}
              className="py-1 hover:text-yellow-300 transition-colors"
            >
              Student / Teacher Portal
            </Link>

            <Link
              href="/sign-in"
              className="bg-yellow-400 text-blue-700 font-semibold text-sm px-4 py-2 rounded-md text-center hover:bg-yellow-300 transition-colors"
              onClick={() => setOpen(false)}
            >
              Sign In
            </Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default PublicNavbar;