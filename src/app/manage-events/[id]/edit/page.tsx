import { notFound } from "next/navigation";
import EventForm from "@/components/forms/event-form";
import EventEdit from "@/components/eventEdit";
import ManageEventsPage from "@/app/manage-events/page";

export default async function EditEventPage({ params, searchParams }: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ dialog?: string }>;
}) {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`)
  if (res.status === 404) notFound();
  if (!res.ok) throw new Error("Could not load event");

  const event = await res.json();
  if (!event) notFound();

  if ((await searchParams).dialog === "true") {
    return (
      <>
        <ManageEventsPage />
        <EventEdit event={event} routed />
      </>
    );
  }

  return (
    <section className="site-container min-h-[65vh] pb-[85px] pt-[55px] text-foreground max-[600px]:pb-[60px] max-[600px]:pt-[35px]">
      <div className="mb-[34px] max-w-[680px]">
        <p className="mb-3 text-[10px] font-bold uppercase leading-[1.6] tracking-[1.7px] text-primary max-[600px]:text-[8px] max-[600px]:tracking-[1.2px]">
          Keep everyone in the loop
        </p>
        <h1 className="text-[clamp(30px,4vw,43px)] font-semibold leading-[1.2] tracking-[-1.5px]">
          Update your event.
        </h1>
        <p className="mt-[14px] text-sm leading-[1.8] text-(--home-muted)">
          Make your changes below. Your volunteers will see the latest event details.
        </p>
      </div>
      <div className="max-w-[800px] rounded-[14px] border border-border bg-card p-8 max-[600px]:p-[23px]">
        <EventForm mode="edit" event={event} />
      </div>
    </section>
  );
}
