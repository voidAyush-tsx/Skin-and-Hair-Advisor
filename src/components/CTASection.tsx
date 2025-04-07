
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-primary/10 via-hair-medium/10 to-primary/10">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Start Your Beauty Journey Today
            </h2>
            
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join thousands of happy users who have transformed their hair and skin care routine with our AI-powered recommendations.
            </p>
            
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link to="/get-started">Get Started Now</Link>
              </Button>
            </div>
          </div>
          
          <div className="mx-auto flex items-center justify-center lg:justify-end">
            <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow-lg">
              <div className="col-span-2">
                <h3 className="font-bold text-xl mb-2">What Our Users Say</h3>
              </div>
              
              <div className="bg-secondary p-4 rounded-lg">
                <p className="text-sm italic">"The AI analysis was spot on! It identified my skin concerns and recommended products that actually worked."</p>
                <p className="text-sm font-medium mt-2">— Sarah T.</p>
              </div>
              
              <div className="bg-secondary p-4 rounded-lg">
                <p className="text-sm italic">"I was skeptical at first, but after following the recommended hair care routine, I've seen a huge improvement."</p>
                <p className="text-sm font-medium mt-2">— Michael R.</p>
              </div>
              
              <div className="bg-secondary p-4 rounded-lg">
                <p className="text-sm italic">"Being able to connect with a dermatologist after my analysis was a game-changer for my skin care journey."</p>
                <p className="text-sm font-medium mt-2">— Elena K.</p>
              </div>
              
              <div className="bg-secondary p-4 rounded-lg">
                <p className="text-sm italic">"The personalized recommendations helped me find products that work with my hair type for the first time."</p>
                <p className="text-sm font-medium mt-2">— James L.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
