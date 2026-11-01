import Link from "next/link";
import { Sprout } from "lucide-react";

export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="CommonKind home">
      <span className="brand-mark"><Sprout aria-hidden="true" /></span>
      <span>common<span className="brand-green">kind</span><span className="brand-period">.</span></span>
    </Link>
  );
}
