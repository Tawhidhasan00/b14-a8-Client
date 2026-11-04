import { EventDetails  } from "@/components/eventDetails";
// import { EventDetailsData } from "@/lib/type";
import { notFound } from "next/navigation";

const EventPage = async({params}: { params: Promise<{ id: string }> }) => {

const { id } = await params;
const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`);
const event = await res.json();

// const events: (EventDetailsData & { _id: string })[] = await response.json();
// const event = events.find((item) => String(item._id) === id);

if (!event) notFound();

    return (
        <div>
            <EventDetails event={event} />
        </div>
    );
};

export default EventPage;



