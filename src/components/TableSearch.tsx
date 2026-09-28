"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const TableSearch = () => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const value = (e.currentTarget[0] as HTMLInputElement).value;

    const params = new URLSearchParams(window.location.search);
    params.set("search", value);
    router.push(`${window.location.pathname}?${params}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm transition-colors duration-200 focus-within:border-blue-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 md:w-auto"
    >
      <Image src="/search.png" alt="" width={14} height={14} />
      <input
        type="text"
        placeholder="Search..."
        className="min-w-0 flex-1 bg-transparent px-1 py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-400 md:w-48 md:flex-none"
      />
    </form>
  );
};

export default TableSearch;