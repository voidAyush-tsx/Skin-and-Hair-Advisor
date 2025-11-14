import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useToast } from "@/components/ui/use-toast";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Upload, Camera, Image, FileText, Loader2, CheckCircle, X } from 'lucide-react';
import { analyzeHair } from '@/services/analysisService';
import { HairAnalysisResult } from "@/types/analysis";

const HairAnalysis = () => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResults, setAnalysisResults] = useState<HairAnalysisResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use refs to keep track of intervals and timeouts
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up resources when component unmounts
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      // Clean up any preview URL blob
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    if (file) {
      if (!file.type.includes('image')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file.",
          variant: "destructive"
        });
        return;
      }

      // Clean up previous preview if exists
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setAnalysisComplete(false);
      setAnalysisResults(null);
    }
  }, [previewUrl, toast]);

  const cancelAnalysis = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setIsAnalyzing(false);
    setAnalysisProgress(0);
    setIsSubmitting(false);

    toast({
      title: "Analysis cancelled",
      description: "You've cancelled the hair analysis process",
    });
  }, [toast]);

  const simulateAnalysis = useCallback(async () => {
    if (!selectedFile || isSubmitting) return;

    setIsSubmitting(true);
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    try {
      // Start a timer to show progress while waiting for the API
      progressIntervalRef.current = setInterval(() => {
        setAnalysisProgress(prev => {
          const newValue = Math.min(prev + 2, 95);
          return newValue;
        });
      }, 150);

      // Call the API to analyze the image
      const results = await analyzeHair(selectedFile);

      // Clear interval and set to 100%
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }

      setAnalysisProgress(100);

      // Short timeout for UX purposes
      timeoutRef.current = setTimeout(() => {
        setIsAnalyzing(false);
        setAnalysisComplete(true);
        setAnalysisResults(results);
        setIsSubmitting(false);
      }, 500);

    } catch (error) {
      // Clear any intervals on error
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }

      setIsAnalyzing(false);
      setIsSubmitting(false);

      toast({
        title: "Analysis failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  }, [selectedFile, isSubmitting, toast]);

  const resetAnalysis = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setAnalysisComplete(false);
    setAnalysisResults(null);
    setAnalysisProgress(0);
  }, [previewUrl]);

  return (
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Hair Analysis
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Upload a photo of your hair to get personalized care recommendations
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Upload Your Photo</CardTitle>
                  <CardDescription>
                    For best results, take a clear photo showing your natural hair texture in good lighting
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <Tabs defaultValue="upload" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-8">
                      <TabsTrigger value="upload">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Photo
                      </TabsTrigger>
                      <TabsTrigger value="camera">
                        <Camera className="h-4 w-4 mr-2" />
                        Take Photo
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="upload">
                      <div className="flex flex-col items-center space-y-4">
                        {!previewUrl ? (
                            <div className="w-full h-64 bg-muted rounded-xl flex items-center justify-center border-2 border-dashed border-muted-foreground/25">
                              <div className="flex flex-col items-center text-center px-4">
                                <Image className="h-10 w-10 text-muted-foreground mb-2" />
                                <p className="text-sm text-muted-foreground mb-2">
                                  Drag and drop your photo here or click to browse
                                </p>
                                <Button className="relative">
                                  <Upload className="h-4 w-4 mr-2" />
                                  Select Photo
                                  <input
                                      type="file"
                                      className="absolute inset-0 opacity-0 cursor-pointer"
                                      accept="image/*"
                                      onChange={handleFileChange}
                                  />
                                </Button>
                              </div>
                            </div>
                        ) : (
                            <div className="relative w-full aspect-square max-w-sm rounded-xl overflow-hidden">
                              <img
                                  src={previewUrl}
                                  alt="Hair preview"
                                  className="w-full h-full object-cover"
                              />
                              <Button
                                  variant="outline"
                                  size="sm"
                                  className="absolute top-2 right-2"
                                  onClick={resetAnalysis}
                              >
                                Change
                              </Button>
                            </div>
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="camera">
                      <div className="flex flex-col items-center space-y-4">
                        {!previewUrl ? (
                            <div className="w-full h-64 bg-muted rounded-xl flex items-center justify-center border-2 border-dashed border-muted-foreground/25">
                              <div className="flex flex-col items-center text-center px-4">
                                <Camera className="h-10 w-10 text-muted-foreground mb-2" />
                                <p className="text-sm text-muted-foreground mb-2">
                                  Access your camera to take a photo
                                </p>
                                <Button>
                                  <Camera className="h-4 w-4 mr-2" />
                                  Open Camera
                                </Button>
                              </div>
                            </div>
                        ) : (
                            <div className="relative w-full aspect-square max-w-sm rounded-xl overflow-hidden">
                              <img
                                  src={previewUrl}
                                  alt="Hair preview"
                                  className="w-full h-full object-cover"
                              />
                              <Button
                                  variant="outline"
                                  size="sm"
                                  className="absolute top-2 right-2"
                                  onClick={resetAnalysis}
                              >
                                Change
                              </Button>
                            </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>

                  {/* Analysis Progress */}
                  {isAnalyzing && (
                      <div className="mt-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Analyzing your hair...</span>
                          <span className="text-sm font-medium">{analysisProgress}%</span>
                        </div>
                        <Progress value={analysisProgress} />
                        <div className="flex items-center justify-center gap-4">
                          <Loader2 className="h-8 w-8 animate-spin text-primary" />
                          <Button
                              variant="outline"
                              size="sm"
                              onClick={cancelAnalysis}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Cancel Analysis
                          </Button>
                        </div>
                      </div>
                  )}

                  {/* Analysis Results */}
                  {analysisComplete && analysisResults && (
                      <div className="mt-6 space-y-6">
                        <div className="flex items-center justify-center text-primary">
                          <CheckCircle className="h-8 w-8 mr-2" />
                          <span className="text-lg font-medium">Analysis Complete</span>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <h3 className="font-medium">Hair Type</h3>
                            <p className="text-sm bg-secondary rounded-lg px-3 py-2">
                              {analysisResults.hairType}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <h3 className="font-medium">Texture</h3>
                            <p className="text-sm bg-secondary rounded-lg px-3 py-2">
                              {analysisResults.texture}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <h3 className="font-medium">Density</h3>
                            <p className="text-sm bg-secondary rounded-lg px-3 py-2">
                              {analysisResults.density}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <h3 className="font-medium">Porosity</h3>
                            <p className="text-sm bg-secondary rounded-lg px-3 py-2">
                              {analysisResults.porosity}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <h3 className="font-medium">Damage Level</h3>
                            <p className="text-sm bg-secondary rounded-lg px-3 py-2">
                              {analysisResults.damageLevel}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <h3 className="font-medium">Scalp Condition</h3>
                            <p className="text-sm bg-secondary rounded-lg px-3 py-2">
                              {analysisResults.scalpCondition}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h3 className="font-medium">Concerns Detected</h3>
                          <div className="flex flex-wrap gap-2">
                            {analysisResults.concerns.map((concern, index) => (
                                <span key={index} className="text-sm bg-primary/10 text-primary rounded-full px-3 py-1">
                            {concern}
                          </span>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h3 className="font-medium">Recommended Routine</h3>
                          {analysisResults.recommendations.map((rec, index) => (
                              <div key={index} className="flex items-start border-l-2 border-primary pl-3 py-1">
                                <div>
                                  <p className="font-medium">{rec.type}</p>
                                  <p className="text-sm text-muted-foreground">{rec.description}</p>
                                </div>
                              </div>
                          ))}
                        </div>

                        <div className="flex justify-center">
                          <Button className="w-full md:w-auto">
                            <FileText className="h-4 w-4 mr-2" />
                            Get Detailed Report
                          </Button>
                        </div>
                      </div>
                  )}
                </CardContent>

                <CardFooter className="flex flex-col gap-4">
                  {previewUrl && !analysisComplete && !isAnalyzing && (
                      <Button
                          className="w-full"
                          onClick={simulateAnalysis}
                          disabled={!selectedFile || isSubmitting}
                      >
                        Analyze Hair
                      </Button>
                  )}

                  <p className="text-xs text-muted-foreground text-center">
                    Your photo will be analyzed privately and securely. We do not store your images
                    without your permission.
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>

        <Footer />
      </div>
  );
};

export default HairAnalysis;