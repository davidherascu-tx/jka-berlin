"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const menu = [
  {
    label: "ÜBER JKA-BERLIN",
    children: [
      { label: "Über uns", href: "/ueber-uns" },
      { label: "Trainerteam", href: "/trainerteam" },
    ],
  },
  { label: "Termine", href: "/termine" },
  { label: "News", href: "/news" },
  { label: "Downloads", href: "/downloads" },
  { label: "Shop", href: "/shop" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white shadow-md"
          : "bg-gradient-to-b from-black/70 to-transparent"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10 transition-all duration-500 ${
          scrolled ? "h-16" : "h-22"
        }`}
      >
        <Link href="/" className="group" aria-label="JKA Berlin - Startseite">
          <span className="relative inline-flex items-center justify-center">
            {/* Colored logo on white chip - at top */}
            <span
              className={`inline-flex items-center justify-center bg-white rounded-lg px-4 py-2.5 shadow-md transition-all duration-500 group-hover:scale-105 ${
                scrolled
                  ? "opacity-0 scale-90 pointer-events-none absolute"
                  : "opacity-100 scale-100"
              }`}
            >
              <Image
                src="/jka-berlin-logo.png"
                alt="JKA Berlin"
                width={200}
                height={92}
                className="h-14 w-auto"
                priority
              />
            </span>
            {/* Colored logo direct - when scrolled on white bg */}
            <span
              className={`inline-flex items-center justify-center transition-all duration-500 group-hover:scale-105 ${
                scrolled
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-110 pointer-events-none absolute"
              }`}
            >
              <Image
                src="/jka-berlin-logo.png"
                alt="JKA Berlin"
                width={200}
                height={92}
                className="h-10 w-auto"
                priority
              />
            </span>
          </span>
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {menu.map((item) =>
            "children" in item && item.children ? (
              <li key={item.label} className="relative group">
                <button
                  className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold tracking-wider uppercase cursor-default transition-colors duration-300 ${
                    scrolled ? "text-zinc-800" : "text-white"
                  }`}
                  aria-haspopup="true"
                >
                  {item.label}
                  <svg
                    className="h-3 w-3 transition-transform duration-300 group-hover:rotate-180"
                    viewBox="0 0 12 12"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M6 8.5 1.5 4h9z" />
                  </svg>
                </button>
                <div className="absolute left-1/2 top-full -translate-x-1/2 pt-2 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 ease-out">
                  <div className="min-w-[200px] rounded-md bg-white shadow-xl border border-zinc-200 overflow-hidden">
                    {item.children.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="block px-5 py-3 text-sm text-zinc-700 hover:bg-red-600 hover:text-white transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </li>
            ) : (
              <li key={item.label}>
                <Link
                  href={item.href!}
                  className={`relative px-4 py-2 text-sm font-semibold tracking-wider uppercase group/link transition-colors duration-300 ${
                    scrolled ? "text-zinc-800" : "text-white"
                  }`}
                >
                  {item.label}
                  <span className="absolute left-4 right-4 bottom-0.5 h-[2px] bg-red-600 scale-x-0 group-hover/link:scale-x-100 origin-left transition-transform duration-300" />
                </Link>
              </li>
            )
          )}
        </ul>

        <button
          aria-label={mobileOpen ? "Menu schliessen" : "Menu oeffnen"}
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span
            className={`block h-0.5 w-7 transition-all duration-300 origin-center ${
              scrolled ? "bg-zinc-800" : "bg-white"
            } ${mobileOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 transition-all duration-300 ${
              scrolled ? "bg-zinc-800" : "bg-white"
            } ${mobileOpen ? "w-0 opacity-0" : "w-7 opacity-100"}`}
          />
          <span
            className={`block h-0.5 w-7 transition-all duration-300 origin-center ${
              scrolled ? "bg-zinc-800" : "bg-white"
            } ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </nav>

      <div
        className={`lg:hidden overflow-hidden transition-[max-height] duration-500 ${
          scrolled ? "bg-white" : "bg-black/95 backdrop-blur-md"
        } ${mobileOpen ? "max-h-[600px]" : "max-h-0"}`}
      >
        <ul className="flex flex-col px-6 py-4">
          <li className={`border-b ${scrolled ? "border-zinc-200" : "border-white/10"}`}>
            <button
              onClick={() => setMobileSubOpen((v) => !v)}
              className={`flex w-full items-center justify-between py-4 text-sm font-semibold tracking-wider uppercase ${
                scrolled ? "text-zinc-800" : "text-white"
              }`}
            >
              {"ÜBER JKA-BERLIN"}
              <svg
                className={`h-3 w-3 transition-transform duration-300 ${
                  mobileSubOpen ? "rotate-180" : ""
                }`}
                viewBox="0 0 12 12"
                fill="currentColor"
              >
                <path d="M6 8.5 1.5 4h9z" />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-[max-height] duration-300 ${
                mobileSubOpen ? "max-h-40" : "max-h-0"
              }`}
            >
              <Link
                href="/ueber-uns"
                onClick={() => setMobileOpen(false)}
                className={`block py-3 pl-4 text-sm hover:text-red-500 transition-colors ${
                  scrolled ? "text-zinc-600" : "text-white/80"
                }`}
              >
                {"Über uns"}
              </Link>
              <Link
                href="/trainerteam"
                onClick={() => setMobileOpen(false)}
                className={`block py-3 pl-4 text-sm hover:text-red-500 transition-colors ${
                  scrolled ? "text-zinc-600" : "text-white/80"
                }`}
              >
                Trainerteam
              </Link>
            </div>
          </li>
          {menu
            .filter((m) => !("children" in m && m.children))
            .map((item) => (
              <li key={item.label} className={`border-b ${scrolled ? "border-zinc-200" : "border-white/10"}`}>
                <Link
                  href={item.href!}
                  onClick={() => setMobileOpen(false)}
                  className={`block py-4 text-sm font-semibold tracking-wider uppercase hover:text-red-500 transition-colors ${
                    scrolled ? "text-zinc-800" : "text-white"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </header>
  );
}
