import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Prime Capital & Investment Limited. Visit our Abuja office at No. 3, Sankuru Close, Maitama, call +234 811 183 7348, or email info@primecapital.ng.",
  alternates: { canonical: "https://primecapital.ng/contact" },
  openGraph: {
    title: "Contact Prime Capital – Abuja, Nigeria",
    description:
      "Reach out to Prime Capital & Investment Limited to discuss your investment goals. We are SEC-regulated and based in Maitama, Abuja.",
    url: "https://primecapital.ng/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
