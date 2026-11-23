import type { Metadata } from "next";
import { BoardGovernance } from "@/components/about/governance";
import { LeadershipPage } from "@/components/about/leadership-page";
import { BOARD } from "@/data/leadership";

export const metadata: Metadata = {
  title: "Board of Directors",
  description:
    "Strategic oversight and governance from seasoned industry leaders at Prime Capital & Investment Limited.",
  alternates: { canonical: "https://primecapital.ng/about/board" },
};

export default function BoardPage() {
  return (
    <LeadershipPage
      title="Board of Directors"
      crumb="Board of Directors"
      image="/board-room.jpg"
      focus="50% 55%"
      intro="Strategic oversight and governance from seasoned industry leaders."
      people={BOARD}
      other={{ href: "/about/management", label: "Management Team" }}
    >
      <BoardGovernance />
    </LeadershipPage>
  );
}
