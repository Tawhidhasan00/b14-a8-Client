import { ArrowLeft, CalendarDays, Clock3, MapPin, UserRound } from "lucide-react";
import Image from "next/image";

export type EventDetailsData = {
  title: string;
  eventType: string;
  location: string;
  date: string;
  duration: number;
  description: string;
  meetingPoint: string;
  whatToBring: string;
  creatorName: string;
  image: string;
};

export function EventDetails({ event }: { event: EventDetailsData }) {
  const details = [
    { icon: CalendarDays, label: "WHEN", value: event.date },
    { icon: MapPin, label: "WHERE", value: event.location },
    { icon: Clock3, label: "YOUR TIME", value: `${event.duration} minutes` },
    { icon: UserRound, label: "ORGANIZED BY", value: event.creatorName },
  ];

  return (
    <section className="mx-auto grid w-full max-w-[1080px] items-start gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[1.65fr_0.9fr] lg:gap-10 lg:py-16">
      <article className="min-w-0">
        <div className="mb-6 flex items-center gap-2 text-sm text-[#526257]">
          <ArrowLeft size={15} aria-hidden="true" />
          <span>Back to events</span>
        </div>
        <div className="relative aspect-[16/9] overflow-hidden rounded-[16px] bg-[#e9eee2]">
          <Image
            src={event.image}
            alt=""
            width={1600}
            height={900}
            unoptimized
            className="h-full w-full object-cover"
          />
        </div>
        <span className="mt-6 inline-flex rounded-full bg-[#e9eee2] px-3 py-1.5 text-xs font-semibold text-[#176b38]">
          {event.eventType}
        </span>
        <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] text-[#19271e] sm:text-4xl">
          {event.title}
        </h1>
        <h2 className="mt-9 text-xl font-semibold tracking-[-0.02em] text-[#19271e]">
          A little about this initiative
        </h2>
        <p className="mt-3 whitespace-pre-line text-sm leading-7 text-[#58665d]">
          {event.description}
        </p>
        <h2 className="mt-8 text-xl font-semibold tracking-[-0.02em] text-[#19271e]">
          Where we'll meet
        </h2>
        <p className="mt-3 text-sm leading-7 text-[#58665d]">{event.meetingPoint}</p>
        <h2 className="mt-8 text-xl font-semibold tracking-[-0.02em] text-[#19271e]">
          What to bring
        </h2>
        <p className="mt-3 text-sm leading-7 text-[#58665d]">{event.whatToBring}</p>
      </article>

      <aside className="rounded-[16px] border border-[#dce3d8] bg-white p-6 shadow-[0_12px_40px_rgba(25,39,30,0.04)] sm:p-7 lg:sticky lg:top-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#176b38]">
          Make a little time.
        </p>
        <div className="mt-6 divide-y divide-[#e8ece5]">
          {details.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex gap-3 py-4 first:pt-0">
              <Icon size={18} className="mt-0.5 shrink-0 text-[#176b38]" aria-hidden="true" />
              <div className="min-w-0">
                <p className="text-[10px] font-semibold tracking-[0.12em] text-[#89948b]">
                  {label}
                </p>
                <p className="mt-1 break-words text-sm font-medium text-[#26352b]">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="mt-5 min-h-12 w-full rounded-[9px] bg-[#176b38] px-5 py-3 text-sm font-semibold text-white"
        >
          Join Event
        </button>
        <p className="mt-4 text-center text-xs leading-5 text-[#637168]">
          A little of your time. A whole lot of good.
        </p>
      </aside>
    </section>
  );
}
