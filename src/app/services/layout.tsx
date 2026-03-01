import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "Investment Products & Services",
  description:
    "Explore Prime Capital's investment products: money market instruments, fixed income securities, Shari'ah-compliant investments, alternative investments, and financial advisory services in Nigeria.",
  alternates: { canonical: "https://primecapital.ng/services" },
  openGraph: {
    title: "Investment Products & Financial Services – Prime Capital Nigeria",
    description:
      "From Treasury Bills and FGN Bonds to Islamic finance and alternative investments — Prime Capital offers professionally managed, SEC-regulated investment solutions.",
    url: "https://primecapital.ng/services",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
