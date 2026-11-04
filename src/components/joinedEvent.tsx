'use client'
import Link from "next/link";
import { EventCard } from "@/components/eventCard";
import { EventCardData } from "@/lib/type";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";



type JoinedEventData = EventCardData & {
  eventId?: string;
};

export default function JoinedEvents({ events}: { events: JoinedEventData[] }) {
  const router = useRouter();


  if (!events.length) {
    return (
      <div className="rounded-[13px] border border-dashed border-border bg-card px-5 py-[58px] text-center">
        <h2 className="text-xl font-semibold leading-[1.6]">Your community journey is waiting.</h2>
        <p className="mx-auto mb-[22px] mt-[10px] max-w-[450px] text-sm leading-[1.6] text-(--home-muted)">
          Find a cause you care about. Your joined events will appear here.
        </p>
        <Link href="/events" className="inline-flex min-h-12 items-center justify-center rounded-[9px] bg-primary px-[23px] py-3 text-sm font-semibold leading-[1.6] text-primary-foreground">
          Explore Events
        </Link>
      </div>
    );
  }

const handleRemove = async (registrationId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/joined-events/${registrationId}`,
      { method: "DELETE" }
    );

    if (!res.ok) {
      throw new Error("Could not remove registration");
    }

    const result = await res.json();

    if (result.deletedCount === 1) {
      router.refresh();
    } else {
      alert("Registration was not found");
    }
  } catch {
    alert("Could not remove registration. Please try again.");
  }
};


  return (
    <div>
        <p className="mb-[18px] border-l-2 border-[#c6a54a] pl-[11px] text-[11px] leading-[1.6] text-(--home-muted)">
          Joined events
        </p>

      <div className="grid grid-cols-3 gap-[25px] max-[860px]:grid-cols-2 max-[600px]:grid-cols-1">
        {events.map((event) => (
        <div key={event._id} className="flex min-w-0 flex-col gap-3 [&>article]:flex-1">
          <EventCard
            event={{
              ...event,
              _id: event.eventId || event._id,
            }}
          />
          <Button onClick={() => handleRemove(event._id)}
            type="button"
            variant="outline"
            aria-label={`Remove ${event.title} from joined events`}
            className="h-auto min-h-10 w-full gap-2 rounded-[9px] border-[#f0ceca] bg-[#fff4f2] px-[18px] py-2 text-[13px] font-semibold leading-[1.6] text-[#b42318] disabled:opacity-100"
          >
            <Trash2 size={15} aria-hidden="true" />
            Remove
          </Button>
        </div>
        ))}
      </div>
    </div>
  );
}
