import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MessageSquare, Star } from 'lucide-react';

const doctors = [
  {
    id: 1,
    name: 'Dr. Emma Wilson',
    specialty: 'Board Certified Dermatologist',
    rating: 4.9,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    expertise: ['Acne', 'Eczema', 'Anti-aging']
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Clinical Trichologist',
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

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

const DoctorConnectSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
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
              Consult Certified Specialists
            </h2>
            <p className="max-w-[700px] text-slate-600 md:text-lg">
              Get expert second opinions and personalized treatment plans
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {doctors.map((doctor) => (
            <motion.div key={doctor.id} variants={itemVariants}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="overflow-hidden border-slate-200 shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <div className="flex p-6 gap-4">
                    <Avatar className="h-16 w-16 border border-slate-100">
                      <AvatarImage src={doctor.image} alt={doctor.name} className="object-cover" />
                      <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-900 truncate">{doctor.name}</h3>
                      <p className="text-sm text-primary font-medium truncate">{doctor.specialty}</p>
                      <div className="flex items-center mt-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                        <span className="text-sm font-medium text-slate-700">{doctor.rating}</span>
                        <span className="text-xs text-slate-500 ml-1">({doctor.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <CardContent className="px-6 pb-6 pt-0">
                    <h3 className="font-bold mb-2 text-sm uppercase tracking-wider text-muted-foreground">Expertise</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {doctor.expertise.map(skill => (
                        <Badge key={skill} variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200 font-normal transition-colors">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" size="sm" className="w-full border-slate-200 text-slate-700 hover:bg-slate-50 transition-all duration-200 hover:-translate-y-0.5">
                        <Calendar className="h-4 w-4 mr-2" />
                        Book
                      </Button>
                      <Button size="sm" className="w-full bg-primary hover:bg-primary/90 transition-all duration-200 hover:-translate-y-0.5">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Button variant="link" className="text-primary group" asChild>
            <Link to="/connect-doctor">
              View All Specialists
              <motion.span
                className="inline-block ml-1"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                →
              </motion.span>
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default DoctorConnectSection;
