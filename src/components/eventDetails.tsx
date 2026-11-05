'use client'
import { EventDetailsData } from "@/lib/type";
import { ArrowLeft, CalendarDays, Check, Clock3, MapPin, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import toast from "react-hot-toast";



export function EventDetails({ event }: { event: EventDetailsData }) {
  const details = [
    { icon: CalendarDays, label: "WHEN", value: event.date },
    { icon: MapPin, label: "WHERE", value: event.location },
    { icon: Clock3, label: "YOUR TIME", value: `${event.duration} minutes` },
    { icon: UserRound, label: "ORGANIZED BY", value: event.creatorName },
  ];

  const {data: session} = authClient.useSession();
  const user = session?.user;
  const [joinStatus, setJoinStatus] = useState<"idle" | "joining" | "joined">("idle");

  const handleJoin = async() => {
    if (joinStatus !== "idle") return;

    if (!user?.email) {
      toast.error("Please log in before joining");
      return;
    }

    const { _id: eventId, ...eventData } = event;
const data = {
  ...eventData,
  eventId,
  name: user.name,
  email: user.email,
  participantImage: user.image,
};
    setJoinStatus("joining");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/joined`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!res.ok) {
        const errorBody = await res.json().catch(() => null);
        throw new Error(errorBody?.message || "Could not join the event. Please try again.");
      }
      const joinedData = await res.json();
      console.log(joinedData);
      setJoinStatus("joined");
      if (joinedData.alreadyJoined) {
        toast("You have already joined this event");
      } else {
        toast.success("Joined event successfully");
      }
    } catch (error) {
      setJoinStatus("idle");
      toast.error(error instanceof Error ? error.message : "Could not join the event. Please try again.");
    }
  }


  return (
    <section className="container mx-auto min-h-[65vh] w-[min(1200px,calc(100%-64px))] pb-[85px] pt-[55px] text-[#17251d] max-[600px]:w-[calc(100%-36px)] max-[600px]:pb-[60px] max-[600px]:pt-[35px]">
        <Link href="/events" className="mb-[27px] inline-flex items-center gap-[7px] text-xs leading-[1.6] text-[#59675e]">
          <ArrowLeft size={15} aria-hidden="true" />
          Back to events
        </Link>
      <div className="grid grid-cols-[1.7fr_1fr] items-start gap-9 max-[860px]:grid-cols-[1.4fr_1fr] max-[860px]:gap-6 max-[600px]:grid-cols-1">
      <article className="min-w-0">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[15px] bg-[#e8eddf]">
          <Image
            src={event.thumbnail || event.image || "/images/community-volunteer.jpg"}
            alt={event.title}
            width={1600}
            height={1000}
            unoptimized
            className="h-full w-full object-cover"
          />
        </div>
        <span className="mt-[25px] inline-block rounded-[5px] bg-[#e8eddf] px-[10px] py-1 text-[11px] font-semibold text-[#166534]">
          {event.eventType}
        </span>
        <h1 className="my-[18px] text-[clamp(28px,3vw,40px)] font-semibold leading-[1.25] tracking-[-1px]">
          {event.title}
        </h1>
        <h2 className="mb-[13px] mt-8 text-xl font-semibold leading-[1.6]">
          A little about this initiative
        </h2>
        <p className="whitespace-pre-wrap text-sm leading-[1.9] text-[#59675e] [overflow-wrap:anywhere]">
          {event.description}
        </p>
        <h2 className="mb-[13px] mt-8 text-xl font-semibold leading-[1.6]">
          Where we&apos;ll meet
        </h2>
        <p className="whitespace-pre-wrap text-sm leading-[1.9] text-[#59675e] [overflow-wrap:anywhere]">{event.meetingPoint}</p>
        <h2 className="mb-[13px] mt-8 text-xl font-semibold leading-[1.6]">
          What to bring
        </h2>
        <p className="whitespace-pre-wrap text-sm leading-[1.9] text-[#59675e] [overflow-wrap:anywhere]">{event.whatToBring}</p>
      </article>

      <aside className="sticky top-[113px] rounded-[14px] border border-[#dce4da] bg-card p-7 max-[860px]:p-[22px] max-[600px]:static">
        <h2 className="mb-[21px] text-[19px] font-semibold">
          Make a little time.
        </h2>
        <div>
          {details.map(({ icon: Icon, label, value }) => (
            <div key={label} className="mb-[19px] flex items-start gap-[11px]">
              <Icon size={19} className="mt-1 shrink-0 text-[#166534]" aria-hidden="true" />
              <div className="min-w-0">
                <small className="block text-[10px] text-[#59675e]">
                  {label}
                </small>
                <strong className="break-words text-[13px] font-medium">
                  {value}
                </strong>
              </div>
            </div>
          ))}
        </div>

        <button onClick={handleJoin}
          type="button"
          disabled={joinStatus !== "idle"}
          aria-busy={joinStatus === "joining"}
          className="mt-2 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[9px] border border-transparent bg-[#166534] px-[23px] py-3 text-sm font-semibold leading-[1.6] text-white transition-[opacity,transform] duration-200 hover:-translate-y-px hover:opacity-90 disabled:cursor-default disabled:hover:translate-y-0 disabled:hover:opacity-100"
        >
            {joinStatus === "joined" ? (
              <><Check size={17} aria-hidden="true" /> Joined</>
            ) : joinStatus === "joining" ? "Joining..." : "Join Event"}
        </button>

        <p className="mt-3 text-center text-[10px] text-[#59675e]">
          A little of your time. A whole lot of good.
        </p>
      </aside>
      </div>
    </section>
  );
}
