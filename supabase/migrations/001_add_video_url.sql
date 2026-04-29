-- =============================================================
-- Migration 001: Add video_url to reels
-- รันใน Supabase → SQL Editor หลังจาก deploy โค้ดเวอร์ชันใหม่
-- =============================================================

alter table public.reels
  add column if not exists video_url text;

comment on column public.reels.video_url is
  'Optional external video URL (YouTube/Vimeo/direct .mp4). When set, lightbox plays this instead of image_url. image_url stays as the thumbnail.';
