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
import { User, Mail, Camera, FileText, History, Bell, Settings, Lock, Shield } from 'lucide-react';

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
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 py-16 md:py-24">
        <div className="container-width px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 mb-12">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="h-32 w-32 border-4 border-white shadow-md">
                    <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt="Sarah Johnson" />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 rounded-full shadow-sm h-8 w-8 bg-white hover:bg-slate-100">
                    <Camera className="h-4 w-4 text-slate-600" />
                  </Button>
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-slate-900">{profileData.fullName}</h1>
                    <p className="text-slate-500 flex items-center gap-2">
                      <Shield className="h-3.5 w-3.5 text-primary" />
                      Verified Patient • Member since April 2025
                    </p>
                  </div>

                  {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)} variant="outline" className="bg-white border-slate-200">
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setIsEditing(false)} className="bg-white border-slate-200">
                        Cancel
                      </Button>
                      <Button onClick={handleSaveProfile} className="bg-primary hover:bg-primary/90">
                        Save Changes
                      </Button>
                    </div>
                  )}
                </div>

                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Email</p>
                    <p className="flex items-center text-slate-900">
                      <Mail className="h-4 w-4 mr-2 text-slate-400" />
                      {profileData.email}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Phone</p>
                    <p className="flex items-center text-slate-900">
                      <Bell className="h-4 w-4 mr-2 text-slate-400" />
                      {profileData.phone}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {profileData.concerns.map(concern => (
                    <span key={concern} className="bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1 rounded-full text-sm font-medium">
                      {concern}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <Tabs defaultValue="analysis" className="w-full">
              <TabsList className="grid grid-cols-4 mb-8 bg-slate-100 p-1 rounded-lg">
                <TabsTrigger value="analysis" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <FileText className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Analysis</span>
                </TabsTrigger>
                <TabsTrigger value="history" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <History className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">History</span>
                </TabsTrigger>
                <TabsTrigger value="appointments" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <Bell className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Appointments</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <Settings className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Settings</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="analysis" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="border-slate-200 shadow-sm bg-white">
                    <CardHeader className="border-b border-slate-100 pb-4">
                      <CardTitle className="text-lg text-slate-900">Skin Analysis</CardTitle>
                      <CardDescription>Latest clinical assessment results</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <p className="text-xs text-slate-500 uppercase">Skin Type</p>
                            <p className="font-medium text-slate-900">{profileData.skinType}</p>
                          </div>

                          <div className="space-y-1">
                            <p className="text-xs text-slate-500 uppercase">Hydration</p>
                            <p className="font-medium text-slate-900">Moderate</p>
                          </div>

                          <div className="space-y-1">
                            <p className="text-xs text-slate-500 uppercase">Sensitivity</p>
                            <p className="font-medium text-slate-900">Low to medium</p>
                          </div>

                          <div className="space-y-1">
                            <p className="text-xs text-slate-500 uppercase">UV Damage</p>
                            <p className="font-medium text-slate-900">Minimal</p>
                          </div>
                        </div>

                        <div className="space-y-2 pt-2 border-t border-slate-100">
                          <h3 className="text-sm font-medium text-slate-900">Key Concerns</h3>
                          <div className="flex flex-wrap gap-2">
                            <span className="bg-amber-50 text-amber-700 border border-amber-100 rounded-full px-3 py-1 text-xs font-medium">
                              Mild acne
                            </span>
                            <span className="bg-amber-50 text-amber-700 border border-amber-100 rounded-full px-3 py-1 text-xs font-medium">
                              Uneven texture
                            </span>
                            <span className="bg-amber-50 text-amber-700 border border-amber-100 rounded-full px-3 py-1 text-xs font-medium">
                              Hyperpigmentation
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-slate-50/50 border-t border-slate-100 p-4">
                      <Button variant="outline" className="w-full bg-white border-slate-200 text-slate-700 hover:bg-slate-50">
                        View Detailed Report
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="border-slate-200 shadow-sm bg-white">
                    <CardHeader className="border-b border-slate-100 pb-4">
                      <CardTitle className="text-lg text-slate-900">Hair Analysis</CardTitle>
                      <CardDescription>Latest trichological assessment results</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <p className="text-xs text-slate-500 uppercase">Hair Type</p>
                            <p className="font-medium text-slate-900">{profileData.hairType}</p>
                          </div>

                          <div className="space-y-1">
                            <p className="text-xs text-slate-500 uppercase">Texture</p>
                            <p className="font-medium text-slate-900">Medium/Coarse</p>
                          </div>

                          <div className="space-y-1">
                            <p className="text-xs text-slate-500 uppercase">Density</p>
                            <p className="font-medium text-slate-900">Medium</p>
                          </div>

                          <div className="space-y-1">
                            <p className="text-xs text-slate-500 uppercase">Porosity</p>
                            <p className="font-medium text-slate-900">High</p>
                          </div>
                        </div>

                        <div className="space-y-2 pt-2 border-t border-slate-100">
                          <h3 className="text-sm font-medium text-slate-900">Key Concerns</h3>
                          <div className="flex flex-wrap gap-2">
                            <span className="bg-amber-50 text-amber-700 border border-amber-100 rounded-full px-3 py-1 text-xs font-medium">
                              Dryness
                            </span>
                            <span className="bg-amber-50 text-amber-700 border border-amber-100 rounded-full px-3 py-1 text-xs font-medium">
                              Frizz
                            </span>
                            <span className="bg-amber-50 text-amber-700 border border-amber-100 rounded-full px-3 py-1 text-xs font-medium">
                              Split ends
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-slate-50/50 border-t border-slate-100 p-4">
                      <Button variant="outline" className="w-full bg-white border-slate-200 text-slate-700 hover:bg-slate-50">
                        View Detailed Report
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                <div className="mt-8 text-center">
                  <Button size="lg" className="px-8 bg-primary hover:bg-primary/90 shadow-md">
                    Start New Analysis
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="history">
                <Card className="border-slate-200 shadow-sm bg-white">
                  <CardHeader className="border-b border-slate-100 pb-4">
                    <CardTitle className="text-lg text-slate-900">Analysis History</CardTitle>
                    <CardDescription>Your previous skin and hair clinical records</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-slate-900">Skin Analysis</h3>
                          <p className="text-sm text-slate-500">April 5, 2025</p>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">
                          Combination skin with mild acne concerns
                        </p>
                        <Button variant="link" className="p-0 h-auto text-sm text-primary font-medium">
                          View Report
                        </Button>
                      </div>

                      <div className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-slate-900">Hair Analysis</h3>
                          <p className="text-sm text-slate-500">April 5, 2025</p>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">
                          Type 3B curly hair with dryness concerns
                        </p>
                        <Button variant="link" className="p-0 h-auto text-sm text-primary font-medium">
                          View Report
                        </Button>
                      </div>

                      <div className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-slate-900">Skin Analysis</h3>
                          <p className="text-sm text-slate-500">March 2, 2025</p>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">
                          Combination skin with moderate acne concerns
                        </p>
                        <Button variant="link" className="p-0 h-auto text-sm text-primary font-medium">
                          View Report
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="appointments">
                <Card className="border-slate-200 shadow-sm bg-white">
                  <CardHeader className="border-b border-slate-100 pb-4">
                    <CardTitle className="text-lg text-slate-900">Upcoming Appointments</CardTitle>
                    <CardDescription>Your scheduled consultations with specialists</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div className="border-b border-slate-100 pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-slate-900">Dr. Emma Wilson</h3>
                          <div className="bg-green-50 text-green-700 border border-green-200 px-2 py-1 rounded text-xs font-medium">
                            Confirmed
                          </div>
                        </div>
                        <p className="text-sm text-slate-500 mb-1">
                          Video Consultation - Dermatologist
                        </p>
                        <p className="text-sm font-bold text-slate-900 mb-3">
                          April 12, 2025 at 10:00 AM
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="border-slate-200 text-slate-700">
                            Reschedule
                          </Button>
                          <Button variant="outline" size="sm" className="border-slate-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-200">
                            Cancel
                          </Button>
                        </div>
                      </div>

                      <div className="text-center py-4">
                        <p className="text-slate-500 mb-4">No other upcoming appointments</p>
                        <Button className="bg-primary hover:bg-primary/90">
                          Book New Appointment
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings">
                <Card className="border-slate-200 shadow-sm bg-white">
                  <CardHeader className="border-b border-slate-100 pb-4">
                    <CardTitle className="text-lg text-slate-900">Account Settings</CardTitle>
                    <CardDescription>Manage your account preferences and security</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-8">
                      <div className="space-y-4">
                        <h3 className="font-medium text-slate-900 text-lg">Personal Information</h3>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="fullName" className="text-slate-700">Full Name</Label>
                            <Input
                              id="fullName"
                              value={profileData.fullName}
                              readOnly={!isEditing}
                              className="bg-slate-50 border-slate-200"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-slate-700">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={profileData.email}
                              readOnly={!isEditing}
                              className="bg-slate-50 border-slate-200"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="phone" className="text-slate-700">Phone</Label>
                            <Input
                              id="phone"
                              value={profileData.phone}
                              readOnly={!isEditing}
                              className="bg-slate-50 border-slate-200"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-medium text-slate-900 text-lg flex items-center">
                          <Lock className="h-4 w-4 mr-2" />
                          Security
                        </h3>

                        <Button variant="outline" className="border-slate-200 text-slate-700">
                          Change Password
                        </Button>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-medium text-slate-900 text-lg flex items-center">
                          <Bell className="h-4 w-4 mr-2" />
                          Notifications
                        </h3>

                        <div className="space-y-3 bg-slate-50 p-4 rounded-lg border border-slate-100">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="email-notifications" className="text-slate-700 cursor-pointer">Email Notifications</Label>
                            <input
                              type="checkbox"
                              id="email-notifications"
                              className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                              defaultChecked
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <Label htmlFor="appointment-reminders" className="text-slate-700 cursor-pointer">Appointment Reminders</Label>
                            <input
                              type="checkbox"
                              id="appointment-reminders"
                              className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                              defaultChecked
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <Label htmlFor="marketing-emails" className="text-slate-700 cursor-pointer">Marketing Emails</Label>
                            <input
                              type="checkbox"
                              id="marketing-emails"
                              className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
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
