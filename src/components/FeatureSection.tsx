
import React from 'react';
import { Camera, Sparkles, User, Heart, MessageCircle, Shield } from 'lucide-react';

const features = [
  {
    icon: <Camera className="h-8 w-8 text-primary" />,
    title: 'Easy Photo Analysis',
    description: 'Upload a photo of your hair or skin and get instant AI analysis in seconds'
  },
  {
    icon: <Sparkles className="h-8 w-8 text-primary" />,
    title: 'Smart Recommendations',
    description: 'Receive personalized product and routine recommendations based on your unique needs'
  },
  {
    icon: <User className="h-8 w-8 text-primary" />,
    title: 'Expert Connections',
    description: 'Connect with certified dermatologists and hair specialists for professional advice'
  },
  {
    icon: <Heart className="h-8 w-8 text-primary" />,
    title: 'Track Your Progress',
    description: 'Monitor your hair and skin health improvements over time with detailed analytics'
  },
  {
    icon: <MessageCircle className="h-8 w-8 text-primary" />,
    title: 'Community Support',
    description: 'Join our community to share experiences and tips with others on similar journeys'
  },
  {
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: 'Privacy Protected',
    description: 'Your data and images are securely stored and never shared without your permission'
  }
];

const FeatureSection = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How We Help You</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our AI-powered platform provides personalized beauty care like never before
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card group hover:border-primary/20 hover:bg-gradient-to-b hover:from-white hover:to-secondary/30"
            >
              <div className="mb-4 glow-effect">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
