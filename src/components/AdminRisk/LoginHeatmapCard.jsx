// import loginHeatmapImg from "@/assets/login_heatmap.png";

export default function LoginHeatmapCard() {
  return (
    <div className="relative rounded-2xl border border-gray-200 overflow-hidden shadow-sm h-full min-h-[360px]">
      {/* Background World Map Image */}
      {/* <img
        src={loginHeatmapImg}
        alt="Login Heatmap"
        className="absolute inset-0 w-full h-full object-cover opacity-90 transition-opacity duration-300"
      /> */}
      <p className="flex justify-center items-center">map api will come here</p>

      {/* Floating Info Overlay (top-left) */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md border border-slate-100 rounded-xl p-4 shadow-lg max-w-[240px] z-10">
        <h4 className="text-sm font-bold text-slate-900 tracking-tight">
          Login Heatmap
        </h4>
        <p className="text-xs text-slate-500 mt-0.5">
          Global traffic & flagged regions
        </p>
      </div>

      {/* Subtle indicator dots to add depth */}
      <div className="absolute bottom-4 right-4 bg-slate-900/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 z-10 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
        <span className="text-[10px] font-semibold text-slate-200 uppercase tracking-wider">
          Live monitoring
        </span>
      </div>
    </div>
  );
}
