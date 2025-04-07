
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Upload, Camera, Image, FileText, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const SkinAnalysis = () => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResults, setAnalysisResults] = useState<any>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setAnalysisComplete(false);
      setAnalysisResults(null);
    }
  };

  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          setAnalysisComplete(true);
          
          // Mock analysis results
          setAnalysisResults({
            skinType: 'Combination',
            concerns: ['Mild acne', 'Uneven texture', 'Some hyperpigmentation'],
            hydrationLevel: 'Moderate',
            sensitivity: 'Low to medium',
            uvDamage: 'Minimal',
            recommendations: [
              { type: 'Cleanser', description: 'Gentle foaming cleanser with salicylic acid' },
              { type: 'Treatment', description: 'Niacinamide serum for hyperpigmentation' },
              { type: 'Moisturizer', description: 'Oil-free gel moisturizer' },
              { type: 'Sunscreen', description: 'Broad-spectrum SPF 50 sunscreen' }
            ]
          });
          
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Skin Analysis
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Upload a photo of your skin to get personalized recommendations based on AI analysis
              </p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Upload Your Photo</CardTitle>
                <CardDescription>
                  For best results, use a well-lit selfie with a clear view of your face without makeup
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
                            alt="Skin preview" 
                            className="w-full h-full object-cover" 
                          />
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="absolute top-2 right-2"
                            onClick={() => {
                              setSelectedFile(null);
                              setPreviewUrl(null);
                            }}
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
                            alt="Skin preview" 
                            className="w-full h-full object-cover" 
                          />
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="absolute top-2 right-2"
                            onClick={() => {
                              setSelectedFile(null);
                              setPreviewUrl(null);
                            }}
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
                      <span className="text-sm text-muted-foreground">Analyzing your skin...</span>
                      <span className="text-sm font-medium">{analysisProgress}%</span>
                    </div>
                    <Progress value={analysisProgress} />
                    <div className="flex items-center justify-center">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
                        <h3 className="font-medium">Skin Type</h3>
                        <p className="text-sm bg-secondary rounded-lg px-3 py-2">
                          {analysisResults.skinType}
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-medium">Hydration Level</h3>
                        <p className="text-sm bg-secondary rounded-lg px-3 py-2">
                          {analysisResults.hydrationLevel}
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-medium">Sensitivity</h3>
                        <p className="text-sm bg-secondary rounded-lg px-3 py-2">
                          {analysisResults.sensitivity}
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-medium">UV Damage</h3>
                        <p className="text-sm bg-secondary rounded-lg px-3 py-2">
                          {analysisResults.uvDamage}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">Concerns Detected</h3>
                      <div className="flex flex-wrap gap-2">
                        {analysisResults.concerns.map((concern: string, index: number) => (
                          <span key={index} className="text-sm bg-primary/10 text-primary rounded-full px-3 py-1">
                            {concern}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="font-medium">Recommended Routine</h3>
                      {analysisResults.recommendations.map((rec: any, index: number) => (
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
                    disabled={!selectedFile}
                  >
                    Analyze Skin
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

export default SkinAnalysis;
