import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Sparkles, User, Heart, MessageCircle, Shield } from 'lucide-react';

const features = [
  {
    icon: <Camera className="h-6 w-6 text-primary" />,
    title: 'AI Photo Analysis',
    description: 'Advanced computer vision technology analyzes your skin and hair conditions instantly.',
    colSpan: 'md:col-span-2'
  },
  {
    icon: <Sparkles className="h-6 w-6 text-primary" />,
    title: 'Evidence-Based Plans',
    description: 'Recommendations backed by dermatological research and clinical data.',
    colSpan: 'md:col-span-1'
  },
  {
    icon: <User className="h-6 w-6 text-primary" />,
    title: 'Specialist Network',
    description: 'Direct access to board-certified dermatologists and trichologists.',
    colSpan: 'md:col-span-1'
  },
  {
    icon: <Heart className="h-6 w-6 text-primary" />,
    title: 'Progress Tracking',
    description: 'Monitor health improvements with detailed historical analytics.',
    colSpan: 'md:col-span-2'
  },
  {
    icon: <MessageCircle className="h-6 w-6 text-primary" />,
    title: 'Patient Community',
    description: 'Connect with others on similar health journeys in a moderated environment.',
    colSpan: 'md:col-span-1'
  },
  {
    icon: <Shield className="h-6 w-6 text-primary" />,
    title: 'Secure & Private',
    description: 'Enterprise-grade security ensures your health data remains private and HIPAA compliant.',
    colSpan: 'md:col-span-2'
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

const FeatureSection = () => {
  return (
    <section className="py-24 bg-slate-50/50">
      <div className="container-width px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Comprehensive Care Platform
            </h2>
            <p className="max-w-[700px] text-slate-600 text-lg">
              Combining advanced AI technology with professional medical expertise
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 ${feature.colSpan}`}
            >
              <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500 blur-2xl"></div>

              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
                  className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureSection;
