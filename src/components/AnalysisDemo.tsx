import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, Upload, CheckCircle2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

const AnalysisDemo = () => {
  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container-width px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          <div className="space-y-2">
            <h2 className="h2-title text-slate-900">
              Diagnostic Demo
            </h2>
            <p className="max-w-[700px] text-slate-600 md:text-lg">
              Experience our AI analysis technology
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
          className="max-w-4xl mx-auto"
        >
          <Tabs defaultValue="skin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-white p-1 border border-slate-200 rounded-lg">
              <TabsTrigger value="skin" className="data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900 transition-all duration-200">Skin Analysis</TabsTrigger>
              <TabsTrigger value="hair" className="data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900 transition-all duration-200">Hair Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="skin" className="mt-0">
              <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
                <CardContent className="p-6 sm:p-10">
                  <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
                      className="flex flex-col items-center justify-center space-y-4"
                    >
                      <motion.div
                        whileHover={{ scale: 1.02, borderColor: 'hsl(var(--primary))' }}
                        transition={{ duration: 0.2 }}
                        className="w-full max-w-xs h-64 bg-slate-50 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-200 cursor-pointer transition-colors"
                      >
                        <div className="flex flex-col items-center text-center px-4">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="h-12 w-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 border border-slate-100"
                          >
                            <Camera className="h-6 w-6 text-slate-400" />
                          </motion.div>
                          <p className="text-sm font-medium text-slate-900 mb-1">
                            Upload Photo
                          </p>
                          <p className="text-xs text-slate-500 mb-4">
                            JPG or PNG, max 5MB
                          </p>
                          <Button size="sm" variant="outline" className="transition-all duration-200 hover:bg-primary hover:text-white hover:border-primary">
                            <Upload className="h-3 w-3 mr-2" />
                            Select File
                          </Button>
                        </div>
                      </motion.div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Info className="h-3 w-3" />
                        <span>Data processed locally & securely</span>
                      </div>
                    </motion.div>

                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-slate-900">
                        Analysis Parameters
                      </h3>

                      <motion.ul
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-3"
                      >
                        {[
                          'Sebum production levels',
                          'Acne severity grading',
                          'Pigmentation analysis',
                          'Wrinkle depth assessment',
                          'Moisture barrier integrity'
                        ].map((item, i) => (
                          <motion.li key={i} variants={itemVariants} className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-primary mr-3 shrink-0" />
                            <span className="text-slate-700">{item}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="hair" className="mt-0">
              <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
                <CardContent className="p-6 sm:p-10">
                  <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
                      className="flex flex-col items-center justify-center space-y-4"
                    >
                      <motion.div
                        whileHover={{ scale: 1.02, borderColor: 'hsl(var(--primary))' }}
                        transition={{ duration: 0.2 }}
                        className="w-full max-w-xs h-64 bg-slate-50 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-200 cursor-pointer transition-colors"
                      >
                        <div className="flex flex-col items-center text-center px-4">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="h-12 w-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 border border-slate-100"
                          >
                            <Camera className="h-6 w-6 text-slate-400" />
                          </motion.div>
                          <p className="text-sm font-medium text-slate-900 mb-1">
                            Upload Photo
                          </p>
                          <p className="text-xs text-slate-500 mb-4">
                            JPG or PNG, max 5MB
                          </p>
                          <Button size="sm" variant="outline" className="transition-all duration-200 hover:bg-primary hover:text-white hover:border-primary">
                            <Upload className="h-3 w-3 mr-2" />
                            Select File
                          </Button>
                        </div>
                      </motion.div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Info className="h-3 w-3" />
                        <span>Data processed locally & securely</span>
                      </div>
                    </motion.div>

                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-slate-900">
                        Analysis Parameters
                      </h3>

                      <motion.ul
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-3"
                      >
                        {[
                          'Hair density mapping',
                          'Follicle health assessment',
                          'Scalp condition analysis',
                          'Hair shaft integrity',
                          'Growth pattern tracking'
                        ].map((item, i) => (
                          <motion.li key={i} variants={itemVariants} className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-primary mr-3 shrink-0" />
                            <span className="text-slate-700">{item}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
};

export default AnalysisDemo;
