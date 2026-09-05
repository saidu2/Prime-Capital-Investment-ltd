import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from "next";
import type React from "react";
import "./globals.css";
import { Outfit, Playfair_Display } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import { SmoothScroll } from "@/components/smooth-scroll";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://primecapital.ng"),
  title: {
    default: "Prime Capital – Trusted Fund & Portfolio Management in Nigeria",
    template: "%s | Prime Capital",
  },
  description:
    "Prime Capital & Investment Limited is a SEC-regulated fund and portfolio management firm in Nigeria. We offer money market instruments, fixed income, ethical investments, alternative assets, and financial advisory services.",
  keywords: [
    "fund management Nigeria",
    "portfolio management Nigeria",
    "investment advisory Nigeria",
    "asset management Abuja",
    "SEC regulated investment firm",
    "wealth management Nigeria",
    "money market instruments Nigeria",
    "fixed income securities Nigeria",
    "Islamic investment Nigeria",
    "Shari'ah compliant investment",
    "Prime Capital Nigeria",
    "Nigerian capital market",
    "Prime Capital Market",
    "Capital Market",
    "Prime Capital",
  ],
  authors: [{ name: "Prime Capital & Investment Limited" }],
  creator: "Prime Capital & Investment Limited",
  publisher: "Prime Capital & Investment Limited",
  icons: {
    icon: [
      {
        url: "/web-app-manifest-192x192.png",
        media: "(prefers-color-scheme: light)",
      },
    ],
  },
  openGraph: {
    title: "Prime Capital – Trusted Fund & Portfolio Management in Nigeria",
    description:
      "Prime Capital & Investment Limited is a SEC-regulated fund and portfolio management firm in Nigeria. We build wealth and preserve trust.",
    url: "https://primecapital.ng",
    siteName: "Prime Capital",
    type: "website",
    locale: "en_NG",
    images: [
      {
        url: "/web-app-manifest-512x512.png",
        width: 512,
        height: 512,
        alt: "Prime Capital & Investment Limited",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prime Capital – Trusted Fund & Portfolio Management in Nigeria",
    description:
      "Prime Capital & Investment Limited is a SEC-regulated fund and portfolio management firm in Nigeria.",
    images: ["/web-app-manifest-512x512.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: { canonical: "https://primecapital.ng" },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: "Prime Capital & Investment Limited",
  alternateName: "Prime Capital",
  url: "https://primecapital.ng",
  logo: "https://primecapital.ng/web-app-manifest-512x512.png",
  description:
    "A SEC-regulated fund and portfolio management firm in Nigeria offering investment advisory, money market instruments, fixed income securities, and alternative investments.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "No. 3, Sankuru Close, Off Rima Street, Maitama",
    addressLocality: "Abuja",
    addressCountry: "NG",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+234-811-183-7348",
    contactType: "customer service",
    email: "info@primecapital.ng",
  },
  sameAs: [],
  areaServed: "NG",
  currenciesAccepted: "NGN",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${outfit.variable}`}
      suppressHydrationWarning
    >
      <body className={`antialiased font-body`}>
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: structured data
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <NextTopLoader showSpinner={false} />
        <SmoothScroll>{children}</SmoothScroll>
        <Toaster richColors position="top-right" />
         <Analytics />
      </body>
    </html>
  );
}
