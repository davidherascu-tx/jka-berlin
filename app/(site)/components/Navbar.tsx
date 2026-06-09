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
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-white shadow-md"
          : "bg-gradient-to-b from-black/70 to-transparent"
      }`}
    >
      <nav className={`mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10 transition-all duration-500 h-20 ${scrolled ? "lg:h-20" : "lg:h-28"}`}>
        <Link href="/" className="group" aria-label="JKA Berlin - Startseite">
          <span
            className={`inline-flex items-center justify-center transition-all duration-500 group-hover:scale-105 ${
              scrolled ? "" : "bg-white rounded-lg px-3 py-2 lg:px-4 lg:py-2.5 shadow-md"
            }`}
          >
            <Image
              src="/jka-berlin-logo.png"
              alt="JKA Berlin"
              width={200}
              height={92}
              className={`h-12 w-auto transition-all duration-500 ${scrolled ? "lg:h-14" : "lg:h-24"}`}
              priority
            />
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-4">
          <ul className="flex items-center gap-1">
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
          <Link
            href="/mitglied-werden"
            className="ml-2 inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold tracking-wider uppercase px-5 py-2.5 rounded-md shadow-md shadow-red-600/20 transition-colors duration-300"
          >
            Jetzt Mitglied werden
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

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
        <div className="px-6 pb-4 pt-2">
          <Link
            href="/mitglied-werden"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold tracking-wider uppercase px-5 py-3 rounded-md shadow-md shadow-red-600/20 transition-colors"
          >
            Jetzt Mitglied werden
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className={`flex flex-col gap-3 px-6 pb-5 pt-2 border-t ${scrolled ? "border-zinc-200" : "border-white/10"}`}>
          <a
            href="tel:+493048638161"
            className={`flex items-center gap-3 text-sm transition-colors hover:text-red-500 ${
              scrolled ? "text-zinc-600" : "text-white/80"
            }`}
          >
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            +49 (030) 48 63 81 61
          </a>
          <a
            href="mailto:honbu@jka-berlin.de"
            className={`flex items-center gap-3 text-sm transition-colors hover:text-red-500 ${
              scrolled ? "text-zinc-600" : "text-white/80"
            }`}
          >
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            honbu@jka-berlin.de
          </a>
        </div>
      </div>
    </header>
  );
}
