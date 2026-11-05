import Link from "next/link";
import { EventCard } from "@/components/eventCard";
import { Button } from "@/components/ui/button";
import type { EventCardData } from "@/lib/type";
import ErrorToast from "@/components/error-toast";

export default async function UpcomingEvents() {
  let events: EventCardData[];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events?limit=6`, {
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) throw new Error("Could not load events");
    events = await res.json();
  } catch {
    return (
      <div className="events-placeholder">
        <ErrorToast message="Could not load upcoming events. Please try again." id="upcoming-events-error" />
        <h3>We couldn&apos;t load the events.</h3>
        <p>Something went wrong. Please try again.</p>
        <form action="/#upcoming-events" method="get">
          <Button type="submit" variant="outline" className="retry-button">Try again</Button>
        </form>
      </div>
    );
  }

  if (!events.length) {
    return (
      <div className="events-placeholder">
        <h3>No upcoming events just yet.</h3>
        <p>Start an initiative and bring your neighborhood together.</p>
        <Link href="/create-event" className="text-cta">Create an Event</Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-[25px] max-[860px]:grid-cols-2 max-[600px]:grid-cols-1">
      {events.map((event) => <EventCard key={event._id} event={event} />)}
    </div>
  );
}
