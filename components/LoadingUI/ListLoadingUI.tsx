export default function ListLoadingUI() {
  return (<>
    <div className="grid grid-cols-1 px-4 py-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:px-14 md:py-8 gap-4 animate-pulse">
      <div className="flex flex-col gap-3">
        <div className="bg-slate-300 h-64 rounded-md"></div>
        <div className="bg-slate-300 h-4 rounded-md w-3/4"></div>
        <div className="bg-slate-300 h-4 rounded-md w-1/2"></div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="bg-slate-300 h-64 rounded-md"></div>
        <div className="bg-slate-300 h-4 rounded-md w-3/4"></div>
        <div className="bg-slate-300 h-4 rounded-md w-1/2"></div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="bg-slate-300 h-64 rounded-md"></div>
        <div className="bg-slate-300 h-4 rounded-md w-3/4"></div>
        <div className="bg-slate-300 h-4 rounded-md w-1/2"></div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="bg-slate-300 h-64 rounded-md"></div>
        <div className="bg-slate-300 h-4 rounded-md w-3/4"></div>
        <div className="bg-slate-300 h-4 rounded-md w-1/2"></div>
      </div>
    </div>
  </>)
}