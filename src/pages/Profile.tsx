
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, Camera, FileText, History, Bell, Settings, Lock } from 'lucide-react';

const Profile = () => {
  const { toast } = useToast();
  const [profileData, setProfileData] = useState({
    fullName: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 (555) 123-4567',
    skinType: 'Combination',
    hairType: 'Type 3B - Curly',
    concerns: ['Acne', 'Dryness', 'Frizz']
  });
  
  const [isEditing, setIsEditing] = useState(false);
  
  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully!",
    });
    setIsEditing(false);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 mb-12">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-32 w-32">
                  <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt="Sarah Johnson" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                
                <Button variant="outline" size="sm">
                  <Camera className="h-4 w-4 mr-2" />
                  Change Photo
                </Button>
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold">{profileData.fullName}</h1>
                    <p className="text-muted-foreground">Member since April 2025</p>
                  </div>
                  
                  {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSaveProfile}>
                        Save Changes
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      {profileData.email}
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="flex items-center">
                      <Bell className="h-4 w-4 mr-2 text-muted-foreground" />
                      {profileData.phone}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {profileData.concerns.map(concern => (
                    <span key={concern} className="bg-secondary px-3 py-1 rounded-full text-sm">
                      {concern}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <Tabs defaultValue="analysis" className="w-full">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="analysis">
                  <FileText className="h-4 w-4 mr-2" />
                  Analysis
                </TabsTrigger>
                <TabsTrigger value="history">
                  <History className="h-4 w-4 mr-2" />
                  History
                </TabsTrigger>
                <TabsTrigger value="appointments">
                  <Bell className="h-4 w-4 mr-2" />
                  Appointments
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="analysis">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Skin Analysis</CardTitle>
                      <CardDescription>Latest results from your skin analysis</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Skin Type</p>
                            <p className="font-medium">{profileData.skinType}</p>
                          </div>
                          
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Hydration Level</p>
                            <p className="font-medium">Moderate</p>
                          </div>
                          
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Sensitivity</p>
                            <p className="font-medium">Low to medium</p>
                          </div>
                          
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">UV Damage</p>
                            <p className="font-medium">Minimal</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h3 className="text-sm font-medium">Key Concerns</h3>
                          <div className="flex flex-wrap gap-2">
                            <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm">
                              Mild acne
                            </span>
                            <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm">
                              Uneven texture
                            </span>
                            <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm">
                              Some hyperpigmentation
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        View Detailed Report
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Hair Analysis</CardTitle>
                      <CardDescription>Latest results from your hair analysis</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Hair Type</p>
                            <p className="font-medium">{profileData.hairType}</p>
                          </div>
                          
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Texture</p>
                            <p className="font-medium">Medium to coarse</p>
                          </div>
                          
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Density</p>
                            <p className="font-medium">Medium</p>
                          </div>
                          
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Porosity</p>
                            <p className="font-medium">High</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h3 className="text-sm font-medium">Key Concerns</h3>
                          <div className="flex flex-wrap gap-2">
                            <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm">
                              Dryness
                            </span>
                            <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm">
                              Frizz
                            </span>
                            <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm">
                              Split ends
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        View Detailed Report
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                
                <div className="mt-8 text-center">
                  <Button size="lg" className="px-8">
                    Get New Analysis
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="history">
                <Card>
                  <CardHeader>
                    <CardTitle>Analysis History</CardTitle>
                    <CardDescription>Your previous skin and hair analyses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="border-b pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">Skin Analysis</h3>
                          <p className="text-sm text-muted-foreground">April 5, 2025</p>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Combination skin with mild acne concerns
                        </p>
                        <Button variant="link" className="p-0 h-auto text-sm">
                          View Report
                        </Button>
                      </div>
                      
                      <div className="border-b pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">Hair Analysis</h3>
                          <p className="text-sm text-muted-foreground">April 5, 2025</p>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Type 3B curly hair with dryness concerns
                        </p>
                        <Button variant="link" className="p-0 h-auto text-sm">
                          View Report
                        </Button>
                      </div>
                      
                      <div className="border-b pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">Skin Analysis</h3>
                          <p className="text-sm text-muted-foreground">March 2, 2025</p>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Combination skin with moderate acne concerns
                        </p>
                        <Button variant="link" className="p-0 h-auto text-sm">
                          View Report
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="appointments">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Appointments</CardTitle>
                    <CardDescription>Your scheduled consultations with specialists</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="border-b pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">Dr. Emma Wilson</h3>
                          <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                            Confirmed
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Video Consultation - Dermatologist
                        </p>
                        <p className="text-sm font-medium mb-2">
                          April 12, 2025 at 10:00 AM
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Reschedule
                          </Button>
                          <Button variant="outline" size="sm">
                            Cancel
                          </Button>
                        </div>
                      </div>
                      
                      <div className="text-center py-4">
                        <p className="text-muted-foreground mb-4">No other upcoming appointments</p>
                        <Button>
                          Book New Appointment
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your account preferences and security</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="font-medium text-lg">Personal Information</h3>
                        
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input 
                              id="fullName" 
                              value={profileData.fullName} 
                              readOnly={!isEditing}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                              id="email" 
                              type="email" 
                              value={profileData.email} 
                              readOnly={!isEditing}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input 
                              id="phone" 
                              value={profileData.phone} 
                              readOnly={!isEditing}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="font-medium text-lg flex items-center">
                          <Lock className="h-4 w-4 mr-2" />
                          Security
                        </h3>
                        
                        <Button variant="outline">
                          Change Password
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="font-medium text-lg flex items-center">
                          <Bell className="h-4 w-4 mr-2" />
                          Notifications
                        </h3>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="email-notifications">Email Notifications</Label>
                            <input 
                              type="checkbox" 
                              id="email-notifications" 
                              className="toggle" 
                              defaultChecked 
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <Label htmlFor="appointment-reminders">Appointment Reminders</Label>
                            <input 
                              type="checkbox" 
                              id="appointment-reminders" 
                              className="toggle" 
                              defaultChecked 
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <Label htmlFor="marketing-emails">Marketing Emails</Label>
                            <input 
                              type="checkbox" 
                              id="marketing-emails" 
                              className="toggle" 
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
