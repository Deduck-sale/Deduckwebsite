-- =============================================================
-- De Duck Agency — Supabase Schema
-- รันไฟล์นี้ทั้งหมดใน Supabase Dashboard → SQL Editor
-- =============================================================

-- ตาราง packages (Marketing & Production)
create table if not exists public.packages (
  id uuid primary key default gen_random_uuid(),
  section text not null check (section in ('marketing','production')),
  name text not null,
  subtitle text,
  price integer not null default 0,
  features text[] not null default '{}',
  channels text[] not null default '{}',
  is_recommended boolean not null default false,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ตาราง portfolio (รูปผลงาน)
create table if not exists public.portfolio (
  id uuid primary key default gen_random_uuid(),
  title text,
  category text not null check (category in ('beverage','food','product','graphic')),
  image_url text not null,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ตาราง reels (Shorts/Reels วิดีโอแนวตั้ง)
create table if not exists public.reels (
  id uuid primary key default gen_random_uuid(),
  caption text not null,
  audio_text text not null default 'Original Audio - De Duck Agency',
  image_url text not null,
  views integer not null default 0,
  likes integer not null default 0,
  shares integer not null default 0,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- เปิด Row Level Security
alter table public.packages enable row level security;
alter table public.portfolio enable row level security;
alter table public.reels enable row level security;

-- Policy: ทุกคนอ่านได้ (เว็บหน้าแรกใช้ดึงข้อมูล)
drop policy if exists "public read packages" on public.packages;
create policy "public read packages" on public.packages
  for select using (true);

drop policy if exists "public read portfolio" on public.portfolio;
create policy "public read portfolio" on public.portfolio
  for select using (true);

drop policy if exists "public read reels" on public.reels;
create policy "public read reels" on public.reels
  for select using (true);

-- Policy: เขียน/แก้/ลบ ได้เฉพาะ user ที่ล็อกอินแล้ว (admin)
drop policy if exists "auth write packages" on public.packages;
create policy "auth write packages" on public.packages
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "auth write portfolio" on public.portfolio;
create policy "auth write portfolio" on public.portfolio
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "auth write reels" on public.reels;
create policy "auth write reels" on public.reels
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Storage bucket "media" สำหรับเก็บรูป/วิดีโอ
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = true;

-- Storage policy: ใครก็อ่านได้ (เพราะรูปต้องโชว์บนเว็บ)
drop policy if exists "media public read" on storage.objects;
create policy "media public read" on storage.objects
  for select using (bucket_id = 'media');

-- Storage policy: เฉพาะ admin (auth) อัปโหลด/ลบได้
drop policy if exists "media auth write" on storage.objects;
create policy "media auth write" on storage.objects
  for insert with check (bucket_id = 'media' and auth.role() = 'authenticated');

drop policy if exists "media auth update" on storage.objects;
create policy "media auth update" on storage.objects
  for update using (bucket_id = 'media' and auth.role() = 'authenticated');

drop policy if exists "media auth delete" on storage.objects;
create policy "media auth delete" on storage.objects
  for delete using (bucket_id = 'media' and auth.role() = 'authenticated');
