"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";


const EventDelete = ({eventId}: {eventId: string}) => {

    const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/events/${eventId}`,
        { method: "DELETE" }
      );

      if (!res.ok) {
        throw new Error("Could not delete the event");
      }

      router.refresh();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    }
  };
    
  return (
    <Button
      type="button"
      onClick={handleDelete}
      className="h-auto min-h-12 rounded-[9px] bg-[#b42318] px-[23px] py-3 text-sm font-semibold leading-[1.6] text-white"
    >
      Delete Event
    </Button>
  );
};

export default EventDelete;