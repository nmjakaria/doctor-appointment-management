'use server';

export async function getDoctors(query = "", specialty = "all") {
  // Simulated database
  const doctors = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      hospital: "St. Mary's Medical Center",
      location: "San Francisco, CA",
      experience: "12 years",
      rating: 4.9,
      reviews: 128,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      price: 150
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      specialty: "Neurology",
      hospital: "Grace General Hospital",
      location: "San Francisco, CA",
      experience: "8 years",
      rating: 4.7,
      reviews: 94,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      price: 200
    },
    {
      id: "3",
      name: "Dr. Emily Wilson",
      specialty: "Dermatology",
      hospital: "City Health Clinic",
      location: "Oakland, CA",
      experience: "10 years",
      rating: 4.8,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      price: 120
    },
    {
      id: "4",
      name: "Dr. James Lee",
      specialty: "Orthopedics",
      hospital: "Pacific Ortho Institute",
      location: "San Mateo, CA",
      experience: "15 years",
      rating: 4.9,
      reviews: 210,
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      price: 180
    },
  ];

  let filtered = doctors;
  if (query) {
    filtered = filtered.filter(d => 
      d.name.toLowerCase().includes(query.toLowerCase()) || 
      d.hospital.toLowerCase().includes(query.toLowerCase())
    );
  }
  if (specialty !== "all") {
    filtered = filtered.filter(d => d.specialty.toLowerCase() === specialty.toLowerCase());
  }

  return filtered;
}
