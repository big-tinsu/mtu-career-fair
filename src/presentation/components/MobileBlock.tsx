export function MobileBlock() {
  return (
    <div className="md:hidden min-h-screen bg-[#ECEDF2] flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-sm px-8 py-10 max-w-sm w-full text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="w-10 h-10 rounded-lg bg-[#1A5430] flex items-center justify-center">
            <span className="text-[#F2E4CC] font-black text-sm tracking-widest">A</span>
          </div>
          <span className="font-black text-[#1A1A1A] text-lg tracking-tight">AURA</span>
        </div>

        {/* Heading */}
        <h1 className="text-[#1A1A1A] text-xl font-black leading-snug mb-3">
          This site is only available on desktop.
        </h1>

        {/* Body */}
        <p className="text-[#6B6B6B] text-sm leading-relaxed mb-3">
          Put your phone away for a moment and open this on your laptop or computer instead.
        </p>
        <p className="text-xl">💻</p>
      </div>
    </div>
  );
}
