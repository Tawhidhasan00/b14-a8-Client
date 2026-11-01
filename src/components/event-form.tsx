'use client'
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FormEvent} from "react";

const fieldClassName = "flex min-w-0 flex-col gap-[7px]";
const inputClassName =
  "h-auto min-h-11 w-full min-w-0 rounded-[7px] border border-border bg-background px-[13px] py-[11px] text-[13px] leading-[1.6] text-foreground shadow-none placeholder:text-[#89948b] placeholder:opacity-100 focus-visible:border-[var(--home-green)] focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-[var(--home-green)] focus-visible:outline-offset-2 focus-visible:ring-0 md:text-[13px]";
const actionClassName =
  "h-auto min-h-12 rounded-[9px] px-[23px] py-3 text-sm font-semibold leading-[1.6]";

const EventForm = () => {

const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    const res = await fetch('http://localhost:5000/create-event', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
    })
    const data = await res.json()
    console.log(data)

    console.log("Event Data:", formValues);
};

    return (
            <form
                onSubmit={handleSubmit}
              className="grid grid-cols-2 gap-5 max-[600px]:grid-cols-1"
              aria-label="Create a community event"
            >
              <div className={`${fieldClassName} col-span-full`}>
                <label htmlFor="event-title" className="text-xs leading-[1.6] font-semibold">Event title</label>
                <Input
                  className={inputClassName}
                  id="event-title"
                  name="title"
                  placeholder="Give your initiative a clear, friendly name"
                />
              </div>

              <div className={fieldClassName}>
                <label htmlFor="event-type" className="text-xs leading-[1.6] font-semibold">Event type</label>
                <select
                  id="event-type"
                  name="eventType"
                  defaultValue=""
                  className={`${inputClassName} has-[option:checked[value='']]:text-(--home-muted) [&_option]:text-foreground`}
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
                <label htmlFor="event-location" className="text-xs leading-[1.6] font-semibold">Neighborhood / location</label>
                <Input
                  className={inputClassName}
                  id="event-location"
                  name="location"
                  placeholder="e.g. Dhanmondi, Dhaka"
                />
              </div>

              <div className={fieldClassName}>
                <label htmlFor="event-date" className="text-xs leading-[1.6] font-semibold">Event date</label>
                <Input
                  className={inputClassName}
                  id="event-date"
                  name="date"
                  type="date"
                  aria-describedby="event-date-hint"
                />
                <small id="event-date-hint" className="text-[10px] leading-[1.6] text-[var(--home-muted)]">
                  Choose a future date for your initiative.
                </small>
              </div>

              <div className={fieldClassName}>
                <label htmlFor="event-duration" className="text-xs leading-[1.6] font-semibold">Duration in minutes</label>
                <Input
                  className={inputClassName}
                  id="event-duration"
                  name="duration"
                  type="number"
                  defaultValue={60}
                  aria-describedby="event-duration-hint"
                />
                <small id="event-duration-hint" className="text-[10px] leading-[1.6] text-[var(--home-muted)]">
                  Help volunteers find something that fits their day.
                </small>
              </div>

              <div className={`${fieldClassName} col-span-full`}>
                <label htmlFor="event-thumbnail" className="text-xs leading-[1.6] font-semibold">Thumbnail image URL</label>
                <Input
                  className={inputClassName}
                  id="event-thumbnail"
                  name="thumbnail"
                  type="url"
                  placeholder="https://example.com/community-photo.jpg"
                />
              </div>

              <div className={`${fieldClassName} col-span-full`}>
                <label htmlFor="event-description" className="text-xs leading-[1.6] font-semibold">About the event</label>
                <textarea
                  className={cn(inputClassName, "min-h-[140px] resize-y")}
                  id="event-description"
                  name="description"
                  rows={5}
                  placeholder="What will volunteers do, and why does it matter?"
                />
              </div>

              <div className={fieldClassName}>
                <label htmlFor="event-meeting-point" className="text-xs leading-[1.6] font-semibold">Meeting point</label>
                <Input
                  className={inputClassName}
                  id="event-meeting-point"
                  name="meetingPoint"
                  placeholder="e.g. The park's main entrance"
                />
              </div>

              <div className={fieldClassName}>
                <label htmlFor="event-what-to-bring" className="text-xs leading-[1.6] font-semibold">What to bring</label>
                <Input
                  className={inputClassName}
                  id="event-what-to-bring"
                  name="whatToBring"
                  placeholder="e.g. Water, gloves, and a little enthusiasm"
                />
              </div>

              <div className="col-span-full mt-2 flex flex-wrap items-center gap-3.5">
                <Button
                  type="submit"
                  className={`${actionClassName} disabled:opacity-100`}
                  title="Event creation will be connected later"
                >
                  Create Event
                </Button>
                <Link
                  href="/"
                  className={buttonVariants({
                    variant: "outline",
                    className: `${actionClassName} bg-transparent text-foreground`,
                  })}
                >
                  Cancel
                </Link>
              </div>
            </form>
    );
};

export default EventForm;