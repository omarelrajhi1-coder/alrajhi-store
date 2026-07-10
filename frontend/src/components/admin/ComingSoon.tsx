import { Construction } from "lucide-react";
import PageHeader from "./PageHeader";

export default function ComingSoon({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <PageHeader title={title} desc={desc} />
      <div className="card grid place-items-center py-24 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-primary"><Construction width={30} height={30} /></span>
        <p className="mt-4 text-lg font-extrabold text-ink">{title}</p>
        <p className="mt-1 max-w-sm text-sm text-muted">هذه الوحدة مجهّزة في الواجهة وجاهزة للربط مع الواجهة الخلفية (API) في الخطوة التالية.</p>
      </div>
    </div>
  );
}
