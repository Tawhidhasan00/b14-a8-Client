import { EventDetails  } from "@/components/eventDetails";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

const EventPage = async({params}: { params: Promise<{ id: string }> }) => {

    const { id } = await params;
    // const jwtToken = await auth.api.getToken({
    //     headers: await headers()
    // })
    // console.log(jwtToken?.token)
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`, {
        // headers: {
        //     authorization: jwtToken?.token
        // }
        cache: "no-store" 
    });
    const event = await res.json();

        if (!event) {
            notFound();
        }
        

        return (
            <div>
                <EventDetails event={event} />
            </div>
        );
    };

export default EventPage;



