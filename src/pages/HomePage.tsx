import { PageContainer } from "@/components/AppShell";
import { AboutMamikosSection } from "@/components/home/AboutMamikosSection";
import { HomeHero } from "@/components/home/HomeHero";
import { PopularAreaSection } from "@/components/home/PopularAreaSection";
import { PopularCampusSection } from "@/components/home/PopularCampusSection";
import { RoomListSection } from "@/components/listing/RoomListSection";
import { selectSection } from "@/data/local-data";

export function HomePage() {
  return (
    <>
      <HomeHero />
      <PageContainer>
        <RoomListSection
          title="Promo Ngebut"
          rooms={selectSection("section-promo")}
        />
        <RoomListSection
          title="Rekomendasi kos"
          rooms={selectSection("section-featured")}
        />
        <RoomListSection
          title="Kos yang lagi promo di"
          rooms={selectSection("section-nearby")}
        />
        <PopularAreaSection />
        <PopularCampusSection />
      </PageContainer>
      <AboutMamikosSection />
    </>
  );
}
