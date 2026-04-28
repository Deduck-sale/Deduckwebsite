import { createClient } from "@/lib/supabase/server";
import type { Package, PortfolioItem, Reel } from "@/lib/supabase/types";

export async function getPackages(
  section: "marketing" | "production"
): Promise<Package[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("packages")
      .select("*")
      .eq("section", section)
      .eq("is_active", true)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return data ?? [];
  } catch {
    return [];
  }
}

export async function getPortfolio(): Promise<PortfolioItem[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("portfolio")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return data ?? [];
  } catch {
    return [];
  }
}

export async function getReels(): Promise<Reel[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("reels")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return data ?? [];
  } catch {
    return [];
  }
}
