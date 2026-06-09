import Image from "next/image";

export default function ShobuBanner() {
  return (
    <section className="bg-white py-10 lg:py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <a
          href="https://shobu-germany.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block overflow-hidden rounded-xl"
          aria-label="Shobu Germany – zur Website"
        >
          <Image
            src="/shobu_banner.jpg"
            alt="Shobu Germany"
            width={1400}
            height={500}
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.02]"
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 bg-white text-zinc-900 text-sm font-bold px-5 py-2.5 rounded-full shadow-lg">
              Shobu Germany besuchen →
            </span>
          </div>
        </a>
      </div>
    </section>
  );
}
