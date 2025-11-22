import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, Upload, CheckCircle2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AnalysisDemo = () => {
  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container-width px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="h2-title text-slate-900">
              Diagnostic Demo
            </h2>
            <p className="max-w-[700px] text-slate-600 md:text-lg">
              Experience our AI analysis technology
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="skin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-white p-1 border border-slate-200 rounded-lg">
              <TabsTrigger value="skin" className="data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900">Skin Analysis</TabsTrigger>
              <TabsTrigger value="hair" className="data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900">Hair Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="skin">
              <Card className="border-slate-200 shadow-sm bg-white">
                <CardContent className="p-6 sm:p-10">
                  <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="w-full max-w-xs h-64 bg-slate-50 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-200 hover:border-primary/50 transition-colors cursor-pointer">
                        <div className="flex flex-col items-center text-center px-4">
                          <div className="h-12 w-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 border border-slate-100">
                            <Camera className="h-6 w-6 text-slate-400" />
                          </div>
                          <p className="text-sm font-medium text-slate-900 mb-1">
                            Upload Photo
                          </p>
                          <p className="text-xs text-slate-500 mb-4">
                            JPG or PNG, max 5MB
                          </p>
                          <Button size="sm" variant="outline">
                            <Upload className="h-3 w-3 mr-2" />
                            Select File
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Info className="h-3 w-3" />
                        <span>Data processed locally & securely</span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-slate-900">
                        Analysis Parameters
                      </h3>

                      <ul className="space-y-3">
                        {[
                          'Sebum production levels',
                          'Acne severity grading',
                          'Pigmentation analysis',
                          'Wrinkle depth assessment',
                          'Moisture barrier integrity'
                        ].map((item, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-primary mr-3 shrink-0" />
                            <span className="text-slate-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="hair">
              <Card className="border-slate-200 shadow-sm bg-white">
                <CardContent className="p-6 sm:p-10">
                  <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="w-full max-w-xs h-64 bg-slate-50 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-200 hover:border-primary/50 transition-colors cursor-pointer">
                        <div className="flex flex-col items-center text-center px-4">
                          <div className="h-12 w-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 border border-slate-100">
                            <Camera className="h-6 w-6 text-slate-400" />
                          </div>
                          <p className="text-sm font-medium text-slate-900 mb-1">
                            Upload Photo
                          </p>
                          <p className="text-xs text-slate-500 mb-4">
                            JPG or PNG, max 5MB
                          </p>
                          <Button size="sm" variant="outline">
                            <Upload className="h-3 w-3 mr-2" />
                            Select File
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Info className="h-3 w-3" />
                        <span>Data processed locally & securely</span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-slate-900">
                        Analysis Parameters
                      </h3>

                      <ul className="space-y-3">
                        {[
                          'Hair density mapping',
                          'Follicle health assessment',
                          'Scalp condition analysis',
                          'Hair shaft integrity',
                          'Growth pattern tracking'
                        ].map((item, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-primary mr-3 shrink-0" />
                            <span className="text-slate-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default AnalysisDemo;
