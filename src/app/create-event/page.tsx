
import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import EventForm from "@/components/event-form";


export const metadata: Metadata = {
  title: "Create an Event | CommonKind",
  description:
    "Bring your neighbors together for a local cause. Start a community initiative with CommonKind.",
};



export default function CreateEventPage() {


  return (
    <section
      className="min-h-[65vh] pt-13.75 pb-21.25 max-[600px]:pt-8.75 max-[600px]:pb-15"
      aria-labelledby="create-event-title"
    >
      <div className="site-container">
        <div className="mb-8.5 max-w-170">
          <p className="m-0 mb-3 text-[10px] leading-normal font-bold tracking-[1.7px] text-(--home-green) uppercase">
            Start something good
          </p>
          <h1
            id="create-event-title"
            className="m-0 text-[clamp(30px,4vw,43px)] leading-[1.2] font-semibold tracking-[-1.5px]"
          >
            Your idea. Your neighborhood.
          </h1>
          <p className="m-0 mt-3.5 text-sm leading-[1.8] text-(--home-muted)">
            Bring people together for a cause that matters. A few details are
            all it takes to get started.
          </p>
        </div>

        <Card className="w-full max-w-200 rounded-[14px] border-border bg-card text-foreground shadow-none">
          <CardContent className="p-8 max-[600px]:p-5.75">
            <EventForm/>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
