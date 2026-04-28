export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 relative"
    >
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10 glass-card p-12 lg:p-16">
        <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-2 tracking-tight drop-shadow-lg">
          DE DUCK AGENCY
        </h1>
        <h2 className="text-2xl md:text-4xl font-semibold text-deduck-yellow mb-8 drop-shadow-md">
          เดอ-ดัค-เอ-เจน-ซี่
        </h2>

        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-deduck-yellow to-transparent mx-auto mb-8 rounded-full" />

        <div className="glass-panel inline-block px-8 py-3 mb-10">
          <p className="text-xl md:text-2xl text-gray-200 font-light">
            ทีมงานพร้อม บริการด้วยใจ เก็บทุกความทรงจำ
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#portfolio"
            className="px-8 py-3 rounded-full border border-deduck-yellow/50 text-deduck-yellow font-medium hover:bg-deduck-yellow hover:text-deduck-dark transition duration-300 backdrop-blur-md bg-black/20"
          >
            ดูผลงานของเรา
          </a>
          <a
            href="#pricing"
            className="px-8 py-3 rounded-full bg-deduck-yellow text-deduck-dark font-bold hover:bg-yellow-400 transition duration-300 shadow-[0_0_20px_rgba(255,208,0,0.4)]"
          >
            ดูแพ็กเกจราคา
          </a>
        </div>
      </div>
    </section>
  );
}
