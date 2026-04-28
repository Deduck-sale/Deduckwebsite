"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();
  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }
  return (
    <button
      onClick={logout}
      className="w-full px-4 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/30 transition"
    >
      ออกจากระบบ
    </button>
  );
}
