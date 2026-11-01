import { Search, SlidersHorizontal } from "lucide-react";
import { EventCard, type EventCardData } from "./eventCard";


const EventsList = async() => {

    const res = await fetch('http://localhost:5000/events')
    const events: EventCardData[] = await res.json();
    // console.log(events)

    return (
  <div>
    <div className="mb-[27px] flex flex-wrap items-center gap-3">
      <label className="flex min-w-[240px] flex-1 items-center gap-[10px] rounded-lg border border-[#dce4da] bg-card px-4 py-3 text-[#59675e]">
        <Search size={18} className="shrink-0" aria-hidden="true" />
        <span className="sr-only">Search events or neighborhoods</span>
        <input
          aria-label="Search events or neighborhoods"
          placeholder="Search an event or neighborhood..."
          className="min-w-0 w-full border-0 bg-transparent text-[13px] text-[#17251d] outline-offset-3"
        />
      </label>
      <label className="flex items-center gap-[10px] rounded-lg border border-[#dce4da] bg-card px-4 py-3 text-[#59675e] max-[600px]:flex-1">
        <SlidersHorizontal size={17} className="shrink-0" aria-hidden="true" />
        <span className="sr-only">Event category</span>
        <select
          aria-label="Event category"
          defaultValue=""
          className="min-w-0 w-full border-0 bg-transparent text-[13px] text-[#17251d] outline-offset-3 [&_option]:bg-card"
        >
          <option value="">All categories</option>
          <option>Cleanup</option>
          <option>Plantation</option>
          <option>Food Distribution</option>
        </select>
      </label>
      <label className="flex cursor-pointer items-center gap-[7px] p-3 text-xs leading-[1.6] text-[#17251d]">
        <input type="checkbox" className="size-[15px] accent-[#166534]" />
        I have one hour
      </label>
    </div>

    <div className="grid grid-cols-3 gap-[25px] max-[860px]:grid-cols-2 max-[600px]:grid-cols-1">
      {events.map((event) => (
        <EventCard key={event.title} event={event} />
      ))}
    </div>
  </div>
    );
};

export default EventsList;
