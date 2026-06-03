-- =============================================================
-- Migration 002: Add English translations to packages
-- รันใน Supabase → SQL Editor หลัง deploy โค้ดเวอร์ชันใหม่
-- =============================================================

alter table public.packages
  add column if not exists name_en text,
  add column if not exists features_en text[] not null default '{}',
  add column if not exists channels_en text[] not null default '{}';

comment on column public.packages.name_en is
  'Optional English name. Falls back to name (Thai) on the public site when null.';
comment on column public.packages.features_en is
  'Optional English features list. Falls back to features (Thai) when empty.';
comment on column public.packages.channels_en is
  'Optional English channels list. Falls back to channels (Thai) when empty.';
