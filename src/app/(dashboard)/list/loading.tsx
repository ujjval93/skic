const Loading = () => {
  return (
    <div className="p-8 animate-pulse">
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex gap-4 bg-slate-50 p-5 sm:gap-8 sm:p-6">
          <div className="h-5 w-1/6 animate-pulse rounded bg-slate-200"></div>
          <div className="h-5 w-2/6 animate-pulse rounded bg-slate-200"></div>
          <div className="h-5 w-1/6 animate-pulse rounded bg-slate-200"></div>
          <div className="h-5 w-1/6 animate-pulse rounded bg-slate-200"></div>
        </div>
        <div className="p-4">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="mb-4 mt-4 flex items-center justify-between gap-4 border-b border-slate-100 py-2"
            >
              <div className="h-8 w-1/6 animate-pulse rounded bg-slate-200"></div>
              <div className="h-8 w-2/6 animate-pulse rounded bg-slate-200"></div>
              <div className="h-8 w-1/6 animate-pulse rounded bg-slate-200"></div>
              <div className="h-8 w-1/6 animate-pulse rounded bg-slate-200"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;