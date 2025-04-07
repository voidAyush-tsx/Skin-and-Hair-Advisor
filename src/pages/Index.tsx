
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeatureSection from '@/components/FeatureSection';
import HowItWorks from '@/components/HowItWorks';
import AnalysisDemo from '@/components/AnalysisDemo';
import DoctorConnectSection from '@/components/DoctorConnectSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <FeatureSection />
        <HowItWorks />
        <AnalysisDemo />
        <DoctorConnectSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
