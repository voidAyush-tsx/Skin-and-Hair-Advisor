import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useToast } from "@/components/ui/use-toast";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Upload, Camera, Image, FileText, Loader2, CheckCircle, X, AlertCircle, Shield, ScanLine, Activity, Droplets, Sun, ShoppingCart } from 'lucide-react';
import { analyzeSkin } from '@/services/analysisService';
import { SkinAnalysisResult } from "@/types/analysis";
import { ChatInterface } from '@/components/ChatInterface';
import { WebcamCapture } from '@/components/WebcamCapture';
import { ProductRecommendations } from '@/components/ProductRecommendations';
import { matchProducts, Product } from '@/data/products';

const SkinAnalysis = () => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResults, setAnalysisResults] = useState<SkinAnalysisResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);

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
      description: "You've cancelled the skin analysis process",
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
      const results = await analyzeSkin(selectedFile);

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

        // Generate product recommendations
        const products = matchProducts(results.skinType, results.concerns);
        setRecommendedProducts(products);
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
    <div className="min-h-screen flex flex-col bg-slate-50 animate-fade-in-up">
      <Header />

      <main className="flex-1 py-12 md:py-20">
        <div className="container-width px-4 md:px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-start">

            {/* Left Panel: Context & Instructions */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-primary">
                  <Activity className="h-3 w-3 mr-2" />
                  Clinical Dermatology AI
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
                  Skin Health <br />
                  <span className="text-primary">Diagnostic Center</span>
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Our advanced computer vision system analyzes 150+ skin biomarkers to generate a comprehensive clinical report.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6">
                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                  <ScanLine className="h-5 w-5 text-primary" />
                  Analysis Parameters
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-sm text-slate-600">
                    <div className="h-6 w-6 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                      <Droplets className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span><strong>Hydration & Barrier:</strong> Assessment of moisture retention and lipid barrier integrity.</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-slate-600">
                    <div className="h-6 w-6 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                      <AlertCircle className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span><strong>Sensitivity & Inflammation:</strong> Detection of erythema, rosacea markers, and reactivity.</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-slate-600">
                    <div className="h-6 w-6 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                      <Sun className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span><strong>Pigmentation & Aging:</strong> Analysis of UV damage, melanin distribution, and fine lines.</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex gap-3">
                <Shield className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-bold text-amber-900">Medical Disclaimer</p>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    This analysis is for informational purposes only and does not constitute a medical diagnosis. Always consult with a certified dermatologist for clinical advice.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Panel: Diagnostic Interface */}
            <div className="lg:col-span-7">
              <Card className="border-slate-200 shadow-xl shadow-slate-200/50 bg-white overflow-hidden">
                <CardHeader className="border-b border-slate-100 pb-6 bg-slate-50/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl text-slate-900">Diagnostic Station</CardTitle>
                      <CardDescription className="text-slate-500 mt-1">
                        Upload a high-resolution image for processing
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                      System Ready
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-0">
                  {!analysisComplete ? (
                    <div className="p-8">
                      <Tabs defaultValue="upload" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-8 bg-slate-100 p-1">
                          <TabsTrigger value="upload" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Image
                          </TabsTrigger>
                          <TabsTrigger value="camera" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                            <Camera className="h-4 w-4 mr-2" />
                            Use Camera
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="upload" className="mt-0">
                          <div className="flex flex-col items-center space-y-6">
                            {!previewUrl ? (
                              <div className="w-full h-80 bg-slate-50 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-primary/50 hover:bg-slate-50/80 transition-all group cursor-pointer relative overflow-hidden">
                                <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
                                <div className="relative z-10 flex flex-col items-center text-center px-4">
                                  <div className="h-16 w-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <Image className="h-8 w-8 text-slate-400 group-hover:text-primary transition-colors" />
                                  </div>
                                  <p className="text-lg font-semibold text-slate-900 mb-2">
                                    Drop image here or click to upload
                                  </p>
                                  <p className="text-sm text-slate-500 mb-6 max-w-xs">
                                    Supports JPG, PNG. Max file size 10MB. Ensure good lighting.
                                  </p>
                                  <Button className="relative bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all">
                                    <Upload className="h-4 w-4 mr-2" />
                                    Select Image
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
                              <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden border border-slate-200 shadow-lg group">
                                <img
                                  src={previewUrl}
                                  alt="Skin preview"
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <Button
                                    variant="secondary"
                                    className="bg-white/90 hover:bg-white text-slate-900"
                                    onClick={resetAnalysis}
                                  >
                                    Change Image
                                  </Button>
                                </div>
                                {isAnalyzing && (
                                  <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm flex flex-col items-center justify-center z-20">
                                    <div className="relative">
                                      <div className="h-24 w-24 rounded-full border-4 border-white/20 border-t-primary animate-spin"></div>
                                      <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">{analysisProgress}%</span>
                                      </div>
                                    </div>
                                    <p className="text-white font-medium mt-4 animate-pulse">Analyzing clinical markers...</p>
                                  </div>
                                )}
                                {/* Scanning Line Animation */}
                                {isAnalyzing && (
                                  <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                                    <div className="w-full h-1 bg-primary/80 shadow-[0_0_15px_rgba(2,132,199,0.8)] animate-[scan_2s_ease-in-out_infinite]"></div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </TabsContent>

                        <TabsContent value="camera" className="mt-0">
                          <div className="w-full h-80 bg-slate-50 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-slate-300 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
                            <div className="relative z-10 flex flex-col items-center text-center px-4">
                              <div className="h-16 w-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4">
                                <Camera className="h-8 w-8 text-slate-400" />
                              </div>
                              <p className="text-lg font-semibold text-slate-900 mb-2">
                                Activate Facial Scanner
                              </p>
                              <p className="text-sm text-slate-500 mb-6 max-w-xs">
                                Use our advanced face mesh technology for precise analysis.
                              </p>
                              <Button
                                className="bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all"
                                onClick={() => setShowWebcam(true)}
                              >
                                <Camera className="h-4 w-4 mr-2" />
                                Launch Scanner
                              </Button>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>

                      {previewUrl && !isAnalyzing && (
                        <div className="mt-8 flex justify-center">
                          <Button
                            size="lg"
                            className="w-full md:w-auto min-w-[200px] h-12 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
                            onClick={simulateAnalysis}
                            disabled={!selectedFile || isSubmitting}
                          >
                            <ScanLine className="h-5 w-5 mr-2" />
                            Start Analysis
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    // Results Dashboard
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="bg-slate-900 text-white p-8 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/20 via-slate-900 to-slate-900"></div>
                        <div className="relative z-10">
                          <div className="inline-flex items-center justify-center p-3 bg-green-500/20 rounded-full mb-4 backdrop-blur-sm border border-green-500/30">
                            <CheckCircle className="h-8 w-8 text-green-400" />
                          </div>
                          <h2 className="text-2xl font-bold mb-2">Analysis Complete</h2>
                          <p className="text-slate-400">Report generated successfully</p>
                        </div>
                      </div>

                      <Tabs defaultValue="report" className="w-full">
                        <div className="px-8 pt-6">
                          <TabsList className="grid w-full grid-cols-3 bg-slate-100 p-1">
                            <TabsTrigger value="report" className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs sm:text-sm">
                              <FileText className="h-4 w-4 mr-1 sm:mr-2" />
                              <span className="hidden sm:inline">Clinical</span> Report
                            </TabsTrigger>
                            <TabsTrigger value="chat" className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs sm:text-sm">
                              <Activity className="h-4 w-4 mr-1 sm:mr-2" />
                              <span className="hidden sm:inline">Dr. AI</span> Chat
                            </TabsTrigger>
                            <TabsTrigger value="products" className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs sm:text-sm">
                              <ShoppingCart className="h-4 w-4 mr-1 sm:mr-2" />
                              Products
                            </TabsTrigger>
                          </TabsList>
                        </div>

                        <TabsContent value="report" className="mt-0 p-8 space-y-8">
                          {analysisResults && (
                            <>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
                                  <p className="text-sm text-slate-500 mb-1">Skin Type</p>
                                  <p className="text-lg font-bold text-slate-900">{analysisResults.skinType}</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
                                  <p className="text-sm text-slate-500 mb-1">Hydration</p>
                                  <p className="text-lg font-bold text-primary">{analysisResults.hydrationLevel}</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
                                  <p className="text-sm text-slate-500 mb-1">Sensitivity</p>
                                  <p className="text-lg font-bold text-slate-900">{analysisResults.sensitivity}</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
                                  <p className="text-sm text-slate-500 mb-1">UV Damage</p>
                                  <p className="text-lg font-bold text-slate-900">{analysisResults.uvDamage}</p>
                                </div>
                              </div>

                              <div className="space-y-3">
                                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                  <AlertCircle className="h-5 w-5 text-amber-500" />
                                  Detected Concerns
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                  {analysisResults.concerns.map((concern, index) => (
                                    <span key={index} className="text-sm bg-amber-50 text-amber-700 border border-amber-100 rounded-full px-4 py-1.5 font-medium">
                                      {concern}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div className="space-y-4">
                                <h3 className="font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center justify-between">
                                  <span>Clinical Recommendations</span>
                                  <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-1 rounded">AI Generated</span>
                                </h3>
                                <div className="space-y-3">
                                  {analysisResults.recommendations.map((rec, index) => (
                                    <div key={index} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-primary/20 transition-colors">
                                      <div className="h-8 w-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-primary font-bold shrink-0 shadow-sm">
                                        {index + 1}
                                      </div>
                                      <div>
                                        <p className="font-bold text-slate-900 text-sm uppercase tracking-wide mb-1">{rec.type}</p>
                                        <p className="text-sm text-slate-600 leading-relaxed">{rec.description}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-100">
                                <Button className="flex-1 bg-slate-900 hover:bg-slate-800 h-12" onClick={resetAnalysis}>
                                  <ScanLine className="h-4 w-4 mr-2" />
                                  New Analysis
                                </Button>
                                <Button variant="outline" className="flex-1 h-12">
                                  <FileText className="h-4 w-4 mr-2" />
                                  Download Report
                                </Button>
                              </div>
                            </>
                          )}
                        </TabsContent>

                        <TabsContent value="chat" className="mt-0 p-8">
                          <ChatInterface context={analysisResults} />
                        </TabsContent>

                        <TabsContent value="products" className="mt-0 p-8">
                          <ProductRecommendations products={recommendedProducts} />
                        </TabsContent>
                      </Tabs>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Webcam Modal */}
      {showWebcam && (
        <WebcamCapture
          onCapture={(imageSrc, file) => {
            setSelectedFile(file);
            setPreviewUrl(imageSrc);
            setShowWebcam(false);
            setAnalysisComplete(false);
            setAnalysisResults(null);
          }}
          onClose={() => setShowWebcam(false)}
        />
      )}

      <Footer />
    </div>
  );
};

export default SkinAnalysis;