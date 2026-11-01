import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, CalendarHeart, HeartHandshake, MapPin, Sparkles, Sprout, Users } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import "./home.css";

const steps = [
  { number: "01", icon: MapPin, title: "Find your kind of good", description: "Discover cleanups, tree planting, and community drives happening close to you." },
  { number: "02", icon: CalendarHeart, title: "Make a little room", description: "An hour or an afternoon. Pick an initiative that fits your life, then join in." },
  { number: "03", icon: HeartHandshake, title: "Show up. Make a difference.", description: "Meet your neighbors, lend a hand, and keep track of the causes you support." },
];

const moments = [
  { image: "/images/community-volunteer.jpg", alt: "A volunteer in a pink shirt at a community event", caption: "Showing up for one another", title: "A morning well spent" },
  { image: "/images/community-garden.jpg", alt: "A green gardening trowel with soil, ready for planting", caption: "One small seed at a time", title: "A greener tomorrow" },
  { image: "/images/community-care.jpg", alt: "Volunteers working together to distribute boxes of food", caption: "Sharing a little, changing a lot", title: "Kindness in action" },
];

export default function Home() {
  return (
    <div className="home-page">
      <a className="skip-link" href="#main-content">Skip to content</a>
      
      <main id="main-content">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="site-container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow"><span className="status-dot" />Good things start close to home</p>
              <h1 id="hero-title">A little time.<br />A <span className="hero-highlight">real difference.<svg viewBox="0 0 540 22" preserveAspectRatio="none" aria-hidden="true"><path d="M5 17 Q270 -2 535 14" /></svg></span></h1>
              <p className="hero-description">Your neighborhood is full of ways to do good. Find a cause you care about, meet your people, and make a little change together.</p>
              <div className="hero-actions">
                <Link href="#upcoming-events" className={buttonVariants({ className: "primary-cta" })}>Find your next good thing <ArrowUpRight aria-hidden="true" /></Link>
                <Link href="/create-event" className="text-cta">Start an initiative <ArrowUpRight aria-hidden="true" /></Link>
              </div>
              <div className="hero-note"><span className="icon-disc"><HeartHandshake aria-hidden="true" /></span><p>You don&apos;t need to change the world.<br /><strong>Just start with your corner of it.</strong></p></div>
            </div>
            <div className="hero-visual">
              <div className="hero-photo"><Image src="/images/community-volunteer.jpg" alt="A volunteer helping at a local community event" fill sizes="(max-width: 800px) 90vw, 38vw" preload /></div>
              <div className="photo-badge"><span className="status-dot" />More hands. More good.</div>
              <Sparkles className="hero-sparkle" strokeWidth={1.4} aria-hidden="true" />
              <div className="hero-impact"><span className="icon-disc"><Sprout aria-hidden="true" /></span><div><strong>Big heart. Local impact.</strong><p>Good grows when we gather.</p></div></div>
              <p className="photo-caption"><MapPin aria-hidden="true" />Rooted in our neighborhoods</p>
            </div>
          </div>
        </section>

        <div className="causes-strip"><div className="site-container causes-inner"><p>Different causes. <strong>One community.</strong></p><span><Sprout aria-hidden="true" />A greener neighborhood</span><span><HeartHandshake aria-hidden="true" />A helping hand</span><span><Users aria-hidden="true" />A place for everyone</span></div></div>

        <section className="how-section section-space" id="how-it-works" aria-labelledby="how-title">
          <div className="site-container">
            <div className="section-heading"><div><p className="eyebrow">A little effort goes a long way</p><h2 id="how-title">Doing good starts with showing up.</h2></div><p className="section-description">No grand gestures needed. Just a cause, a little time, and people who care.</p></div>
            <div className="steps-grid">{steps.map(({ number, icon: Icon, title, description }) => <Card className="step-card" key={number}><CardContent className="step-content"><div className="step-top"><span className="step-icon"><Icon aria-hidden="true" /></span><span className="step-number" aria-hidden="true">{number}</span></div><h3>{title}</h3><p>{description}</p></CardContent></Card>)}</div>
          </div>
        </section>

        <section className="events-section section-space" id="upcoming-events" aria-labelledby="events-title">
          <div className="site-container">
            <div className="section-heading"><div><p className="eyebrow">Find your next good thing</p><h2 id="events-title">Around the corner. Coming up.</h2></div><Link href="/events" className="text-cta">Explore all events <ArrowUpRight aria-hidden="true" /></Link></div>
            {/* Static reference state; event fetching can be connected later. */}
            <div className="events-placeholder"><h3>We couldn&apos;t load the events.</h3><p>Something went wrong. Please try again.</p><Button type="button" variant="outline" className="retry-button" disabled title="Event loading will be connected later">Try again</Button></div>
          </div>
        </section>

        <section className="moments-section section-space" id="community-moments" aria-labelledby="moments-title">
          <div className="site-container">
            <div className="section-heading"><div><p className="eyebrow">Small moments. Lasting meaning.</p><h2 id="moments-title">This is what together looks like.</h2></div><p className="section-description">A little inspiration from people making time for something bigger than themselves.</p></div>
            <div className="moments-grid">{moments.map((moment) => <article className="moment-card" key={moment.title}><Image src={moment.image} alt={moment.alt} fill sizes="(max-width: 640px) 90vw, (max-width: 1000px) 44vw, 27vw" /><div className="moment-caption"><p>{moment.caption}</p><h3>{moment.title}</h3></div></article>)}</div>
          </div>
        </section>

        <section className="newsletter-section" aria-labelledby="newsletter-title">
          <div className="site-container">
            <div className="newsletter-panel">
              <div className="newsletter-copy"><p className="eyebrow"><Sprout aria-hidden="true" />A little good in your inbox</p><h2 id="newsletter-title">Stay close to what matters.</h2><p>Community stories, local initiatives, and a gentle nudge to get involved.</p></div>
              <div className="newsletter-form"><label className="sr-only" htmlFor="newsletter-email">Your email address</label><div className="newsletter-input-wrap"><Input id="newsletter-email" type="email" autoComplete="email" placeholder="Your email address" aria-describedby="newsletter-note" /><Button type="button" size="icon" className="newsletter-button" aria-label="Newsletter signup coming soon" disabled><ArrowUpRight aria-hidden="true" /></Button></div><p id="newsletter-note">Newsletter coming soon. A little inspiration is on its way.</p></div>
              <Sprout className="newsletter-decoration" strokeWidth={.8} aria-hidden="true" />
            </div>
            <p className="closing-note">It all starts with one small action. <Link href="#upcoming-events">Let&apos;s find yours <ArrowDown aria-hidden="true" /></Link></p>
          </div>
        </section>
      </main>
      
    </div>
  );
}
