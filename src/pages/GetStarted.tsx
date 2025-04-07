
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Camera, Check, Upload, User, Lock, Mail, Shield } from 'lucide-react';

const GetStarted = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      agreeTerms: checked
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure both passwords match",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.agreeTerms) {
      toast({
        title: "Terms and Conditions",
        description: "Please agree to the terms and conditions to continue",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, you would submit this to your backend
    toast({
      title: "Account created",
      description: "Your account has been created successfully!",
    });
    
    // Navigate to analysis page
    setTimeout(() => {
      navigate('/skin-analysis');
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-md mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Get Started
              </h1>
              <p className="text-muted-foreground">
                Create your account to begin your beauty care journey
              </p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Create Your Account</CardTitle>
                <CardDescription>
                  Enter your details to create an account and get personalized recommendations
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="fullName"
                        name="fullName"
                        placeholder="John Doe" 
                        value={formData.fullName}
                        onChange={handleChange}
                        className="pl-9"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="email"
                        name="email"
                        type="email" 
                        placeholder="john@example.com" 
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-9"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="password"
                        name="password"
                        type="password" 
                        placeholder="••••••••" 
                        value={formData.password}
                        onChange={handleChange}
                        className="pl-9"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password" 
                        placeholder="••••••••" 
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="pl-9"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2 pt-2">
                    <Checkbox 
                      id="terms" 
                      checked={formData.agreeTerms}
                      onCheckedChange={handleCheckboxChange}
                    />
                    <Label htmlFor="terms" className="text-sm leading-tight">
                      I agree to the{" "}
                      <a href="#" className="text-primary hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-primary hover:underline">
                        Privacy Policy
                      </a>
                    </Label>
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Create Account
                  </Button>
                </form>
                
                <div className="mt-6 text-center text-sm">
                  <p className="text-muted-foreground">
                    Already have an account?{" "}
                    <a href="#" className="text-primary hover:underline font-medium">
                      Sign in
                    </a>
                  </p>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col gap-4">
                <div className="flex items-center justify-center text-sm text-muted-foreground gap-1">
                  <Shield className="h-4 w-4" />
                  Your data is securely encrypted and never shared
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GetStarted;
