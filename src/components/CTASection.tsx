import React from 'react';
import { motion } from 'framer-motion';
import { SmoothLink } from '@/components/SmoothLink';
import { Button } from '@/components/ui/button';
import { Quote, Star } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-primary/5">
      <div className="container-width px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            className="space-y-6"
          >
            <h2 className="h2-title text-slate-900">
              Ready to Transform Your Care?
            </h2>

            <p className="text-lg text-slate-600 leading-relaxed">
              Join over 10,000 patients who have improved their skin and hair health through our AI-powered diagnostic platform.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
              className="flex flex-col gap-3 min-[400px]:flex-row pt-4"
            >
              <Button asChild size="lg" className="h-12 px-8 bg-primary hover:bg-primary/90 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                <SmoothLink to="/get-started" delay={700}>Start Free Analysis</SmoothLink>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8 border-slate-300 text-slate-700 hover:bg-white transition-all duration-300 hover:-translate-y-0.5">
                <SmoothLink to="/about" delay={600}>Learn More</SmoothLink>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
              className="flex items-center gap-4 pt-6 text-sm text-slate-600"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                    className="h-8 w-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-xs font-medium text-slate-500"
                  >
                    U{i}
                  </motion.div>
                ))}
              </div>
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
                    >
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    </motion.div>
                  ))}
                </div>
                <span className="font-medium text-slate-900">4.9/5 Rating</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            className="mx-auto w-full max-w-md lg:max-w-none"
          >
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg transition-shadow duration-300"
            >
              <Quote className="h-10 w-10 text-primary/20 mb-6" />
              <p className="text-lg italic mb-6 text-slate-700 leading-relaxed">
                "The accuracy of the AI analysis was impressive. It identified my skin condition correctly before I even saw a specialist. The recommended routine has made a visible difference."
              </p>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-primary font-bold text-lg">
                  ST
                </div>
                <div>
                  <p className="font-bold text-slate-900">Sarah Thompson</p>
                  <p className="text-sm text-slate-500">Verified Patient</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
