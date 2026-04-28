"use client";

import { useTransition } from "react";

interface Props {
  id: string;
  action: (id: string) => Promise<void>;
  label?: string;
}

export default function DeleteButton({ id, action, label = "ลบ" }: Props) {
  const [pending, start] = useTransition();
  return (
    <button
      onClick={() => {
        if (!confirm("ยืนยันการลบรายการนี้?")) return;
        start(() => action(id));
      }}
      disabled={pending}
      className="px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/20 transition text-sm disabled:opacity-50"
    >
      {pending ? "กำลังลบ..." : label}
    </button>
  );
}
