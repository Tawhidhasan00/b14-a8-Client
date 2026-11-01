import Link from "next/link";
import { ArrowUpRight, Heart } from "lucide-react";
import { Brand } from "@/components/Brand";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-grid">
          <div className="footer-about">
            <Brand />
            <p>A little of your time can mean a lot to your neighborhood. Let&apos;s do some good, together.</p>
          </div>
          <div className="footer-links">
            <h2>Get involved</h2>
            <Link href="#upcoming-events">Find an event <ArrowUpRight aria-hidden="true" /></Link>
            <Link href="/create-event">Start an initiative <ArrowUpRight aria-hidden="true" /></Link>
            <Link href="/joined-events">My joined events <ArrowUpRight aria-hidden="true" /></Link>
          </div>
          <div className="footer-links">
            <h2>Your community</h2>
            <Link href="#how-it-works">How it works</Link>
            <Link href="#community-moments">Community moments</Link>
            <Link href="/profile">My profile</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>CommonKind · Small actions. Stronger communities.</p>
          <p>Made with <Heart aria-label="love" /> for our neighborhoods</p>
        </div>
      </div>
    </footer>
  );
}
