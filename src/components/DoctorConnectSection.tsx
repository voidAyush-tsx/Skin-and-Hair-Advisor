
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MessageCircle, Star, Video } from 'lucide-react';

const doctors = [
  {
    id: 1,
    name: 'Dr. Emma Wilson',
    specialty: 'Dermatologist',
    rating: 4.9,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    expertise: ['Acne', 'Eczema', 'Anti-aging']
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Trichologist',
    rating: 4.8,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    expertise: ['Hair Loss', 'Scalp Conditions', 'Hair Growth']
  },
  {
    id: 3,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cosmetic Dermatologist',
    rating: 4.7,
    reviews: 86,
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    expertise: ['Pigmentation', 'Facial Treatments', 'Skincare']
  }
];

const DoctorConnectSection = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Connect with Specialists
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Get personalized advice from certified dermatologists and hair care experts
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {doctors.map(doctor => (
            <Card key={doctor.id} className="overflow-hidden">
              <div className="aspect-video relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                  <Avatar className="h-10 w-10 border-2 border-white">
                    <AvatarImage src={doctor.image} alt={doctor.name} />
                    <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="text-white">
                    <p className="font-bold">{doctor.name}</p>
                    <p className="text-sm">{doctor.specialty}</p>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                    <span className="font-medium">{doctor.rating}</span>
                    <span className="text-muted-foreground text-sm ml-1">({doctor.reviews} reviews)</span>
                  </div>
                </div>
                
                <h3 className="font-bold mb-2">Expertise</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {doctor.expertise.map(skill => (
                    <Badge key={skill} variant="outline">{skill}</Badge>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <a href="/connect-doctor">View All Specialists</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DoctorConnectSection;
