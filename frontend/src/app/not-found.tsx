import Link from "next/link";
export default function NotFound() {
  return (
    <div className="container-x grid place-items-center py-28 text-center">
      <p className="text-7xl font-extrabold text-primary">404</p>
      <h1 className="mt-3 text-2xl font-extrabold text-ink">الصفحة غير موجودة</h1>
      <p className="mt-1 text-muted">عذراً، لم نتمكن من العثور على ما تبحث عنه.</p>
      <Link href="/" className="btn-primary mt-6">العودة للرئيسية</Link>
    </div>
  );
}
