
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, Upload, PlusCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AnalysisDemo = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Try Our AI Analysis
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              See how our AI technology can analyze your hair and skin to provide personalized recommendations
            </p>
          </div>
        </div>
        
        <div className="mt-12">
          <Tabs defaultValue="skin" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="skin">Skin Analysis</TabsTrigger>
              <TabsTrigger value="hair">Hair Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="skin">
              <Card>
                <CardContent className="p-6">
                  <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="w-full max-w-xs h-64 bg-muted rounded-xl flex items-center justify-center border-2 border-dashed border-muted-foreground/25">
                        <div className="flex flex-col items-center text-center px-4">
                          <Camera className="h-10 w-10 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground mb-2">
                            Upload a photo to analyze your skin
                          </p>
                          <Button className="relative">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Photo
                            <input 
                              type="file" 
                              className="absolute inset-0 opacity-0 cursor-pointer" 
                              accept="image/*" 
                            />
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-xs text-muted-foreground">
                        Your photo will be analyzed privately and securely
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold flex items-center">
                        <Sparkles className="h-5 w-5 mr-2 text-primary" />
                        What Our AI Can Detect
                      </h3>
                      
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <PlusCircle className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                          <span>Skin type (oily, dry, combination, normal)</span>
                        </li>
                        <li className="flex items-start">
                          <PlusCircle className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                          <span>Common concerns (acne, hyperpigmentation, wrinkles)</span>
                        </li>
                        <li className="flex items-start">
                          <PlusCircle className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                          <span>Sensitivity levels and irritation factors</span>
                        </li>
                        <li className="flex items-start">
                          <PlusCircle className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                          <span>UV damage and environmental impact assessment</span>
                        </li>
                        <li className="flex items-start">
                          <PlusCircle className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                          <span>Hydration levels and barrier function</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="hair">
              <Card>
                <CardContent className="p-6">
                  <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="w-full max-w-xs h-64 bg-muted rounded-xl flex items-center justify-center border-2 border-dashed border-muted-foreground/25">
                        <div className="flex flex-col items-center text-center px-4">
                          <Camera className="h-10 w-10 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground mb-2">
                            Upload a photo to analyze your hair
                          </p>
                          <Button className="relative">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Photo
                            <input 
                              type="file" 
                              className="absolute inset-0 opacity-0 cursor-pointer" 
                              accept="image/*" 
                            />
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-xs text-muted-foreground">
                        Your photo will be analyzed privately and securely
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold flex items-center">
                        <Sparkles className="h-5 w-5 mr-2 text-primary" />
                        What Our AI Can Detect
                      </h3>
                      
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <PlusCircle className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                          <span>Hair type and texture analysis</span>
                        </li>
                        <li className="flex items-start">
                          <PlusCircle className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                          <span>Scalp condition assessment</span>
                        </li>
                        <li className="flex items-start">
                          <PlusCircle className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                          <span>Damage levels (split ends, breakage, thinning)</span>
                        </li>
                        <li className="flex items-start">
                          <PlusCircle className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                          <span>Color treatment and heat damage detection</span>
                        </li>
                        <li className="flex items-start">
                          <PlusCircle className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                          <span>Growth pattern and porosity evaluation</span>
                        </li>
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
