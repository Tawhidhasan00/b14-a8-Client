import { EventCardData } from "@/lib/type";
import { ArrowUpRight, CalendarDays, Clock3, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";



export function EventCard({ event }: { event: EventCardData }) {
  
  return (
    <article className="group flex flex-col overflow-hidden rounded-[13px] border border-[#dce4da] dark:border-border bg-card text-[#17251d] dark:text-foreground transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_8px_22px_#17251d0d]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#e8eddf] dark:bg-(--home-sage)">
        <Image
          src={event.thumbnail || event.image || "/images/community-volunteer.jpg"}
          alt={event.title}
          width={900}
          height={675}
          unoptimized
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <span className="absolute left-[15px] top-[15px] rounded-[5px] bg-[#fffffff0] dark:bg-card/95 px-[11px] py-[5px] text-[10px] font-semibold text-[#25462d] dark:text-(--home-green)">
          {event.eventType}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-[21px]">
        <p className="mb-[10px] flex items-center gap-[7px] text-[10px] font-semibold text-[#166534] dark:text-(--home-green)">
          <CalendarDays size={14} aria-hidden="true" />
          {event.date}
        </p>
        <h2 className="text-[17px] font-semibold leading-[1.4] tracking-[-0.4px]">
          {event.title}
        </h2>
        <p className="mt-[10px] line-clamp-2 text-xs leading-[1.8] text-[#59675e] dark:text-muted-foreground">
          {event.description}
        </p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 py-[17px] text-[10px] text-[#59675e] dark:text-muted-foreground">
          <span className="inline-flex items-center gap-[5px]">
            <MapPin size={14} aria-hidden="true" />
            {event.location}
          </span>
          <span className="inline-flex items-center gap-[5px]">
            <Clock3 size={14} aria-hidden="true" />
            {event.duration} min
          </span>
        </div>

          <Link href={`/events/${event._id}`} className="flex items-center justify-between border-t border-[#dce4da] dark:border-border pt-[15px] text-xs font-semibold leading-[1.6] text-[#166534] dark:text-(--home-green)">
            View Event <ArrowUpRight size={18} aria-hidden="true" />
          </Link>

      </div>
    </article>
  );
}
