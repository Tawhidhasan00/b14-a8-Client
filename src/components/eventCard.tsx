import { ArrowUpRight, CalendarDays, Clock3, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type EventCardData = {
  title: string;
  eventType: string;
  location: string;
  date: string;
  duration: number;
  description: string;
  image: string;
};

export function EventCard({ event }: { event: EventCardData }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[14px] border border-[#dce3d8] bg-white transition-shadow hover:shadow-[0_12px_32px_rgba(25,39,30,0.10)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#e9eee2]">
        <Image
          src={event.image}
          alt=""
          width={900}
          height={675}
          unoptimized
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute left-4 top-4 rounded-full bg-[#faf8f3] px-3 py-1.5 text-[11px] font-semibold tracking-wide text-[#176b38] shadow-sm">
          {event.eventType}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="mb-3 flex items-center gap-2 text-xs text-[#526257]">
          <CalendarDays size={15} className="text-[#176b38]" aria-hidden="true" />
          {event.date}
        </p>
        <h2 className="text-lg font-semibold leading-snug tracking-[-0.03em] text-[#19271e]">
          {event.title}
        </h2>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#58665d]">
          {event.description}
        </p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-[#e8ece5] pt-4 text-xs text-[#637168]">
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={14} className="text-[#176b38]" aria-hidden="true" />
            {event.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock3 size={14} className="text-[#176b38]" aria-hidden="true" />
            {event.duration} min
          </span>
        </div>
        <Link href={'/'} className="mt-4 flex items-center justify-between border-t border-[#e8ece5] pt-4 text-sm font-semibold text-[#176b38]">
          View Event <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
