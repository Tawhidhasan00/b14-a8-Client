"use client";

import Link from "next/link";
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { FormEvent, ReactNode } from "react";
import type { EventDetailsData } from "@/lib/type";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getEarliestEventDate, getEventValidationError } from "@/lib/event-validation";
import { notifyInvalidField } from "@/lib/form-feedback";

const fieldClassName = "flex min-w-0 flex-col gap-[7px]";
const inputClassName =
  "h-auto min-h-11 w-full min-w-0 rounded-[7px] border border-border bg-background px-[13px] py-[11px] text-[13px] leading-[1.6] text-foreground shadow-none placeholder:text-[#89948b] focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 md:text-[13px]";
const actionClassName =
  "h-auto min-h-12 rounded-[9px] px-[23px] py-3 text-sm font-semibold leading-[1.6]";
const idPrefix = "edit-event";

type ManageEventFormProps = {
  event?: Partial<EventDetailsData>;
  cancelAction?: ReactNode;
};

export default function ManageEventForm({ event, cancelAction }: ManageEventFormProps) {
  const router = useRouter();
  const thumbnail = event?.thumbnail || event?.image;

  const handleSubmit = async (submitEvent: FormEvent<HTMLFormElement>) => {
    submitEvent.preventDefault();
    if (!event?._id) {
      toast.error("Event ID is missing");
      return;
    }

    const formValues = Object.fromEntries(
      new FormData(submitEvent.currentTarget).entries()
    );
    const validationError = getEventValidationError(formValues);
    if (validationError) {
      toast.error(validationError);
      return;
    }
    const payload = {
      ...formValues,
      duration: Number(formValues.duration),
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-events/${event._id}`,{
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) {
        const errorBody = await res.json().catch(() => null);
        throw new Error(errorBody?.message || `Could not save event (HTTP ${res.status})`);
      }

      const result = await res.json();
      console.log(result);
      if (result.matchedCount === 0) throw new Error("Event no longer exists");

      toast.success("Event updated successfully");
      router.replace("/manage-events");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      onInvalidCapture={notifyInvalidField}
      className="grid grid-cols-2 gap-5 max-[600px]:grid-cols-1"
      aria-label="Edit a community event"
    >
      <div className={`${fieldClassName} col-span-full`}>
        <label htmlFor={`${idPrefix}-title`} className="text-xs leading-[1.6] font-semibold">Event title</label>
        <Input
          className={inputClassName}
          id={`${idPrefix}-title`}
          name="title"
          required
          defaultValue={event?.title}
          placeholder="Give your initiative a clear, friendly name"
        />
      </div>

      <div className={fieldClassName}>
        <label htmlFor={`${idPrefix}-type`} className="text-xs leading-[1.6] font-semibold">Event type</label>
        <select
          id={`${idPrefix}-type`}
          name="eventType"
          required
          defaultValue={event?.eventType || ""}
          className={inputClassName}
        >
          <option value="" disabled>Select a cause</option>
          <option value="Cleanup">Cleanup</option>
          <option value="Plantation">Plantation</option>
          <option value="Donation">Donation</option>
          <option value="Education">Education</option>
          <option value="Food Distribution">Food Distribution</option>
          <option value="Winter Relief">Winter Relief</option>
        </select>
      </div>

      <div className={fieldClassName}>
        <label htmlFor={`${idPrefix}-location`} className="text-xs leading-[1.6] font-semibold">Neighborhood / location</label>
        <Input
          className={inputClassName}
          id={`${idPrefix}-location`}
          name="location"
          required
          defaultValue={event?.location}
          placeholder="e.g. Dhanmondi, Dhaka"
        />
      </div>

      <div className={fieldClassName}>
        <label htmlFor={`${idPrefix}-date`} className="text-xs leading-[1.6] font-semibold">Event date</label>
        <Input
          className={inputClassName}
          id={`${idPrefix}-date`}
          name="date"
          type="date"
          required
          min={getEarliestEventDate()}
          defaultValue={event?.date}
          aria-describedby={`${idPrefix}-date-hint`}
        />
        <small id={`${idPrefix}-date-hint`} className="text-[10px] leading-[1.6] text-[var(--home-muted)]">
          Choose tomorrow or later. Dates use Bangladesh time.
        </small>
      </div>

      <div className={fieldClassName}>
        <label htmlFor={`${idPrefix}-duration`} className="text-xs leading-[1.6] font-semibold">Duration in minutes</label>
        <Input
          className={inputClassName}
          id={`${idPrefix}-duration`}
          name="duration"
          type="number"
          defaultValue={event?.duration ?? 60}
          aria-describedby={`${idPrefix}-duration-hint`}
        />
        <small id={`${idPrefix}-duration-hint`} className="text-[10px] leading-[1.6] text-[var(--home-muted)]">
          Help volunteers find something that fits their day.
        </small>
      </div>

      <div className={`${fieldClassName} col-span-full`}>
        <label htmlFor={`${idPrefix}-thumbnail`} className="text-xs leading-[1.6] font-semibold">Thumbnail image URL</label>
        <Input
          className={inputClassName}
          id={`${idPrefix}-thumbnail`}
          name="thumbnail"
          type="url"
          required
          pattern="https?://.+"
          defaultValue={thumbnail}
          placeholder="https://example.com/community-photo.jpg"
        />
        {thumbnail && (
          <Image
            src={thumbnail}
            alt="Current event thumbnail"
            width={1000}
            height={750}
            unoptimized
            className="h-45 w-full rounded-[9px] bg-muted object-cover"
          />
        )}
      </div>

      <div className={`${fieldClassName} col-span-full`}>
        <label htmlFor={`${idPrefix}-description`} className="text-xs leading-[1.6] font-semibold">About the event</label>
        <textarea
          className={cn(inputClassName, "min-h-[140px] resize-y")}
          id={`${idPrefix}-description`}
          name="description"
          required
          defaultValue={event?.description}
          placeholder="What will volunteers do, and why does it matter?"
        />
      </div>

      <div className={fieldClassName}>
        <label htmlFor={`${idPrefix}-meeting-point`} className="text-xs leading-[1.6] font-semibold">Meeting point</label>
        <Input
          className={inputClassName}
          id={`${idPrefix}-meeting-point`}
          name="meetingPoint"
          defaultValue={event?.meetingPoint}
          placeholder="e.g. The park's main entrance"
        />
      </div>

      <div className={fieldClassName}>
        <label htmlFor={`${idPrefix}-what-to-bring`} className="text-xs leading-[1.6] font-semibold">What to bring</label>
        <Input
          className={inputClassName}
          id={`${idPrefix}-what-to-bring`}
          name="whatToBring"
          defaultValue={event?.whatToBring}
          placeholder="e.g. Water, gloves, and a little enthusiasm"
        />
      </div>

      <div className="col-span-full mt-2 flex flex-wrap items-center gap-3.5">
        <Button
          type="submit"
          className={`${actionClassName} disabled:opacity-60`}
        >
          Save Changes
        </Button>
        {cancelAction ?? <Link
          href="/manage-events"
          className={buttonVariants({
            variant: "outline",
            className: `${actionClassName} bg-transparent`,
          })}
        >
          Cancel
        </Link>}
      </div>
    </form>
  );
}
