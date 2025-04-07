
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, Camera, User, Users } from 'lucide-react';

const Hero = () => {
  return (
    <section className="hero-section py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-2">
              <Sparkles className="mr-1 h-3 w-3" />
              <span>AI-Powered Beauty Analysis</span>
            </div>
            
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Personalized Hair & Skin Care With AI Technology
            </h1>
            
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Upload a photo and get instant AI analysis with personalized recommendations for your unique hair and skin needs.
            </p>
            
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link to="/get-started">Get Your Analysis</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link to="/connect-doctor">Connect with Experts</Link>
              </Button>
            </div>
          </div>
          
          <div className="mx-auto flex items-center justify-center lg:justify-end space-x-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="animate-float flex h-32 w-32 items-center justify-center rounded-lg bg-skin-light p-4 shadow-lg md:h-40 md:w-40">
                <Camera className="h-12 w-12 text-primary" />
              </div>
              <div className="mt-10 animate-float animation-delay-200 flex h-32 w-32 items-center justify-center rounded-lg bg-skin-medium p-4 shadow-lg md:h-40 md:w-40">
                <Sparkles className="h-12 w-12 text-primary" />
              </div>
              <div className="mt-6 animate-float animation-delay-500 flex h-32 w-32 items-center justify-center rounded-lg bg-hair-light p-4 shadow-lg md:h-40 md:w-40">
                <User className="h-12 w-12 text-primary" />
              </div>
              <div className="mt-16 animate-float animation-delay-700 flex h-32 w-32 items-center justify-center rounded-lg bg-hair-medium p-4 shadow-lg md:h-40 md:w-40">
                <Users className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
