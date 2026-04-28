import PortfolioForm from "../PortfolioForm";

export default function NewPortfolioPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">เพิ่มรูปผลงานใหม่</h1>
      <p className="text-gray-400 mb-8">อัปโหลดรูปและเลือกหมวดหมู่</p>
      <PortfolioForm />
    </div>
  );
}
