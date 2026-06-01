"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type Slide = {
  src: string;
  title: string;
  subtitle: string;
  caption?: string;
};

const slides: Slide[] = [
  {
    src: "/ohta_slider_v2.jpg",
    title: "Karate-Dō auf höchstem Niveau",
    subtitle: "JKA BERLIN",
    caption: "Im Geist der Japan Karate Association.",
  },
  {
    src: "/imura_slider.jpg",
    title: "Trainieren mit den Meistern",
    subtitle: "LEHRGÄNGE",
    caption: "Internationale Senseis zu Gast im Honbu-Dojo.",
  },
  {
    src: "/shiina_slider.jpg",
    title: "Präzision in jeder Technik",
    subtitle: "HONBU-DOJO „LEIDEN-KAN”",
    caption: "Kihon, Kata und Kumite auf Meisterniveau.",
  },
  {
    src: "/slider_6.jpg",
    title: "Eine Vertretung der Japan Karate Association in Deutschland",
    subtitle: "JKA-BERLIN",
    caption: "Anerkannter Verband der Japan Karate Association.",
  },
  {
    src: "/slider_7.jpg",
    title: "Eine Gemeinschaft. Ein Stil.",
    subtitle: "SHOTOKAN",
    caption: "Karate-Tradition seit Generationen.",
  },
  {
    src: "/slider_8.jpg",
    title: "Stärke. Respekt. Charakter.",
    subtitle: "BERLIN",
    caption: "Karate, das über das Dojo hinaus prägt.",
  },
];

const INTERVAL_MS = 6000;

export default function Slider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((i: number) => {
    setIndex(((i % slides.length) + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section
      className="relative h-[100svh] min-h-[600px] w-full overflow-hidden bg-black"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.title}
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover ${i === index ? "scale-105" : "scale-100"} transition-transform duration-[8000ms] ease-out`}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>
      ))}

      <div className="relative z-20 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          {slides.map((slide, i) => (
            <div
              key={slide.src}
              className={`max-w-3xl transition-all duration-1000 ${
                i === index
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 translate-y-8 pointer-events-none absolute"
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="h-[2px] w-12 bg-red-600" />
                <span className="text-red-500 text-xs font-bold tracking-[0.4em] uppercase">
                  {slide.subtitle}
                </span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight">
                {slide.title}
              </h1>
              {slide.caption && (
                <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-xl">
                  {slide.caption}
                </p>
              )}
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="/ueber-uns"
                  className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-sm font-bold tracking-widest uppercase transition-colors"
                >
                  Über uns
                </a>
                <a
                  href="/termine"
                  className="inline-flex items-center justify-center border border-white/40 hover:border-white text-white px-8 py-4 text-sm font-bold tracking-widest uppercase transition-colors backdrop-blur-sm"
                >
                  Termine
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1} anzeigen`}
            className={`h-[3px] transition-all duration-500 ${
              i === index ? "w-12 bg-red-600" : "w-6 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      <button
        onClick={() => goTo(index - 1)}
        aria-label="Vorheriger Slide"
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-30 h-12 w-12 items-center justify-center border border-white/30 hover:border-red-600 hover:bg-red-600 text-white transition-all backdrop-blur-sm"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        onClick={() => goTo(index + 1)}
        aria-label="Nächster Slide"
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-30 h-12 w-12 items-center justify-center border border-white/30 hover:border-red-600 hover:bg-red-600 text-white transition-all backdrop-blur-sm"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      <div className="absolute bottom-10 right-10 z-30 hidden md:flex items-center text-white/60 text-xs font-mono tracking-widest">
        <span className="text-white text-base font-bold">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="mx-2">/</span>
        <span>{String(slides.length).padStart(2, "0")}</span>
      </div>
    </section>
  );
}
