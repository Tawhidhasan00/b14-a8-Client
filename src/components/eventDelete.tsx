"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";


const EventDelete = ({eventId}: {eventId: string}) => {

    const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/my-events/${eventId}`,
        { method: "DELETE" }
      );

      if (!res.ok) {
        const errorBody = await res.json().catch(() => null);
        throw new Error(errorBody?.message || "Could not delete the event");
      }

      const result = await res.json();
      if (result.deletedCount !== 1) {
        throw new Error("Event no longer exists");
      }

      toast.success("Event deleted successfully");
      router.refresh();
    } catch (error) {
      toast.error(
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
