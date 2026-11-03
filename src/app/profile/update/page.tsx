import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProfileForm } from "@/components/profile-form";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function UpdateProfilePage() {

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");
  const profile = {
    name: session.user.name,
    email: session.user.email,
    image: session.user.image || "",
  };

  return (
    <section className="site-container min-h-[65vh] pb-[85px] pt-[55px] text-foreground max-[600px]:pb-[60px] max-[600px]:pt-[35px]">
      <Link href="/profile" className="mb-[27px] inline-flex items-center gap-[7px] text-xs leading-[1.6] text-(--home-muted)">
        <ArrowLeft size={15} aria-hidden="true" />
        Back to profile
      </Link>
      <div className="mb-[34px] max-w-[680px]">
        <p className="mb-3 text-[10px] font-bold uppercase leading-[1.6] tracking-[1.7px] text-primary max-[600px]:text-[8px] max-[600px]:tracking-[1.2px]">
          A familiar face
        </p>
        <h1 className="text-[clamp(30px,4vw,43px)] font-semibold leading-[1.2] tracking-[-1.5px]">
          Update your profile.
        </h1>
        <p className="mt-[14px] text-sm leading-[1.8] text-(--home-muted)">
          Update your name and profile photo. Your account email stays the same.
        </p>
      </div>
      <ProfileForm profile={profile} showCancel />
    </section>
  );
}
