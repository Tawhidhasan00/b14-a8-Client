import JoinedEvents from "@/components/joinedEvent";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function JoinedEventsPage() {

  const session = await auth.api.getSession({
    headers: await headers()
  });
  if (!session) redirect("/login");

  const user = session.user;
  const jwtToken = await auth.api.getToken({ headers: await headers() });
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/joined-events/${encodeURIComponent(user.email)}`, {
    cache: "no-store",
    headers: { authorization: `Bearer ${jwtToken.token}` },
  })
  if (!res.ok) throw new Error("Could not load joined events");
  const joinedData = await res.json();
  

  return (
    <section className="site-container min-h-[65vh] pb-[85px] pt-[55px] text-foreground max-[600px]:pb-[60px] max-[600px]:pt-[35px]">
      <div className="mb-[34px] max-w-[680px]">
        <p className="mb-3 text-[10px] font-bold uppercase leading-[1.6] tracking-[1.7px] text-primary max-[600px]:text-[8px] max-[600px]:tracking-[1.2px]">
          The causes you care about
        </p>
        <h1 className="text-[clamp(30px,4vw,43px)] font-semibold leading-[1.2] tracking-[-1.5px]">
          Your time, making a difference.
        </h1>
        <p className="mt-[14px] text-sm leading-[1.8] text-(--home-muted)">
          All the initiatives you&apos;ve joined, sorted by event date. Here&apos;s where you&apos;re showing up.
        </p>
      </div>
      <JoinedEvents events={joinedData} />
    </section>
  );
}
