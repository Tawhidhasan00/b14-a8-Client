'use client'

import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import Link from "next/link";
import { ArrowUpRight, Menu, Moon } from "lucide-react";
import { Brand } from "@/components/Brand";
import { Button, buttonVariants } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function Header() {

  const {data: session} = authClient.useSession();
  const user = session?.user;
  console.log(user)

const router = useRouter();

const handleLogout = async () => {
  try {
    const { error } = await authClient.signOut();

    if (error) {
      alert(error.message || "Could not log out");
      return;
    }

    router.replace("/");
    router.refresh();
  } catch {
    alert("Could not log out. Please try again.");
  }
};


  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <Brand />
        <nav className="desktop-navigation" aria-label="Main navigation">
          <Link href="/" aria-current="page">Home</Link>
          <Link href="/events">Upcoming Events</Link>
          <Link href="/manage-events">My Events</Link>
          <Link href="/#how-it-works">How it works</Link>
        </nav>
        <div className="header-actions">
          <Button type="button" variant="outline" size="icon" className="theme-button" aria-label="Dark theme (coming soon)" disabled>
            <Moon aria-hidden="true" />
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-10 rounded-full"
                    aria-label="Open account menu"
                  />
                }
              >
                <Avatar>
                  <AvatarImage
                    src={user.image || undefined}
                    alt={user.name}
                    referrerPolicy="no-referrer"
                  />
                  <AvatarFallback>
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="w-56"
              >
                <DropdownMenuGroup>
                  <DropdownMenuLabel>{user.name}</DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem render={<Link href="/create-event" />}>
                    Create Event
                  </DropdownMenuItem>

                  <DropdownMenuItem render={<Link href="/manage-events" />}>
                    Manage Events
                  </DropdownMenuItem>

                  <DropdownMenuItem render={<Link href="/joined-events" />}>
                    Joined Events
                  </DropdownMenuItem>

                  <DropdownMenuItem render={<Link href="/profile" />}>
                    My Profile
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  variant="destructive"
                  onClick={handleLogout}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/login"
              className={buttonVariants({ className: "login-button" })}
            >
              Login <ArrowUpRight aria-hidden="true" />
            </Link>
          )}

          <details className="mobile-navigation">
            <summary aria-label="Open navigation"><Menu aria-hidden="true" /></summary>
            <nav aria-label="Mobile navigation">
              <Link href="/" aria-current="page">Home</Link>
              <Link href="/events">Upcoming Events</Link>
              <Link href="/manage-events">My Events</Link>
              <Link href="/#how-it-works">How it works</Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
