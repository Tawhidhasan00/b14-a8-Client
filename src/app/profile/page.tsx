import { ProfileForm } from "@/components/profile-form";
import { ProfileUpdateDialog } from "@/components/profile-update-dialog";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function ProfilePage() {

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
      <div className="mb-[34px] flex flex-wrap items-center justify-between gap-5">
        <div className="max-w-[680px]">
          <p className="mb-3 text-[10px] font-bold uppercase leading-[1.6] tracking-[1.7px] text-primary max-[600px]:text-[8px] max-[600px]:tracking-[1.2px]">
            A familiar face
          </p>
          <h1 className="text-[clamp(30px,4vw,43px)] font-semibold leading-[1.2] tracking-[-1.5px]">
            Your place in the community.
          </h1>
          <p className="mt-[14px] text-sm leading-[1.8] text-(--home-muted)">
            Keep your name and profile photo up to date.
          </p>
        </div>
        <ProfileUpdateDialog profile={profile} />
      </div>
      <ProfileForm profile={profile} readOnly />
    </section>
  );
}
