"use client";
import Link from "next/link";
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { FormEvent, ReactNode } from "react";
import type { EventDetailsData } from "@/lib/type";
import { useRouter } from "next/navigation";

const fieldClassName = "flex min-w-0 flex-col gap-[7px]";
const inputClassName =
  "h-auto min-h-11 w-full min-w-0 rounded-[7px] border border-border bg-background px-[13px] py-[11px] text-[13px] leading-[1.6] text-foreground shadow-none placeholder:text-[#89948b] placeholder:opacity-100 focus-visible:border-[var(--home-green)] focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-[var(--home-green)] focus-visible:outline-offset-2 focus-visible:ring-0 md:text-[13px]";
const actionClassName =
  "h-auto min-h-12 rounded-[9px] px-[23px] py-3 text-sm font-semibold leading-[1.6]";

type EventFormProps = {
  mode?: "create" | "edit";
  event?: Partial<EventDetailsData>;
  cancelAction?: ReactNode;
};

const EventForm = ({ mode = "create", event, cancelAction }: EventFormProps) => {
  const router = useRouter();
  const isEditing = mode === "edit";
  const values = isEditing ? event : undefined;
  const thumbnail = values?.thumbnail || values?.image;
  const idPrefix = isEditing ? "edit-event" : "event";
  const fieldInputClassName = isEditing
    ? "h-auto min-h-11 w-full min-w-0 rounded-[7px] border border-border bg-background px-[13px] py-[11px] text-[13px] leading-[1.6] text-foreground shadow-none placeholder:text-[#89948b] focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 md:text-[13px]"
    : inputClassName;

const handleSubmit = async (
  submitEvent: FormEvent<HTMLFormElement>
) => {
  submitEvent.preventDefault();

  if (isEditing && !event?._id) {
    alert("Event ID is missing");
    return;
  }

  const formValues = Object.fromEntries(
    new FormData(submitEvent.currentTarget).entries()
  );

  const payload = {
    ...formValues,
    duration: Number(formValues.duration),
  };

  try {
    const response = await fetch(
      isEditing
        ? `${process.env.NEXT_PUBLIC_API_URL}/events/${event?._id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/create-event`,
      {
        method: isEditing ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error("Could not save event");
    }

    const result = await response.json();

    if (isEditing) {
      if (result.matchedCount === 0) {
        throw new Error("Event no longer exists");
      }

      router.replace("/manage-events");
      router.refresh();
    } else {
      console.log(result);
    }
  } catch (error) {
    alert(
      error instanceof Error
        ? error.message
        : "Something went wrong"
    );
  }
};

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 gap-5 max-[600px]:grid-cols-1"
      aria-label={isEditing ? "Edit a community event" : "Create a community event"}
    >
      <div className={`${fieldClassName} col-span-full`}>
        <label htmlFor={`${idPrefix}-title`} className="text-xs leading-[1.6] font-semibold">Event title</label>
        <Input
          className={fieldInputClassName}
          id={`${idPrefix}-title`}
          name="title"
          defaultValue={values?.title}
          placeholder="Give your initiative a clear, friendly name"
        />
      </div>

      <div className={fieldClassName}>
        <label htmlFor={`${idPrefix}-type`} className="text-xs leading-[1.6] font-semibold">Event type</label>
        <select
          id={`${idPrefix}-type`}
          name="eventType"
          defaultValue={values?.eventType || ""}
          className={isEditing ? fieldInputClassName : `${fieldInputClassName} has-[option:checked[value='']]:text-(--home-muted) [&_option]:text-foreground`}
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
          className={fieldInputClassName}
          id={`${idPrefix}-location`}
          name="location"
          defaultValue={values?.location}
          placeholder="e.g. Dhanmondi, Dhaka"
        />
      </div>

      <div className={fieldClassName}>
        <label htmlFor={`${idPrefix}-date`} className="text-xs leading-[1.6] font-semibold">Event date</label>
        <Input
          className={fieldInputClassName}
          id={`${idPrefix}-date`}
          name="date"
          type="date"
          required
          defaultValue={values?.date}
          aria-describedby={`${idPrefix}-date-hint`}
        />
        <small id={`${idPrefix}-date-hint`} className="text-[10px] leading-[1.6] text-[var(--home-muted)]">
          {isEditing ? "Choose tomorrow or later. Dates use Bangladesh time." : "Choose a future date for your initiative."}
        </small>
      </div>

      <div className={fieldClassName}>
        <label htmlFor={`${idPrefix}-duration`} className="text-xs leading-[1.6] font-semibold">Duration in minutes</label>
        <Input
          className={fieldInputClassName}
          id={`${idPrefix}-duration`}
          name="duration"
          type="number"
          defaultValue={values?.duration ?? 60}
          aria-describedby={`${idPrefix}-duration-hint`}
        />
        <small id={`${idPrefix}-duration-hint`} className="text-[10px] leading-[1.6] text-[var(--home-muted)]">
          Help volunteers find something that fits their day.
        </small>
      </div>

      <div className={`${fieldClassName} col-span-full`}>
        <label htmlFor={`${idPrefix}-thumbnail`} className="text-xs leading-[1.6] font-semibold">Thumbnail image URL</label>
        <Input
          className={fieldInputClassName}
          id={`${idPrefix}-thumbnail`}
          name="thumbnail"
          type="url"
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
          className={cn(fieldInputClassName, "min-h-[140px] resize-y")}
          id={`${idPrefix}-description`}
          name="description"
          defaultValue={values?.description}
          rows={isEditing ? undefined : 5}
          placeholder="What will volunteers do, and why does it matter?"
        />
      </div>

      <div className={fieldClassName}>
        <label htmlFor={`${idPrefix}-meeting-point`} className="text-xs leading-[1.6] font-semibold">Meeting point</label>
        <Input
          className={fieldInputClassName}
          id={`${idPrefix}-meeting-point`}
          name="meetingPoint"
          defaultValue={values?.meetingPoint}
          placeholder="e.g. The park's main entrance"
        />
      </div>

      <div className={fieldClassName}>
        <label htmlFor={`${idPrefix}-what-to-bring`} className="text-xs leading-[1.6] font-semibold">What to bring</label>
        <Input
          className={fieldInputClassName}
          id={`${idPrefix}-what-to-bring`}
          name="whatToBring"
          defaultValue={values?.whatToBring}
          placeholder="e.g. Water, gloves, and a little enthusiasm"
        />
      </div>

      <div className="col-span-full mt-2 flex flex-wrap items-center gap-3.5">
        <Button
          type="submit"
          className={`${actionClassName} ${isEditing ? "disabled:opacity-60" : "disabled:opacity-100"}`}
        >
          {isEditing ? "Save Changes" : "Create Event"}
        </Button>
        {cancelAction ?? <Link
          href={isEditing ? "/manage-events" : "/"}
          className={buttonVariants({
            variant: "outline",
            className: `${actionClassName} bg-transparent${isEditing ? "" : " text-foreground"}`,
          })}
        >
          Cancel
        </Link>}
      </div>
    </form>
  );
};

export default EventForm;
