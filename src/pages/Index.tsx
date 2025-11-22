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
    <div className="min-h-screen flex flex-col bg-background font-sans selection:bg-primary/20 animate-fade-in-up">
      <Header />
      <main className="flex-1 w-full">
        <Hero />
        <div className="space-y-24 pb-24">
          <div>
            <FeatureSection />
          </div>
          <div>
            <HowItWorks />
          </div>
          <div>
            <AnalysisDemo />
          </div>
          <div>
            <DoctorConnectSection />
          </div>
          <div>
            <CTASection />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
