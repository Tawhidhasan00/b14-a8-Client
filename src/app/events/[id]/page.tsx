import { EventDetails, type EventDetailsData } from "@/components/eventDetails";
import { notFound } from "next/navigation";

const EventPage = async({params}: { params: Promise<{ id: string }> }) => {

const { id } = await params;
const response = await fetch("http://localhost:5000/events");
const events: (EventDetailsData & { _id: string })[] = await response.json();
const event = events.find((item) => String(item._id) === id);

if (!event) notFound();

    return (
        <div>
            <EventDetails event={event} />
        </div>
    );
};

export default EventPage;



