import Image from "next/image";
import Link from "next/link";

const trainingDays = [
  { day: "Montag", time: "16.00 – 19.00 Uhr" },
  { day: "Dienstag", time: "18.00 – 21.00 Uhr" },
  { day: "Mittwoch", time: "16.00 – 19.00 Uhr" },
  { day: "Donnerstag", time: "18.00 – 21.00 Uhr" },
];

export default function Footer() {
  return (
    <footer id="kontakt" className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/jka-berlin_logo_white.png"
                alt="JKA Berlin"
                width={200}
                height={92}
                className="h-16 w-auto"
              />
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {"Honbu-Dojo „Leiden-kan“ – Shotokan-Karate der Japan Karate Association in Berlin."}
            </p>

            <a
              href="https://www.jka.or.jp/en/"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex flex-col gap-1 border-l-2 border-red-600 pl-4"
            >
              <span lang="ja" className="text-base tracking-[0.25em] text-white">
                {"日 本 空 手 協 会"}
              </span>
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-red-500 group-hover:text-red-400 transition-colors">
                {"Japan Karate Association →"}
              </span>
            </a>

            <div className="mt-6 flex gap-3">
              <a
                href="https://www.instagram.com/jkaberlin"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center border border-white/20 hover:border-red-600 hover:bg-red-600 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.3 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .3-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.3-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.3 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.1 0-3.5 0-4.7.1-1.1.1-1.7.2-2.1.4-.5.2-.9.4-1.3.8-.4.4-.6.8-.8 1.3-.2.4-.3 1-.4 2.1C2.6 9.9 2.6 10.3 2.6 12s0 2.1.1 3.3c.1 1.1.2 1.7.4 2.1.2.5.4.9.8 1.3.4.4.8.6 1.3.8.4.2 1 .3 2.1.4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.2 2.1-.4.5-.2.9-.4 1.3-.8.4-.4.6-.8.8-1.3.2-.4.3-1 .4-2.1.1-1.2.1-1.6.1-3.3s0-2.1-.1-3.3c-.1-1.1-.2-1.7-.4-2.1-.2-.5-.4-.9-.8-1.3-.4-.4-.8-.6-1.3-.8-.4-.2-1-.3-2.1-.4-1.2-.1-1.6-.1-4.7-.1zm0 3.1a4.9 4.9 0 110 9.8 4.9 4.9 0 010-9.8zm0 8.1a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4zm6.2-8.3a1.1 1.1 0 11-2.3 0 1.1 1.1 0 012.3 0z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/jkaberlin"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center border border-white/20 hover:border-red-600 hover:bg-red-600 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.5V12h2.7l-.4 2.9h-2.3v7A10 10 0 0022 12z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-red-500 mb-6">
              Trainingszeiten
            </h3>
            <ul className="space-y-3">
              {trainingDays.map((t) => (
                <li
                  key={t.day}
                  className="flex items-baseline justify-between gap-3 border-b border-white/10 pb-2"
                >
                  <span className="text-sm font-semibold text-white">
                    {t.day}
                  </span>
                  <span className="text-sm text-zinc-400 text-right">
                    {t.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-red-500 mb-6">
              Kontakt
            </h3>
            <address className="not-italic text-sm text-zinc-400 leading-relaxed space-y-4">
              <p>
                <span className="block text-white font-semibold">
                  {"Honbu-Dojo „Leiden-kan“"}
                </span>
                {"Neue Schönholzer Straße 32"}
                <br />
                13187 Berlin
              </p>
              <p className="space-y-1">
                <span className="block">
                  Tel.{" "}
                  <a href="tel:+493048638161" className="hover:text-red-500 transition-colors">
                    +49 (030) 48 63 81 61
                  </a>
                </span>
                <span className="block">Fax +49 (030) 48 63 81 62</span>
                <span className="block">
                  <a href="mailto:honbu@jka-berlin.de" className="hover:text-red-500 transition-colors">
                    honbu@jka-berlin.de
                  </a>
                </span>
              </p>
            </address>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500">
            {"©"} {new Date().getFullYear()} {"JKA Berlin · Honbu-Dojo „Leiden-kan“"}
          </p>
          <div className="flex gap-6 text-xs text-zinc-500">
            <Link href="/impressum" className="hover:text-white transition-colors">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-white transition-colors">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
