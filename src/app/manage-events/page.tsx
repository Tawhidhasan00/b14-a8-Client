import Link from "next/link";
import MyEvents from "@/components/myEvent";


import React from 'react';

const ManageEventsPage = async() => {

  const res = await fetch("http://localhost:5000/events", { cache: "no-store" });
  const events = await res.json();

  return (
    <section className="site-container min-h-[65vh] pb-[85px] pt-[55px] text-foreground max-[600px]:pb-[60px] max-[600px]:pt-[35px]">
      <div className="flex items-center justify-between gap-5 max-[600px]:mb-[25px] max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-0">
        <div className="mb-[34px] max-w-[680px]">
          <p className="mb-3 text-[10px] font-bold uppercase leading-[1.6] tracking-[1.7px] text-primary max-[600px]:text-[8px] max-[600px]:tracking-[1.2px]">
            The good you started
          </p>
          <h1 className="text-[clamp(30px,4vw,43px)] font-semibold leading-[1.2] tracking-[-1.5px]">
            Manage your initiatives.
          </h1>
          <p className="mt-[14px] text-sm leading-[1.8] text-(--home-muted)">
            Keep your community up to date. Edit details or manage the events you&apos;ve created.
          </p>
        </div>
        <Link href="/create-event" className="inline-flex min-h-12 shrink-0 items-center justify-center whitespace-nowrap rounded-[9px] border border-transparent bg-primary px-[23px] py-3 text-sm font-semibold leading-[1.6] text-primary-foreground transition-[opacity,transform] hover:-translate-y-px hover:opacity-90">
          + Create Event
        </Link>
      </div>
      <MyEvents events={events} />
    </section>
  );
};

export default ManageEventsPage;


