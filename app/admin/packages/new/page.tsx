import PackageForm from "../PackageForm";

export default function NewPackagePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">เพิ่ม Package ใหม่</h1>
      <p className="text-gray-400 mb-8">กรอกรายละเอียดแพ็กเกจ</p>
      <PackageForm />
    </div>
  );
}
