import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Calendar, MessageCircle, Star, Filter, Map, Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const doctors = [
	{
		id: 1,
		name: 'Dr. Emma Wilson',
		specialty: 'Dermatologist',
		rating: 4.9,
		reviews: 124,
		availability: 'Today',
		image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
		expertise: ['Acne', 'Eczema', 'Anti-aging', 'Skincare'],
		location: 'New York, NY',
		bio: "Board-certified dermatologist with over 10 years of experience in treating various skin conditions and aesthetic procedures.",
		consultationType: ['Video', 'In-person']
	},
	{
		id: 2,
		name: 'Dr. Michael Chen',
		specialty: 'Trichologist',
		rating: 4.8,
		reviews: 98,
		availability: 'Tomorrow',
		image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
		expertise: ['Hair Loss', 'Scalp Conditions', 'Hair Growth', 'Hair Transplant'],
		location: 'Los Angeles, CA',
		bio: "Specialized in hair and scalp disorders with a focus on natural treatments and prevention strategies.",
		consultationType: ['Video', 'Chat']
	},
	{
		id: 3,
		name: 'Dr. Sarah Johnson',
		specialty: 'Cosmetic Dermatologist',
		rating: 4.7,
		reviews: 86,
		availability: 'Today',
		image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
		expertise: ['Pigmentation', 'Facial Treatments', 'Skincare', 'Laser Therapy'],
		location: 'Chicago, IL',
		bio: "Focused on cosmetic dermatology with expertise in laser treatments, injectables, and advanced skincare.",
		consultationType: ['Video', 'In-person', 'Chat']
	},
	{
		id: 4,
		name: 'Dr. James Roberts',
		specialty: 'Hair Specialist',
		rating: 4.6,
		reviews: 74,
		availability: 'In 2 days',
		image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
		expertise: ['Curly Hair', 'Hair Coloring', 'Hair Treatment', 'Hair Health'],
		location: 'Miami, FL',
		bio: "Expert in all types of hair textures with special focus on curly and textured hair care and treatment.",
		consultationType: ['Video', 'In-person']
	},
	{
		id: 5,
		name: 'Dr. Amelia Patel',
		specialty: 'Dermatopathologist',
		rating: 4.9,
		reviews: 112,
		availability: 'Tomorrow',
		image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
		expertise: ['Skin Analysis', 'Skin Cancer', 'Rashes', 'Allergies'],
		location: 'Boston, MA',
		bio: "Specialized in diagnosing skin diseases through microscopic examination and developing targeted treatment plans.",
		consultationType: ['Video', 'Chat']
	},
	{
		id: 6,
		name: 'Dr. David Wilson',
		specialty: 'Aesthetic Dermatologist',
		rating: 4.7,
		reviews: 91,
		availability: 'Today',
		image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
		expertise: ['Botox', 'Fillers', 'Skin Rejuvenation', 'Anti-aging'],
		location: 'Seattle, WA',
		bio: "Focused on aesthetic procedures that enhance natural beauty while maintaining a healthy skin barrier.",
		consultationType: ['In-person', 'Video']
	}
];

