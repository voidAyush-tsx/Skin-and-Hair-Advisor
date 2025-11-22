import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Sparkles, FileText, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: <Camera className="h-8 w-8 text-primary" />,
    title: 'Image Capture',
    description: 'Take a clear photo of the affected area using our guided camera interface.',
    step: '01'
  },
  {
    icon: <Sparkles className="h-8 w-8 text-primary" />,
    title: 'AI Analysis',
    description: 'Our diagnostic algorithms analyze texture, color, and patterns to identify conditions.',
    step: '02'
  },
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: 'Care Plan',
    description: 'Receive a detailed report and personalized treatment plan approved by specialists.',
    step: '03'
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

const HowItWorks = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container-width px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-20"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Clinical Process</h2>
            <p className="max-w-[700px] text-slate-600 text-lg">
              A simple, secure, and scientific approach to diagnosis
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="relative grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {/* Connecting Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
            className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-slate-200 via-primary/30 to-slate-200 origin-left"
          ></motion.div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative flex flex-col items-center text-center space-y-6 group"
            >
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100 z-10 relative transition-shadow duration-300 group-hover:shadow-xl">
                  {step.icon}
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.2, ease: [0.25, 0.4, 0.25, 1] }}
                  className="absolute -top-4 -right-4 h-8 w-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold border-2 border-white shadow-sm z-20"
                >
                  {step.step}
                </motion.div>
              </motion.div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed max-w-xs mx-auto">{step.description}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="md:hidden flex justify-center py-4">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    <ArrowRight className="h-6 w-6 text-slate-300 rotate-90" />
                  </motion.div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
