"use client";

import { Button } from "@/components/ui/button";
import ErrorToast from "@/components/error-toast";

export default function PageError({ retry }: { error: unknown; retry: () => void }) {
  return (
    <section className="site-container min-h-[65vh] py-20 text-center">
      <ErrorToast message="Could not load this page. Please try again." id="page-load-error" />
      <h1 className="text-2xl font-semibold">Something went wrong.</h1>
      <p className="mb-6 mt-3 text-sm text-(--home-muted)">Please try loading the page again.</p>
      <Button type="button" onClick={retry}>Try again</Button>
    </section>
  );
}
