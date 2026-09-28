"use client";

import { useState } from "react";

const MobileSidebar = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  const handleMenuClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    if (target.closest("a") || target.closest("button")) {
      setOpen(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 lg:hidden"
        aria-label="Open menu"
      >
        <span className="flex w-5 flex-col gap-1">
          <span className="h-0.5 w-full rounded bg-gray-700" />
          <span className="h-0.5 w-full rounded bg-gray-700" />
          <span className="h-0.5 w-full rounded bg-gray-700" />
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 z-100 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <aside className="absolute left-0 top-0 h-full w-70 max-w-[85%] overflow-y-auto border-r border-slate-200 bg-white p-4 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="h-8 w-8 object-contain"
                />

                <span className="text-sm font-semibold text-slate-900">
                  Shri Krishna Inter College
                </span>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <div onClick={handleMenuClick}>
              {children}
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default MobileSidebar;