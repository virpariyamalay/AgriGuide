import React from 'react';
import {
  HeroSection,
  StatsSection,
  HowToStartSection,
  PopularCropsSection,
  FeaturesSection,
  TestimonialsSection,
  MarketplacePreviewSection,
  WeatherWidgetSection,
  CTASection
} from '../components/home';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <HeroSection />
      <StatsSection />
      <HowToStartSection />
      <PopularCropsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <MarketplacePreviewSection />
      <WeatherWidgetSection />
      <CTASection />
    </div>
  );
};

export default HomePage;