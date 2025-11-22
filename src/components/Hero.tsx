import React from 'react';
import { motion } from 'framer-motion';
import { SmoothLink } from '@/components/SmoothLink';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck, Activity, Users, Star } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white pt-16 md:pt-24 lg:pt-32 pb-16 md:pb-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background-image:radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/0 via-white/50 to-white"></div>

      <div className="container-width px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
              className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50/50 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm"
            >
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              HIPAA Compliant AI Analysis
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
                className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:leading-[1.1]"
              >
                Advanced Dermatological <br className="hidden lg:block" />
                <span className="text-primary">AI Diagnostics</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
                className="text-xl text-slate-600 max-w-[600px] leading-relaxed font-light"
              >
                Professional-grade skin and hair analysis powered by artificial intelligence.
                Get instant insights and connect with certified specialists for personalized care plans.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <Button size="lg" className="h-14 px-8 text-base font-semibold shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5" asChild>
                <SmoothLink to="/get-started" delay={600}>
                  Start Free Analysis <ArrowRight className="ml-2 h-5 w-5" />
                </SmoothLink>
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-8 text-base bg-white/80 backdrop-blur-sm border-slate-200 transition-all duration-300 hover:bg-slate-50 hover:-translate-y-0.5" asChild>
                <SmoothLink to="/connect-doctor" delay={600}>Find a Specialist</SmoothLink>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
              className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-100"
            >
              {[
                { value: '98%', label: 'Accuracy Rate', icon: ShieldCheck },
                { value: '10k+', label: 'Active Users', icon: Users },
                { value: '4.9', label: 'User Rating', icon: Star },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
                  className="flex flex-col gap-1"
                >
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-3xl tracking-tight">
                    {stat.value}
                  </div>
                  <p className="text-sm text-slate-500 font-medium flex items-center gap-1">
                    <stat.icon className="h-3.5 w-3.5 text-primary" /> {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative lg:ml-auto"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-100 bg-white aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Medical Analysis"
                className="w-full h-full object-cover"
              />

              {/* Floating Badge 1 */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
                className="absolute top-6 right-6 bg-white/95 backdrop-blur p-4 rounded-xl shadow-lg border border-slate-100 max-w-[200px]"
              >
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <ShieldCheck className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Clinically Validated</p>
                    <p className="text-xs text-slate-500 mt-1">Approved by top dermatologists</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Badge 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1, ease: [0.25, 0.4, 0.25, 1] }}
                className="absolute bottom-6 left-6 bg-white/95 backdrop-blur p-4 rounded-xl shadow-lg border border-slate-100"
              >
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                  <p className="font-medium text-slate-900 text-sm">System Operational</p>
                </div>
              </motion.div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -z-10 top-12 -right-12 h-72 w-72 rounded-full bg-primary/5 blur-3xl animate-pulse"></div>
            <div className="absolute -z-10 -bottom-12 -left-12 h-72 w-72 rounded-full bg-blue-200/20 blur-3xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