const ConnectDoctor = () => {
	const { toast } = useToast();
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);

	const filteredDoctors = doctors.filter(doctor => {
		const matchesSearch = searchTerm === '' ||
			doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			doctor.expertise.some(e => e.toLowerCase().includes(searchTerm.toLowerCase())) ||
			doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
			doctor.location.toLowerCase().includes(searchTerm.toLowerCase());

		const matchesSpecialty = selectedSpecialty === null ||
			doctor.specialty === selectedSpecialty;

		return matchesSearch && matchesSpecialty;
	});

	const specialties = Array.from(new Set(doctors.map(doctor => doctor.specialty)));

	return (
		<div className="min-h-screen flex flex-col bg-background font-sans selection:bg-primary/20 animate-fade-in-up">
			<main className="flex-1 py-16 md:py-24">
				<div className="container px-4 md:px-6">
					<div className="max-w-5xl mx-auto">
						<div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
							<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
								Connect with Specialists
							</h1>
							<p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
								Find and consult with top dermatologists and hair specialists personalized to your needs
							</p>
						</div>

						<div className="mb-8">
							<div className="flex flex-col md:flex-row gap-4 mb-6">
								<div className="relative flex-1">
									<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
									<Input
										placeholder="Search doctors, specialties, or conditions..."
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
										className="pl-9"
									/>
								</div>

								<div className="flex gap-2">
									<Button variant="outline" className="inline-flex items-center gap-1">
										<Map className="h-4 w-4" />
										Location
									</Button>
									<Button variant="outline" className="inline-flex items-center gap-1">
										<Filter className="h-4 w-4" />
										Filters
									</Button>
								</div>
							</div>

							<div className="flex gap-2 overflow-x-auto pb-2 mb-4">
								<Button
									variant={selectedSpecialty === null ? "default" : "outline"}
									size="sm"
									onClick={() => setSelectedSpecialty(null)}
								>
									All Specialists
								</Button>
								{specialties.map(specialty => (
									<Button
										key={specialty}
										variant={selectedSpecialty === specialty ? "default" : "outline"}
										size="sm"
										onClick={() => setSelectedSpecialty(specialty)}
									>
										{specialty}
									</Button>
								))}
							</div>

							<Tabs defaultValue="grid" className="w-full">
								<div className="flex justify-end mb-4">
									<TabsList>
										<TabsTrigger value="grid" className="px-3">
											<div className="grid grid-cols-3 gap-0.5 w-4 h-4">
												<div className="bg-current rounded-sm"></div>
												<div className="bg-current rounded-sm"></div>
												<div className="bg-current rounded-sm"></div>
												<div className="bg-current rounded-sm"></div>
												<div className="bg-current rounded-sm"></div>
												<div className="bg-current rounded-sm"></div>
												<div className="bg-current rounded-sm"></div>
												<div className="bg-current rounded-sm"></div>
												<div className="bg-current rounded-sm"></div>
											</div>
										</TabsTrigger>
										<TabsTrigger value="list" className="px-3">
											<div className="flex flex-col gap-0.5 w-4 h-4 justify-center">
												<div className="h-0.5 w-full bg-current rounded-sm"></div>
												<div className="h-0.5 w-full bg-current rounded-sm"></div>
												<div className="h-0.5 w-full bg-current rounded-sm"></div>
											</div>
										</TabsTrigger>
									</TabsList>
								</div>

								<TabsContent value="grid">
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
										{filteredDoctors.map(doctor => (
											<Card key={doctor.id} className="overflow-hidden h-full">
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
														<Badge variant="outline" className="text-green-600 bg-green-50 border-green-200">
															Available {doctor.availability}
														</Badge>
													</div>

													<p className="text-sm text-muted-foreground mb-4">
														{doctor.bio}
													</p>

													<h3 className="font-bold mb-2 text-sm">Expertise</h3>
													<div className="flex flex-wrap gap-2 mb-4">
														{doctor.expertise.map(skill => (
															<Badge key={skill} variant="outline">{skill}</Badge>
														))}
													</div>

													<div className="text-sm flex items-center text-muted-foreground mb-4">
														<Map className="h-4 w-4 mr-1" />
														{doctor.location}
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
								</TabsContent>

								<TabsContent value="list">
									<div className="space-y-4">
										{filteredDoctors.map(doctor => (
											<Card key={doctor.id}>
												<CardContent className="p-6">
													<div className="flex flex-col md:flex-row gap-6">
														<div className="flex-shrink-0">
															<Avatar className="h-24 w-24">
																<AvatarImage src={doctor.image} alt={doctor.name} />
																<AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
															</Avatar>
														</div>

														<div className="flex-1 space-y-3">
															<div className="flex flex-col md:flex-row md:items-center md:justify-between">
																<div>
																	<h3 className="font-bold text-lg">{doctor.name}</h3>
																	<p className="text-muted-foreground">{doctor.specialty}</p>
																</div>

																<div className="flex items-center mt-2 md:mt-0">
																	<Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
																	<span className="font-medium">{doctor.rating}</span>
																	<span className="text-muted-foreground text-sm ml-1">({doctor.reviews} reviews)</span>
																</div>
															</div>

															<p className="text-sm text-muted-foreground">
																{doctor.bio}
															</p>

															<div className="flex flex-wrap gap-2">
																{doctor.expertise.map(skill => (
																	<Badge key={skill} variant="outline">{skill}</Badge>
																))}
															</div>

															<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
																<div className="flex items-center">
																	<Map className="h-4 w-4 mr-1 text-muted-foreground" />
																	<span className="text-sm text-muted-foreground">{doctor.location}</span>
																	<Badge variant="outline" className="ml-2 text-green-600 bg-green-50 border-green-200">
																		Available {doctor.availability}
																	</Badge>
																</div>

																<div className="flex gap-3">
																	<Button variant="outline" size="sm">
																		<Calendar className="h-4 w-4 mr-2" />
																		Book
																	</Button>
																	<Button variant="outline" size="sm">
																		<MessageCircle className="h-4 w-4 mr-2" />
																		Message
																	</Button>
																</div>
															</div>
														</div>
													</div>
												</CardContent>
											</Card>
										))}
									</div>
								</TabsContent>
							</Tabs>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default ConnectDoctor;
