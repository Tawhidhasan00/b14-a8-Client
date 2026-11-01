import { Search, SlidersHorizontal } from "lucide-react";
import { EventCard } from "./eventCard";


const EventsList = async() => {

    const res = await fetch('http://localhost:5000/events')
    const events = await res.json();
    // console.log(events)

    return (
  <div className="space-y-7">
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-[#dce3d8] bg-white p-3">
      <label className="flex min-w-56 flex-1 items-center gap-2 rounded-lg border border-[#dce3d8] px-3 py-2.5 text-[#637168]">
        <Search size={17} aria-hidden="true" />
        <span className="sr-only">Search events or neighborhoods</span>
        <input
          aria-label="Search events or neighborhoods"
          placeholder="Search an event or neighborhood..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-[#89948b]"
        />
      </label>
      <label className="flex items-center gap-2 rounded-lg border border-[#dce3d8] px-3 py-2.5 text-sm text-[#344239]">
        <SlidersHorizontal size={16} aria-hidden="true" />
        <span className="sr-only">Event category</span>
        <select
          aria-label="Event category"
          defaultValue=""
          className="bg-transparent outline-none"
        >
          <option value="">All categories</option>
          <option>Cleanup</option>
          <option>Plantation</option>
          <option>Food Distribution</option>
        </select>
      </label>
      <label className="flex items-center gap-2 px-2 text-sm text-[#344239]">
        <input type="checkbox" className="accent-[#176b38]" />
        I have one hour
      </label>
    </div>

    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.title} event={event} />
      ))}
    </div>
  </div>
    );
};

export default EventsList;