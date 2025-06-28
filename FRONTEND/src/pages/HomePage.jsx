import React from 'react';
import HeroSection from '../components/home/HeroSection';
import StatsSection from '../components/home/StatsSection';
import HowToStartSection from '../components/home/HowToStartSection';
import PopularCropsSection from '../components/home/PopularCropsSection';
import FeaturesSection from '../components/home/FeaturesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import MarketplacePreviewSection from '../components/home/MarketplacePreviewSection';
import WeatherWidgetSection from '../components/home/WeatherWidgetSection';
import CTASection from '../components/home/CTASection';

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