import Link from "next/link";
import { ArrowUpRight, Menu, Moon } from "lucide-react";
import { Brand } from "@/components/Brand";
import { Button, buttonVariants } from "@/components/ui/button";

export default function Header() {
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
          <Link href="/login" className={buttonVariants({ className: "login-button" })}>
            Login <ArrowUpRight aria-hidden="true" />
          </Link>
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
