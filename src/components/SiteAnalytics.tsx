"use client";

import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function SiteAnalytics() {
  const pathname = usePathname();
  useEffect(() => { window.dispatchEvent(new Event("juan:page")); }, [pathname]);
  if (pathname.startsWith("/admin")) return null;
  return <>
    <Analytics beforeSend={event => {
      const url = new URL(event.url);
      if (url.pathname.startsWith("/admin")) return null;
      url.search = "";
      url.hash = "";
      return { ...event, url: url.toString() };
    }} />
    <Script src="/site-metrics.js" strategy="afterInteractive" />
  </>;
}
