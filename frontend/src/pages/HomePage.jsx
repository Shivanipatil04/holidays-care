import { useEffect, useState, lazy, Suspense } from "react";
import { Explore, Public } from "@mui/icons-material";
import { toursAPI, heroAPI } from "@/services/api";
import SnowEffect from "@/components/effects/SnowEffect";
import { Box } from "@mui/material";

const HeroSection = lazy(() => import("@/components/home/HeroSection"));
const TourSection = lazy(() => import("@/components/home/TourSection"));
const PopularSection = lazy(() => import("@/components/home/PopularSection"));
const ContactSection = lazy(() => import("@/components/home/ContactSection"));

export default function HomePage() {
  const [heroImages, setHeroImages] = useState([]);
  const [popularTours, setPopularTours] = useState([]);
  console.log("Popular", popularTours);
  const [domesticTours, setDomesticTours] = useState([]);
  const [internationalTours, setInternationalTours] = useState([]);

  useEffect(() => {
    heroAPI.getAll().then((res) => setHeroImages(res.data));

    toursAPI.getAll({ popular: true }).then((res) => setPopularTours(res.data));

    toursAPI
      .getAll({ category: "domestic" })
      .then((res) => setDomesticTours(res.data));

    toursAPI
      .getAll({ category: "international" })
      .then((res) => setInternationalTours(res.data));
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SnowEffect />

      <HeroSection heroImages={heroImages} />

      <PopularSection tours={popularTours} />

      <TourSection
        icon={<Explore />}
        label="Incredible India"
        title="Domestic Escapes"
        subtitle="From snowy peaks to serene backwaters."
        tours={domesticTours}
      />

      <TourSection
        bg="#fcf8f5"
        icon={<Public />}
        label="Global Wonders"
        title="International Wonders"
        subtitle="Curated global experiences."
        tours={internationalTours}
      />

      <ContactSection />
    </Suspense>
  );
}
