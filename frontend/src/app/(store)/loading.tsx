import Skeleton from "@/components/ui/Skeleton";
export default function Loading() {
  return (
    <div className="container-x py-10">
      <Skeleton className="h-64 w-full rounded-2xl" />
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => <Skeleton key={i} className="aspect-[3/4] rounded-2xl" />)}
      </div>
    </div>
  );
}
