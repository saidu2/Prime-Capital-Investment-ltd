import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the Prime Capital team. Explore open positions at a leading SEC-regulated fund and portfolio management firm in Nigeria.",
  alternates: { canonical: "https://primecapital.ng/careers" },
  openGraph: {
    title: "Careers at Prime Capital – Join Our Team in Nigeria",
    description:
      "Explore career opportunities at Prime Capital & Investment Limited, a SEC-regulated investment firm based in Abuja, Nigeria.",
    url: "https://primecapital.ng/careers",
  },
};

import {
  CareersIntro,
  JoinBand,
  Testimonials,
} from "@/components/careers/careers-story";
import {
  OpenPositions,
  type PositionRow,
} from "@/components/careers/open-positions";
import { WhyJoin } from "@/components/careers/why-join";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { PageHero } from "@/components/page-hero";
import { OPEN_ROLES } from "@/data/careers";
import { getPublishedCareers } from "@/db/queries/careers";

const CAREERS_EMAIL = "careers@primecapital.com";

interface CareersPageProps {
  searchParams: Promise<{
    search?: string;
    jobType?: string;
    location?: string;
    page?: string;
  }>;
}

export default async function CareersPage(_props: CareersPageProps) {
  // Roles posted through the admin; the page still renders if the database
  // is unreachable.
  let posted: Awaited<ReturnType<typeof getPublishedCareers>> = [];
  try {
    posted = await getPublishedCareers({ limit: 30, offset: 0 });
  } catch (error) {
    console.error("Careers page: could not load positions", error);
  }

  const rows: PositionRow[] = [
    ...posted.map((c) => ({
      key: `db-${c.id}`,
      title: c.title,
      department: "Prime Capital",
      location: c.location,
      type: String(c.jobType).replace(/[-_]/g, " "),
      experience: "",
      href: `/careers/${c.slug}`,
    })),
    ...OPEN_ROLES.map((r) => ({
      ...r,
      key: `role-${r.title}`,
      href: `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(`Application: ${r.title}`)}`,
    })),
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <PageHero
        title="Join Our Team"
        crumb="Careers"
        image="/transparency.jpg"
        focus="50% 30%"
      />

      <CareersIntro />
      <Testimonials />
      <WhyJoin />
      <OpenPositions rows={rows} />

      <JoinBand email={CAREERS_EMAIL} />

      <Footer />
    </div>
  );
}
