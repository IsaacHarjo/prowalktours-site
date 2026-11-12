"use client";

import { useEffect } from "react";

// Phones only: slide the site header away while scrolling down and bring it
// back on any upward scroll. It stays visible near the top of the page, while
// the mobile menu is open and while keyboard focus is inside it. The state is
// a data attribute on <html>; the header and pinned bars react to it in CSS.
const phoneQuery = "(max-width: 767px)";
const threshold = 8;

export default function HeaderScrollBehavior() {
  useEffect(() => {
    const root = document.documentElement;
    const phone = window.matchMedia(phoneQuery);
    const header = document.querySelector("[data-site-header]");
    let lastY = window.scrollY;
    let frame = 0;
    const show = () => root.removeAttribute("data-header-hidden");
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - lastY;
      const menuOpen = !!document.getElementById("mobile-navigation");
      const focusInHeader = !!header && header.contains(document.activeElement);
      if (!phone.matches || menuOpen || focusInHeader || y < 80) {
        show();
        lastY = y;
        return;
      }
      if (Math.abs(delta) < threshold) return;
      if (delta > 0) root.setAttribute("data-header-hidden", "");
      else show();
      lastY = y;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    const onFocus = (event: FocusEvent) => { if (header && header.contains(event.target as Node)) show(); };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("focusin", onFocus);
    phone.addEventListener("change", show);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("focusin", onFocus);
      phone.removeEventListener("change", show);
      if (frame) cancelAnimationFrame(frame);
      show();
    };
  }, []);
  return null;
}
