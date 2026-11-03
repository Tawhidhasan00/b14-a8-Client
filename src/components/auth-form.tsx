'use client'

import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const fieldClassName = "flex min-w-0 flex-col gap-[7px]";
const labelClassName = "text-xs font-semibold leading-[1.6]";
const inputClassName =
  "h-auto w-full min-w-0 rounded-[7px] border border-border bg-background px-[13px] py-[11px] text-[13px] leading-[1.6] text-foreground shadow-none placeholder:text-[#89948b] focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 md:text-[13px]";
const buttonClassName =
  "h-auto min-h-12 w-full gap-3 rounded-[9px] border border-transparent px-[23px] py-3 text-sm font-semibold leading-[1.6] disabled:opacity-100";

export function AuthForm({ register = false }: { register?: boolean }) {

const router = useRouter();

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  try {
    const result = register
      ? await authClient.signUp.email({
          name: String(formData.get("name") || "").trim(),
          email,
          password,
          image:
            String(formData.get("image") || "").trim() ||
            undefined,
        })
      : await authClient.signIn.email({
          email,
          password,
        });

    if (result.error) {
      alert(result.error.message || "Authentication failed");
      return;
    }

    router.replace("/");
    router.refresh();
  } catch (error) {
    alert(
      error instanceof Error
        ? error.message
        : "Could not connect. Please try again."
    );
  }
};

  return (
    <section className="site-container pb-20 pt-[55px] max-[600px]:pb-[50px] max-[600px]:pt-[30px]">
      <div className="mx-auto grid max-w-250 grid-cols-2 overflow-hidden rounded-[19px] border border-border bg-card max-[600px]:grid-cols-1">
        <aside className="flex flex-col justify-center bg-[#254b36] px-10 py-[50px] text-[#faf8f3] max-[860px]:px-[25px] max-[860px]:py-[35px] max-[600px]:px-8 max-[600px]:py-[27px]">
          <Sprout size={35} strokeWidth={1.4} aria-hidden="true" />
          <h2 className="mb-5 mt-6.5 text-[39px] font-medium leading-[1.2] tracking-[-1.5px] max-[600px]:mt-3.75 max-[600px]:text-[28px]">
            Good things happen
            <br />
            when we gather.
          </h2>
          <p className="text-[13px] leading-[1.9] text-[#d2dfd2]">
            A cleaner street. A warmer winter. A new connection. Be part of the small
            things that make a neighborhood feel like home.
          </p>
          <Image
            src="/images/community-care.jpg"
            alt="People giving their time to a community cause"
            width={650}
            height={455}
            className="mt-[30px] aspect-[4/2.8] h-auto w-full rounded-[70px_12px_70px_12px] object-cover max-[600px]:hidden"
          />
        </aside>

        <div className="min-w-0 p-10 max-[860px]:px-[25px] max-[860px]:py-8 max-[600px]:p-[27px]">
          <h1 className="text-[28px] font-semibold leading-[1.6] tracking-[-0.9px]">
            {register ? "A little good starts here." : "Good to see you again."}
          </h1>
          <p className="mb-[25px] mt-[7px] text-xs leading-[1.6] text-(--home-muted)">
            {register
              ? "Create your account and find your people."
              : "Log in to pick up where you left off."}
          </p>

          <form onSubmit={handleSubmit}
                className="flex flex-col gap-4.5" aria-label={register ? "Create an account" : "Login"}>
            {register && (
              <div className={fieldClassName}>
                <label htmlFor="auth-name" className={labelClassName}>Your name</label>
                <Input
                  id="auth-name"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="What should we call you?"
                  className={inputClassName}
                />
              </div>
            )}

            <div className={fieldClassName}>
              <label htmlFor="auth-email" className={labelClassName}>Email address</label>
              <Input
                id="auth-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className={inputClassName}
              />
            </div>

            {register && (
              <div className={fieldClassName}>
                <label htmlFor="auth-image" className={labelClassName}>Profile photo URL</label>
                <Input
                  id="auth-image"
                  name="image"
                  type="url"
                  placeholder="https://example.com/your-photo.jpg"
                  className={inputClassName}
                />
              </div>
            )}

            <div className={fieldClassName}>
              <label htmlFor="auth-password" className={labelClassName}>Password</label>
              <Input
                id="auth-password"
                name="password"
                type="password"
                required
                minLength={register ? 8 : undefined}
                autoComplete={register ? "new-password" : "current-password"}
                placeholder={register ? "Choose a password" : "Your password"}
                aria-describedby={register ? "auth-password-hint" : undefined}
                className={inputClassName}
              />
              {register && (
                <small id="auth-password-hint" className="text-[10px] leading-[1.6] text-(--home-muted)">
                  At least 8 characters, with uppercase and lowercase letters.
                </small>
              )}
            </div>

            <Button type="submit" className={buttonClassName}>
              {register ? "Create account" : "Login"}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Button>
          </form>

          <div className="my-[21px] flex items-center gap-3 text-[10px] leading-[1.6] text-(--home-muted) before:h-px before:flex-1 before:bg-border before:content-[''] after:h-px after:flex-1 after:bg-border after:content-['']">
            or keep it simple
          </div>
          <Button type="button" variant="outline" disabled className={`${buttonClassName} border-border bg-transparent text-foreground`}>
            <span className="text-[19px] font-bold leading-none" aria-hidden="true">G</span>
            Continue with Google
          </Button>
          <p className="mt-6 text-center text-xs leading-[1.6] text-(--home-muted)">
            {register ? "Already part of the community?" : "New around here?"}{" "}
            <Link href={register ? "/login" : "/register"} className="font-semibold text-primary hover:underline">
              {register ? "Login" : "Create an account"}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
