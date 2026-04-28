export type PortfolioCategory = "beverage" | "food" | "product" | "graphic";

export interface Package {
  id: string;
  section: "marketing" | "production";
  name: string;
  subtitle: string | null;
  price: number;
  features: string[];
  channels: string[];
  is_recommended: boolean;
  sort_order: number;
  is_active: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string | null;
  category: PortfolioCategory;
  image_url: string;
  sort_order: number;
  is_active: boolean;
}

export interface Reel {
  id: string;
  caption: string;
  audio_text: string;
  image_url: string;
  views: number;
  likes: number;
  shares: number;
  sort_order: number;
  is_active: boolean;
}

export interface SiteContent {
  key: string;
  value: string;
}
