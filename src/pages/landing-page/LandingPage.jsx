import { Paper, Container } from "@mantine/core";

import HeadlineComponent from "./HeadlineComponent";
import AboutSection from "./AboutSection";
import FeaturesServicesSection from "./FeaturesServicesSection";
import GalleryTeamSection from "./GalleryTeamSection";
import FAQContactSection from "./FAQContactSection";

export default function LandingPage() {
  return (
    <Paper>
      <HeadlineComponent />
      <Container size="xl">
        <AboutSection />
        <FeaturesServicesSection />
        <GalleryTeamSection />
        <FAQContactSection />
      </Container>
    </Paper>
  );
}
