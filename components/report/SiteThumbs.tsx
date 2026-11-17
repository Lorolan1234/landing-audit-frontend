/* eslint-disable @next/next/no-img-element */
import type { ReportMedia } from "@/types/audit";
import { mediaUrl } from "@/types/audit";

export function SiteThumbs({ auditId, media, site }: { auditId: string; media: ReportMedia; site: string }) {
  const desktop = media.desktop_thumb;
  const mobile = media.mobile_thumb;
  if (!desktop && !mobile) return null;

  return (
    <div className="relative w-full pb-[12%] pr-[14%]">
      {desktop && (
        <div className="overflow-hidden rounded-lg border border-white/15 bg-[#111] shadow-2xl shadow-black/60">
          <div className="flex items-center gap-1 border-b border-white/10 px-2 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
            <span className="ml-2 truncate text-[10px] text-white/45">{site}</span>
          </div>
          <img
            src={mediaUrl(auditId, desktop.file)}
            width={desktop.width}
            height={desktop.height}
            alt={`Первый экран ${site} на компьютере`}
            className="block h-auto w-full"
            loading="lazy"
          />
        </div>
      )}
      {mobile && (
        <div className="absolute bottom-0 right-0 w-[28%] overflow-hidden rounded-[10px] border-2 border-[#2a2a30] bg-black shadow-xl shadow-black/70">
          <img
            src={mediaUrl(auditId, mobile.file)}
            width={mobile.width}
            height={mobile.height}
            alt={`Первый экран ${site} на телефоне`}
            className="block h-auto w-full"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
}
