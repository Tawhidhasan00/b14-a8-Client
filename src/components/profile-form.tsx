'use client'

import type { FormEvent, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

import Image from "next/image";
import Link from "next/link";
import { UserRound } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type ProfileData = {
  name: string;
  email: string;
  image?: string;
};


const fieldClassName = "flex min-w-0 flex-col gap-[7px]";
const labelClassName = "text-xs font-semibold leading-[1.6]";
const inputClassName =
  "h-auto w-full min-w-0 rounded-[7px] border border-border bg-background px-[13px] py-[11px] text-[13px] leading-[1.6] text-foreground shadow-none placeholder:text-[#89948b] focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 md:text-[13px]";


  
export function ProfileForm({
  profile,
  readOnly = false,
  onSaved,
  showCancel = false,
  cancelAction,
  idPrefix = "profile",
  className,
}: {
  profile: ProfileData;
  readOnly?: boolean;
  showCancel?: boolean;
  cancelAction?: ReactNode;
  idPrefix?: string;
  className?: string;
  onSaved?: () => void;
}) {

const router = useRouter();

const handleSubmit = async (
  event: FormEvent<HTMLFormElement>
) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const name = String(formData.get("name") || "").trim();
  const image = String(formData.get("image") || "").trim();

  if (!name) {
    alert("Please enter your name");
    return;
  }

  try {
    const { error } = await authClient.updateUser({
      name,
      image: image || null,
    });

    if (error) {
      alert(error.message || "Could not update profile");
      return;
    }

    onSaved?.();
    router.replace("/profile");
    router.refresh();
  } catch {
    alert("Could not update profile. Please try again.");
  }
};
  
  return (
    <div>
      {profile && (
        <p className="mb-[18px] border-l-2 border-[#c6a54a] pl-[11px] text-[11px] leading-[1.6] text-(--home-muted)">
          Profile
        </p>
      )}
      <form onSubmit={handleSubmit}
           aria-label="Your profile" className={cn("flex max-w-[600px] flex-col gap-[18px] rounded-[14px] border border-border bg-card p-8 max-[600px]:p-[23px]", className)}>
        {profile.image ? (
          <Image
            src={profile.image}
            alt="Your profile"
            width={80}
            height={80}
            unoptimized
            className="size-20 rounded-full bg-(--home-sage) object-cover"
          />
        ) : (
          <div role="img" aria-label="Profile photo placeholder" className="grid size-20 place-items-center rounded-full bg-(--home-sage) text-primary">
            <UserRound size={34} strokeWidth={1.5} aria-hidden="true" />
          </div>
        )}

        <div className={fieldClassName}>
          <label htmlFor={`${idPrefix}-name`} className={labelClassName}>Your name</label>
          <Input
            id={`${idPrefix}-name`}
            name="name"
            required
            readOnly={readOnly}
            autoComplete="name"
            defaultValue={profile.name}
            placeholder="What should we call you?"
            className={inputClassName}
          />
        </div>

        <div className={fieldClassName}>
          <label htmlFor={`${idPrefix}-email`} className={labelClassName}>Email address</label>
          <Input
            id={`${idPrefix}-email`}
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={profile.email}
            readOnly={readOnly}
            aria-describedby={`${idPrefix}-email-hint`}
            className={inputClassName}
          />
          <small id={`${idPrefix}-email-hint`} className="text-[10px] leading-[1.6] text-(--home-muted)">
            Your account email stays the same.
          </small>
        </div>

        {!readOnly && 
        <div className={fieldClassName}>
          <label htmlFor={`${idPrefix}-image`} className={labelClassName}>Profile photo URL</label>
          <Input
            id={`${idPrefix}-image`}
            name="image"
            type="url"
            readOnly={readOnly}
            defaultValue={profile.image || ""}
            placeholder="https://example.com/your-photo.jpg"
            className={inputClassName}
          />
        </div>      
        }


        {!readOnly && 
        <div className="flex flex-wrap items-center gap-3.5">
          
          <Button type="submit" className="h-auto min-h-12 self-start rounded-[9px] px-[23px] py-3 text-sm font-semibold leading-[1.6] disabled:opacity-60">
            Save Profile
          </Button>
          {cancelAction ?? (showCancel && (
            <Link href="/profile" className={buttonVariants({ variant: "outline", className: "h-auto min-h-12 rounded-[9px] bg-transparent px-[23px] py-3 text-sm font-semibold leading-[1.6]" })}>
              Cancel
            </Link>
          ))}
        </div>       
        }
 
      </form>
    </div>
  );
}
