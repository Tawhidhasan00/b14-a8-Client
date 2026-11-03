'use client'

import { useState } from "react"; 
import { Pencil } from "lucide-react";
import { ProfileForm, type ProfileData } from "@/components/profile-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ProfileUpdateDialog({ profile }: { profile: ProfileData }) {

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button type="button" className="h-auto min-h-12 gap-2 rounded-[9px] px-[23px] py-3 text-sm font-semibold leading-[1.6]" />
        }
      >
        <Pencil size={17} aria-hidden="true" />
        Update Profile
      </DialogTrigger>
      <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-[600px] gap-6 overflow-y-auto rounded-[14px] border border-border bg-card p-5 text-foreground ring-0 sm:max-w-[600px] sm:p-8">
        <DialogHeader className="gap-0 pr-5">
          <p className="mb-3 text-[10px] font-bold uppercase leading-[1.6] tracking-[1.7px] text-primary">
            A familiar face
          </p>
          <DialogTitle className="text-[28px] font-semibold leading-[1.2] tracking-[-0.9px]">
            Update your profile.
          </DialogTitle>
          <DialogDescription className="mt-[14px] text-sm leading-[1.8] text-(--home-muted)">
            Update your name and profile photo. Your account email stays the same.
          </DialogDescription>
        </DialogHeader>
        <ProfileForm
          profile={profile}
          onSaved={() => setOpen(false)}
          idPrefix="update-profile"
          className="max-w-none rounded-none border-0 bg-transparent p-0 max-[600px]:p-0"
          cancelAction={
            <DialogClose
              render={
                <Button type="button" variant="outline" className="h-auto min-h-12 rounded-[9px] bg-transparent px-[23px] py-3 text-sm font-semibold leading-[1.6]" />
              }
            >
              Cancel
            </DialogClose>
          }
        />
      </DialogContent>
    </Dialog>
  );
}
