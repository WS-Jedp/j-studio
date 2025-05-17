import type { Metadata } from "next";
import localFont from "next/font/local";
import CustomCursor from "@/components/CustomCursor";
import "../globals.css";
import { loadMessages } from "@/i18n/utils";
import { NextIntlClientProvider } from "next-intl";

// Configure SF Pro font
const sfPro = localFont({
  src: [
    {
      path: "../../../public/assets/fonts/sf-pro/SF-Pro-Text-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/assets/fonts/sf-pro/SF-Pro-Text-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../../public/assets/fonts/sf-pro/SF-Pro-Text-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../public/assets/fonts/sf-pro/SF-Pro-Text-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/assets/fonts/sf-pro/SF-Pro-Text-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../public/assets/fonts/sf-pro/SF-Pro-Text-Ultralight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../../public/assets/fonts/sf-pro/SF-Pro-Text-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../../public/assets/fonts/sf-pro/SF-Pro-Text-Heavy.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../../public/assets/fonts/sf-pro/SF-Pro-Text-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap", // Use 'swap' to show text immediately with fallback until font loads
  preload: true,
  variable: "--font-sf-pro", // Optional: define a CSS variable
});


export const metadata: Metadata = {
  title: "J Studio | Full Stack Software Engineer ",
  description: "Full Stack Software Engineer from Colombia with international award-winning experience. Crafting seamless digital experiences through code, design, and innovative thinking. Building software solutions that inspire, connect, and transform lives.",
  keywords: ["software engineer", "full stack developer", "UI/UX design", "digital experiences", "Colombia", "Medellín", "front-end", "back-end"],
  creator: "Juan Esteban Deossa Pertuz",
  authors: [{ name: "Juan Esteban Deossa Pertuz", url: "https://github.com/WS-Jedp" }],
  openGraph: {
    title: "Juan Esteban Deossa | Software Engineer",
    description: "Full Stack Engineer crafting digital experiences from concept to scale",
    images: ['/assets/icons/j-icon@2x.png'],
    locale: 'en_US',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params?: { locale?: string };
}>) {
  const supportedLocales = ["en", "es"];
  const locale = params?.locale;
  const currentLocale =
    locale && supportedLocales.includes(locale) ? locale : "en";

  // Load messages if locale is available
  const messages = locale ? await loadMessages(currentLocale) : {};

  return (
    <html lang={currentLocale}>
      <body
        className={`${sfPro.variable} w-full font-sf-pro-roman bg-j-deep-black`}
      >
        <NextIntlClientProvider locale={currentLocale} messages={messages}>
          <CustomCursor />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
