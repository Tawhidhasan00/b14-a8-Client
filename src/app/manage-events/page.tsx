import Link from "next/link";
import MyEvents from "@/components/myEvent";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { MyEventData } from "@/components/myEvent";


const ManageEventsPage = async() => {

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/my-events/user/${encodeURIComponent(session.user.email)}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Could not load your events");
  const events: MyEventData[] = await res.json();

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


