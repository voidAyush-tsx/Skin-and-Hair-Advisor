
import React from 'react';
import { Camera, Sparkles, User } from 'lucide-react';

const steps = [
  {
    icon: <Camera className="h-10 w-10 text-white" />,
    title: 'Upload Your Photo',
    description: 'Take a clear photo of your hair or skin and upload it to our secure platform',
    bgColor: 'bg-primary',
  },
  {
    icon: <Sparkles className="h-10 w-10 text-white" />,
    title: 'AI Analysis',
    description: 'Our advanced AI analyzes your unique characteristics and identifies key concerns',
    bgColor: 'bg-hair-medium',
  },
  {
    icon: <User className="h-10 w-10 text-white" />,
    title: 'Get Personalized Plan',
    description: 'Receive a tailored care plan with product recommendations and routine suggestions',
    bgColor: 'bg-primary',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Three simple steps to your personalized beauty care routine
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative flex flex-col items-center text-center space-y-4"
            >
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] border-t-2 border-dashed border-muted" />
              )}
              
              <div className={`${step.bgColor} rounded-full p-6 glow-effect`}>
                {step.icon}
              </div>
              
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
