import type { Metadata } from "next";
import { LeadershipPage } from "@/components/about/leadership-page";
import { MANAGEMENT } from "@/data/leadership";

export const metadata: Metadata = {
  title: "Management Team",
  description:
    "The professionals driving day-to-day excellence at Prime Capital & Investment Limited.",
  alternates: { canonical: "https://primecapital.ng/about/management" },
};

export default function ManagementPage() {
  return (
    <LeadershipPage
      title="Management Team"
      crumb="Management Team"
      image="/management-office.jpg"
      focus="50% 45%"
      intro="The professionals driving our day-to-day excellence."
      people={MANAGEMENT}
      other={{ href: "/about/board", label: "Board of Directors" }}
    />
  );
}
