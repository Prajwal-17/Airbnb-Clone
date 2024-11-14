export default function ListDetailsUI() {
  return (<>
    <div className="px-28 py-8 animate-pulse">
      <div className="flex flex-col gap-3">
        <div className="bg-slate-300 h-7 w-60 rounded-xl"></div>
        <div className="bg-slate-300 h-6 w-32 rounded-xl"></div>
      </div>

      <div className="bg-slate-300 h-80 w-full rounded-xl my-7"></div>

      <div className="flex flex-col gap-3">
        <div className="bg-slate-300 h-7 w-96 rounded-xl"></div>
        <div className="flex gap-2">
          <div className="bg-slate-300 h-6 w-28 rounded-xl"></div>
          <div className="bg-slate-300 h-6 w-28 rounded-xl"></div>
          <div className="bg-slate-300 h-6 w-28 rounded-xl"></div>
        </div>
      </div>
    </div>
  </>
  )
}