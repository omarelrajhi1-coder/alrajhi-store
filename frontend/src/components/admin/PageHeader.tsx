export default function PageHeader({ title, desc, action }: { title: string; desc?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 className="text-xl font-extrabold text-ink">{title}</h1>
        {desc && <p className="text-sm text-muted">{desc}</p>}
      </div>
      {action}
    </div>
  );
}
