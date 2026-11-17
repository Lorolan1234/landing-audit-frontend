import { cn } from "@/lib/utils";

export function Section({
  id,
  number,
  title,
  lead,
  aside,
  children,
  className,
}: {
  id: string;
  number?: number;
  title: string;
  lead?: string;
  aside?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-24 border-t border-white/[0.07] pt-10", className)}>
      <div className="flex items-start gap-4">
        {number != null && (
          <span className="mt-1 w-6 shrink-0 text-lg font-semibold tabular-nums text-white/35">{number}</span>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight text-white">{title}</h2>
            {aside}
          </div>
          {lead && <p className="mt-3 max-w-3xl text-base leading-relaxed text-white/70">{lead}</p>}
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </section>
  );
}
