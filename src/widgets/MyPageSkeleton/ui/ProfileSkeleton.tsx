export const ProfileSkeleton = () => (
  <div className="flex h-38 w-full animate-pulse flex-col overflow-hidden rounded-2xl border border-gray-100">
    <div className="flex flex-1 items-center justify-between bg-gray-200 px-4">
      <div className="h-6 w-24 rounded bg-gray-300"></div>
      <div className="h-6 w-6 rounded bg-gray-300"></div>
    </div>
    <div className="h-2 bg-gray-200" />
    <div className="flex flex-2 gap-2 bg-white px-5 py-4">
      <div className="h-12 w-12 rounded-full bg-gray-200"></div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="h-5 w-32 rounded bg-gray-200"></div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-12 rounded bg-gray-200"></div>
          <div className="h-3 w-24 rounded bg-gray-200"></div>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-12 rounded bg-gray-200"></div>
          <div className="h-3 w-32 rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  </div>
);
