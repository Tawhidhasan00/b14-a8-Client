import Image from "next/image";
import Link from "next/link";
import type { EventDetailsData } from "@/lib/type";
import { Pencil } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export type MyEventData = EventDetailsData & { _id: string };

function formatEventDate(date: string) {
  const parsed = new Date(`${date}T00:00:00+06:00`);

  if (Number.isNaN(parsed.getTime())) {
    return "Date not set";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(parsed);
}

export default function MyEvents({ events }: { events: MyEventData[] }) {
  if (!events.length) {
    return (
      <div className="rounded-[13px] border border-dashed border-border bg-card px-5 py-[58px] text-center">
        <h2 className="text-xl font-semibold leading-[1.6]">Your next good thing starts here.</h2>
        <p className="mx-auto mb-[22px] mt-[10px] max-w-[450px] text-sm leading-[1.6] text-(--home-muted)">
          Create your first initiative and invite your neighborhood to get involved.
        </p>
        <Link href="/create-event" className="inline-flex min-h-12 items-center justify-center rounded-[9px] bg-primary px-[23px] py-3 text-sm font-semibold leading-[1.6] text-primary-foreground">
          Create an Event
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-[15px]">
      {events.map((event) => (
        <article key={event._id} className="flex items-center gap-[22px] rounded-xl border border-border bg-card p-[19px] max-[860px]:flex-wrap max-[600px]:gap-[15px] max-[600px]:p-[15px]">
          <Image
            src={event.thumbnail || event.image || "/images/community-volunteer.jpg"}
            alt={event.title}
            width={130}
            height={95}
            unoptimized
            className="h-[95px] w-[130px] shrink-0 rounded-lg object-cover max-[600px]:size-20"
          />
          <div className="min-w-0 flex-1">
            <h2 className="text-[17px] font-semibold leading-[1.6] max-[600px]:text-[15px]">
              {event.title}
            </h2>
            <p className="mt-1.5 text-xs leading-[1.6] text-(--home-muted)">
              {formatEventDate(event.date)}
              {" · "}{event.location}
            </p>
            <span className="mt-2 inline-block rounded-[5px] bg-(--home-sage) px-[10px] py-1 text-[11px] font-semibold leading-[1.6] text-primary">
              {event.eventType}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-[10px] max-[600px]:w-full max-[600px]:border-t max-[600px]:border-border max-[600px]:pt-3">
            <Link
              href={`/manage-events/${event._id}/edit?dialog=true`}
              scroll={false}
              className={buttonVariants({ variant: "outline", className: "h-auto min-h-10 gap-2 rounded-[9px] bg-transparent px-[18px] py-2 text-[13px] font-semibold leading-[1.6] text-foreground" })}
            >
              <Pencil size={16} aria-hidden="true" />
              Edit
            </Link>
            <Dialog>
              <DialogTrigger render={<Button type="button" variant="outline" className="h-auto min-h-10 rounded-[9px] border-[#f0ceca] bg-[#fff4f2] px-[18px] py-2 text-[13px] font-semibold leading-[1.6] text-[#b42318] hover:bg-[#fee4e2] hover:text-[#b42318]" />}>
                Delete
              </DialogTrigger>
              <DialogContent className="w-[calc(100%-2rem)] max-w-[440px] gap-0 rounded-2xl border border-border bg-card p-[29px] text-foreground ring-0 sm:max-w-[440px]">
                <DialogHeader className="gap-0">
                  <DialogTitle className="pr-5 text-[22px] font-semibold leading-[1.6]">Delete this event?</DialogTitle>
                  <DialogDescription className="mb-[23px] mt-3 text-[13px] leading-[1.6] text-(--home-muted)">
                    &ldquo;{event.title}&rdquo; will be removed from the platform and participants&apos; joined events. This cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mx-0 mb-0 flex-row flex-wrap justify-end gap-3.5 rounded-none border-0 bg-transparent p-0">
                  <DialogClose render={<Button type="button" variant="outline" className="h-auto min-h-12 rounded-[9px] px-[23px] py-3 text-sm font-semibold leading-[1.6]" />}>
                    Keep Event
                  </DialogClose>
                  <Button type="button" disabled className="h-auto min-h-12 rounded-[9px] bg-[#b42318] px-[23px] py-3 text-sm font-semibold leading-[1.6] text-white">
                    Delete Event
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </article>
      ))}
    </div>
  );
}
