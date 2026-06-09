import Image from "next/image";

export default function PageHero({
  title,
  subtitle,
  eyebrow,
  image = "/background.png",
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  image?: string;
}) {
  return (
    <section className="relative flex h-[55vh] min-h-[360px] items-end overflow-hidden bg-black pt-20">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10 pb-14">
        {eyebrow && (
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[2px] w-12 bg-red-600" />
            <span className="text-red-500 text-xs font-bold tracking-[0.4em] uppercase">
              {eyebrow}
            </span>
          </div>
        )}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg text-white/80">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
