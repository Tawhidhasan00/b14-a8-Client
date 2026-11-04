"use client";

import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import ManageEventForm from "@/components/forms/manage-event-form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EventDetailsData } from "@/lib/type";

const actionClassName =
  "h-auto min-h-12 rounded-[9px] px-[23px] py-3 text-sm font-semibold leading-[1.6]";

export default function EventEdit({
  event,
  triggerLabel = "Edit Event",
  triggerClassName,
  routed = false,
}: {
  event?: Partial<EventDetailsData>;
  triggerLabel?: string;
  triggerClassName?: string;
  routed?: boolean;
}) {
  const router = useRouter();

  return (
    <Dialog
      open={routed ? true : undefined}
      onOpenChange={(open) => {
        if (routed && !open) router.back();
      }}
    >
      {!routed && (
        <DialogTrigger
          render={
            <Button
              type="button"
              variant="outline"
              className={cn(
                "mt-3 h-auto min-h-11 w-full gap-2 rounded-[9px] border-border bg-transparent px-5 py-3 text-sm font-semibold leading-[1.6] text-primary",
                triggerClassName,
              )}
            />
          }
        >
          <Pencil size={16} aria-hidden="true" />
          {triggerLabel}
        </DialogTrigger>
      )}

      <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-[800px] gap-7 overflow-y-auto rounded-[14px] border border-border bg-card p-5 text-foreground ring-0 sm:max-w-[800px] sm:p-8">
        <DialogHeader className="gap-0 pr-5">
          <p className="mb-3 text-[10px] font-bold uppercase leading-[1.6] tracking-[1.7px] text-primary">
            Keep everyone in the loop
          </p>
          <DialogTitle className="text-[clamp(28px,3vw,36px)] font-semibold leading-[1.2] tracking-[-1px]">
            Update your event.
          </DialogTitle>
          <DialogDescription className="mt-[14px] text-sm leading-[1.8] text-(--home-muted)">
            Make your changes below. Your volunteers will see the latest event details.
          </DialogDescription>
        </DialogHeader>

        <ManageEventForm
          event={event}
          cancelAction={
            <DialogClose render={<Button type="button" variant="outline" className={`${actionClassName} bg-transparent`} />}>
              Cancel
            </DialogClose>
          }
        />
      </DialogContent>
    </Dialog>
  );
}
