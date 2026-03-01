import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Prime Capital & Investment Limited — our mission, vision, corporate philosophy, and the experienced team driving long-term wealth creation in Nigeria.",
  alternates: { canonical: "https://primecapital.ng/about" },
  openGraph: {
    title: "About Prime Capital – Our Mission, Vision & Team",
    description:
      "Prime Capital is a SEC-regulated fund and portfolio management firm built on disciplined expertise, unwavering integrity, and a commitment to long-term wealth creation in Nigeria.",
    url: "https://primecapital.ng/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
