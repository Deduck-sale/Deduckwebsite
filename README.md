# De Duck Agency — Website + Admin

เว็บไซต์ Digital Marketing Agency พร้อมระบบหลังบ้าน แก้ราคา/อัปโหลดรูป/วิดีโอได้เอง

**Stack:** Next.js 15 (App Router) + Tailwind CSS + Supabase (DB + Storage + Auth)

---

## 📦 โครงสร้างโปรเจกต์

```
.
├── app/
│   ├── page.tsx           # หน้าแรก (SSG + ISR ทุก 60 วิ)
│   ├── layout.tsx         # Root layout + meta SEO
│   └── admin/             # หลังบ้าน (ต้องล็อกอิน)
│       ├── login/
│       ├── packages/      # CRUD packages
│       ├── portfolio/     # CRUD portfolio + อัปรูป
│       ├── reels/         # CRUD reels + อัปวิดีโอ
│       └── actions.ts     # Server Actions
├── components/            # Hero, Reels, Pricing, ...
├── lib/
│   ├── supabase/          # Client/Server/Middleware
│   ├── data.ts            # Query helpers
│   └── fallback-data.ts   # ข้อมูลตัวอย่าง (กันหน้าโล่งก่อน setup DB)
├── supabase/
│   ├── schema.sql         # สร้างตาราง + RLS + Storage policy
│   └── seed.sql           # ใส่ข้อมูลตัวอย่าง
└── middleware.ts          # ป้องกัน /admin
```

---

## 🚀 ขั้นตอนการ Deploy (ครั้งแรก)

### 1) สร้าง Supabase project
1. ไปที่ <https://supabase.com> → Sign up → New Project
2. เลือก region ใกล้ที่สุด (Singapore)
3. ตั้งรหัสผ่าน database (จดไว้)
4. รอ ~2 นาที

### 2) รัน SQL schema + seed
1. ใน Supabase Dashboard → **SQL Editor** → **+ New query**
2. คัดลอกเนื้อหาจาก `supabase/schema.sql` ไปวาง → **Run**
3. ทำซ้ำกับ `supabase/seed.sql` (ใส่ข้อมูลตัวอย่าง)

### 3) สร้าง Admin User
1. Supabase Dashboard → **Authentication** → **Users** → **+ Add user** → **Create new user**
2. ใส่อีเมล + รหัสผ่าน → **Auto Confirm User: ON**
3. คลิก Create

### 4) คัดลอก API keys
Supabase Dashboard → **Project Settings** → **API**
- `Project URL` → ใช้เป็น `NEXT_PUBLIC_SUPABASE_URL`
- `anon public` key → ใช้เป็น `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 5) Deploy ที่ Vercel
1. Push code นี้ขึ้น GitHub
2. ไปที่ <https://vercel.com> → **Import Project** → เลือก repo
3. ใน **Environment Variables** ใส่:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. **Deploy**
5. รอ ~1 นาที → เว็บพร้อมใช้!

### 6) เข้าใช้ Admin
- เว็บหลัก: `https://your-site.vercel.app`
- หลังบ้าน: `https://your-site.vercel.app/admin/login`
- ล็อกอินด้วยอีเมล/รหัสผ่านที่สร้างในขั้นตอน 3

---

## 💻 การพัฒนาบนเครื่อง (Local Development)

```bash
# 1. Clone & install
npm install

# 2. คัดลอก env file
cp .env.local.example .env.local
# แก้ค่าใน .env.local ให้เป็นของจริง

# 3. รัน dev server
npm run dev
# เปิด http://localhost:3000
```

---

## 🛠️ การใช้งานหลังบ้าน

| เมนู | ทำอะไรได้บ้าง |
|------|---------------|
| 💰 Packages | เพิ่ม/แก้ไข/ลบ แพ็กเกจ Marketing & Production, แก้ราคา, ตั้ง RECOMMENDED |
| 🖼️ Portfolio | อัปโหลดรูปผลงาน, เลือกหมวดหมู่ (Beverage/Food/Product/Graphic) |
| 🎬 Reels | อัปโหลดวิดีโอ MP4 หรือรูปภาพ 9:16, ตั้ง views/likes/shares เริ่มต้น |

> หลังบันทึก เว็บหน้าแรกจะอัปเดตอัตโนมัติทันที (revalidatePath) — ไม่ต้องรอ build ใหม่

---

## ⚙️ สิ่งที่ปรับได้ภายหลัง

- **เพิ่มผู้ใช้ admin คนอื่น**: Supabase → Authentication → Add user
- **เปลี่ยน revalidate interval**: แก้ `export const revalidate = 60` ใน `app/page.tsx`
- **เพิ่ม social link / footer**: แก้ `components/Footer.tsx`
- **เปลี่ยน meta SEO**: แก้ `app/layout.tsx` (title, description, keywords)

---

## 📈 SEO & Performance

- ✅ Server-side rendering + Static generation (ISR)
- ✅ Meta tags ครบ (Open Graph, robots, lang=th)
- ✅ Google Fonts ผ่าน next/font (ไม่ render-blocking)
- ✅ Lazy loading รูปทุกใบ
- ✅ Sitemap auto-generated โดย Vercel

> สำหรับ Google Analytics / Search Console: เพิ่มใน `app/layout.tsx`

---

## 💰 ค่าใช้จ่าย

| Service | Free Tier | ใช้จริง |
|---------|-----------|---------|
| Vercel | 100 GB bandwidth/เดือน | ฟรี |
| Supabase | 500 MB DB + 1 GB storage + 2 GB bandwidth | ฟรี |
| โดเมน .com | ~350-500 บาท/ปี | ตามใจ |

---

## 🆘 Troubleshooting

**เว็บแสดงข้อมูลตัวอย่าง (Unsplash)**: หมายถึง DB ยังว่าง — รัน `supabase/seed.sql` หรือเพิ่มข้อมูลผ่านหลังบ้าน

**ล็อกอินไม่ได้**: เช็คว่า admin user ถูก confirm แล้วใน Supabase → Authentication → Users (มี checkmark ในคอลัมน์ Email Confirmed)

**อัปโหลดรูปไม่ได้**: เช็คว่ารัน `schema.sql` ครบ (ที่สร้าง bucket "media" ให้เป็น public)

---

ทำโดย De Duck Agency 🦆
