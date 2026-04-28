import Link from "next/link";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import LogoutButton from "./LogoutButton";
import LiquidBackground from "@/components/LiquidBackground";
import NotConfigured from "./NotConfigured";

export const metadata = {
  title: "Admin | De Duck Agency",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isSupabaseConfigured()) {
    return <NotConfigured />;
  }
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Login page renders without nav chrome
  if (!user) {
    return <>{children}</>;
  }

  return (
    <>
      <LiquidBackground />
      <div className="min-h-screen flex">
        <aside className="w-64 glass-nav border-r border-white/10 flex-shrink-0 hidden md:flex flex-col">
          <div className="p-6 border-b border-white/10">
            <Link href="/admin" className="flex items-center">
              <div className="font-bold text-2xl tracking-wider text-white flex items-center">
                DE
                <span className="text-deduck-yellow text-3xl leading-none mx-1">
                  🦆
                </span>
                UCK
              </div>
            </Link>
            <p className="text-xs text-gray-400 mt-1">Admin Panel</p>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            <Link
              href="/admin"
              className="block px-4 py-2 rounded-lg text-gray-300 hover:bg-white/5 hover:text-deduck-yellow transition"
            >
              📊 ภาพรวม
            </Link>
            <Link
              href="/admin/packages"
              className="block px-4 py-2 rounded-lg text-gray-300 hover:bg-white/5 hover:text-deduck-yellow transition"
            >
              💰 จัดการ Packages
            </Link>
            <Link
              href="/admin/portfolio"
              className="block px-4 py-2 rounded-lg text-gray-300 hover:bg-white/5 hover:text-deduck-yellow transition"
            >
              🖼️ จัดการ Portfolio
            </Link>
            <Link
              href="/admin/reels"
              className="block px-4 py-2 rounded-lg text-gray-300 hover:bg-white/5 hover:text-deduck-yellow transition"
            >
              🎬 จัดการ Reels
            </Link>
            <Link
              href="/"
              target="_blank"
              className="block px-4 py-2 rounded-lg text-gray-300 hover:bg-white/5 hover:text-deduck-yellow transition"
            >
              🌐 ดูหน้าเว็บ ↗
            </Link>
          </nav>
          <div className="p-4 border-t border-white/10">
            <p className="text-xs text-gray-500 mb-2 truncate">{user.email}</p>
            <LogoutButton />
          </div>
        </aside>

        <main className="flex-1 p-6 md:p-10 overflow-x-hidden">{children}</main>
      </div>
    </>
  );
}
