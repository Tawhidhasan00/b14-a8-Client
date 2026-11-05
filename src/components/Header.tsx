'use client'

import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

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
import { ArrowUpRight, Menu, Moon, Sun } from "lucide-react";
import { Brand } from "@/components/Brand";
import { Button, buttonVariants } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function Header() {
  const { resolvedTheme, setTheme } = useTheme();
  const toggleTheme = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

  const {data: session} = authClient.useSession();
  const user = session?.user;

const router = useRouter();

const handleLogout = async () => {
  try {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error(error.message || "Could not log out");
      return;
    }

    toast.success("Logged out successfully");
    router.replace("/");
    router.refresh();
  } catch {
    toast.error("Could not log out. Please try again.");
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
          <Button type="button" variant="outline" size="icon" className="theme-button" aria-label="Toggle color theme" onClick={toggleTheme}>
            <Moon className="dark:hidden" aria-hidden="true" />
            <Sun className="hidden dark:block" aria-hidden="true" />
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                openOnHover
                closeDelay={150}
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
              <Button type="button" variant="ghost" className="justify-start min-[431px]:hidden" onClick={toggleTheme}>
                <Moon className="dark:hidden" aria-hidden="true" />
                <Sun className="hidden dark:block" aria-hidden="true" />
                Change theme
              </Button>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
