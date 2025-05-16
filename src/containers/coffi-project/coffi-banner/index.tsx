import { Globe, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { CoffiSimpleButton } from "../coffi-buttons";
export function CoffiBanner({ scrollY }: { scrollY: number }) {
  const router = useRouter();
  
  return (
    <article
      className="relative w-full md:w-auto row-span-5 md:row-auto h-full text-j-deep-black p-9 rounded-3xl col-span-1 md:col-span-4 ease-linear transition-all duration-500 bg-gradient-to-br from-white to-white shadow-lg hover:shadow-xl hover:-translate-y-1 border border-white/10 backdrop-blur-sm overflow-hidden"
      style={{
        transform: `translateY(${scrollY * 0.05}px) scale(${
          1 + scrollY * 0.00003
        })`,
        opacity: `${1 - scrollY * 0.0005}`,
      }}
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Header */}
      <section className="flex flex-col sm:flex-row flex-nowrap items-start sm:items-center justify-between gap-4 sm:gap-0 mb-6">
        <article className="flex flex-row flex-nowrap items-center justify-start">
          <Image
            src="/assets/images/coffi/coffi-logo.png"
            alt="Coffi Logo"
            width={51}
            height={51}
            className="object-cover"
            priority
          />
          <div className="flex flex-col items-start justify-center ml-2">
            <h2 className="font-black text-3xl">Coffi</h2>
            <h3 className="font-extralight text-sm mt-[-2px]">
              Be Where You Thrive
            </h3>
          </div>
        </article>

        <article className="flex flex-row flex-wrap items-center justify-start sm:justify-end gap-2">
          {/* Browser Icon */}
          <Link
            href="https://coffi.com.co"
            target="_blank"
            rel="noopener"
            className="flex flex-row flex-nowrap items-center justify-center gap-2 bg-j-celestial-white/0 hover:bg-j-celestial-white/90 rounded-full px-3 py-2 text-sm font-medium text-coffi-purple transition-all duration-300 ease-in-out"
          >
            <Globe className="h-5 w-5" />
            Website
          </Link>

          {/* Instagram Icon */}
          <Link
            href="https://instagram.com/letscoffi"
            target="_blank"
            rel="noopener"
            className="flex flex-row flex-nowrap items-center justify-center gap-2 bg-j-celestial-white/0 hover:bg-j-celestial-white/90 rounded-full px-3 py-2 text-sm font-medium text-coffi-purple transition-all duration-300 ease-in-out"
          >
            <Instagram className="h-5 w-5" />
            Instagram
          </Link>
        </article>
      </section>

      <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-start relative z-10">
        Where the Idea{" "}
        <span className="text-coffi-purple font-extrabold">Became</span> the
        Product
      </h2>
      <p className="text-md md:text-lg md:max-w-3/5 font-extralight mt-6 leading-relaxed opacity-90 text-start relative z-10">
        I built Coffi because I needed it. As a remote creator moving from place
        to place, I craved more than coffee and Wi-Fi — I wanted spaces where I
        could truly focus, connect, and create. Coffi became my response to that
        search — not just an app, but a reflection of how I believe modern work
        should feel: intentional, flexible, and human.
      </p>
      <div className="relative w-full md:w-3/5 mt-6 z-10">
        <CoffiSimpleButton
            text="Learn More About The Thinking Behind Coffi"
            action={() => router.push("/coffi-project")}
            full
        />
      </div>

      {/* Absolute Images */}
      <article
        className="absolute right-[-30px] bottom-[-120px] shadow-2xl shadow-coffi-purple/40
                            rounded-2xl border-2 p-2 border-coffi-purple/80 overflow-hidden w-[150px] sm:w-[180px] md:w-[210px] h-[320px] sm:h-[380px] md:h-[440px]
                            animate-float-left bg-coffi-white/70 backdrop-blur-md z-[1] rotate-6 hidden sm:block"
      >
        <Image
          src="/assets/images/coffi/mobile-place-detail-en.jpeg"
          alt="Coffi Place Detail In Mobile View"
          width={330}
          height={440}
          className="object-cover rounded-2xl"
        />
      </article>
      <article
        className="absolute right-[10px] sm:right-30 bottom-[-100px] sm:bottom-[-150px] shadow-2xl shadow-coffi-purple/40
                            rounded-2xl border-2 p-2 border-coffi-purple/80 overflow-hidden w-[150px] sm:w-[180px] md:w-[210px] h-[320px] sm:h-[380px] md:h-[440px]
                            animate-float-left bg-coffi-white/70 backdrop-blur-md z-[1] rotate-[-9deg] hidden sm:block"
      >
        <Image
          src="/assets/images/coffi/mobile-home-en.jpeg"
          alt="Coffi Home In Mobile View"
          width={330}
          height={440}
          className="object-cover rounded-2xl"
        />
      </article>
    </article>
  );
}
