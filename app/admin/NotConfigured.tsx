import LiquidBackground from "@/components/LiquidBackground";

export default function NotConfigured() {
  return (
    <>
      <LiquidBackground />
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="glass-card p-10 max-w-2xl">
          <h1 className="text-2xl font-bold text-deduck-yellow mb-4">
            ⚙️ ยังไม่ได้ตั้งค่า Supabase
          </h1>
          <p className="text-gray-300 mb-4 leading-relaxed">
            ระบบหลังบ้านยังไม่พร้อมใช้งาน เพราะยังไม่ได้ตั้งค่า environment
            variables ของ Supabase
          </p>
          <div className="bg-black/30 border border-white/10 rounded-lg p-4 font-mono text-xs text-gray-400 mb-4">
            <p className="text-deduck-yellow mb-2"># .env.local</p>
            <p>NEXT_PUBLIC_SUPABASE_URL=...</p>
            <p>NEXT_PUBLIC_SUPABASE_ANON_KEY=...</p>
          </div>
          <p className="text-gray-400 text-sm">
            ดูขั้นตอนตั้งค่าใน <code className="text-deduck-yellow">README.md</code> →
            ส่วน "ขั้นตอนการ Deploy"
          </p>
        </div>
      </main>
    </>
  );
}
