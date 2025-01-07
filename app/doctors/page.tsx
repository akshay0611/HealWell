'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TopBar } from "@/components/top-bar";
import { Navigation } from "@/components/navigation";
import { Search, Star, Calendar, Phone, Mail, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from 'next/image';
import Footer from "@/components/footer"

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  image: string;
  availability: string;
  phone: string;
  email: string;
  education: string[];
  experience: string;
  specializations: string[];
  bio: string;
}

const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. John Smith",
    specialty: "Cardiologist - Heart & Vascular",
    rating: 4.8,
    image: "/images/teammember_1.jpg",
    availability: "Mon, Wed, Fri",
    phone: "+1 (555) 123-4567",
    email: "john.smith@healwell.com",
    education: [
      "MD from Johns Hopkins University School of Medicine",
      "Residency in Internal Medicine at Mayo Clinic",
      "Fellowship in Cardiology at Cleveland Clinic"
    ],
    experience: "15+ years",
    specializations: ["Interventional Cardiology", "Echocardiography", "Preventive Cardiology"],
    bio: "Dr. John Smith is a board-certified cardiologist with over 15 years of experience in diagnosing and treating complex heart conditions. He is passionate about preventive cardiology and has published numerous research papers on innovative cardiac care techniques."
  },
  {
    id: 2,
    name: "Dr. Michael Wilson",
    specialty: "General Practitioner - Family Medicine",
    rating: 4.9,
    image: "/images/teammember_2.avif",
    availability: "Tue, Thu, Sat",
    phone: "+1 (555) 234-5678",
    email: "michael.wilson@healwell.com",
    education: [
      "MD from Harvard Medical School",
      "Residency in Family Medicine at University of California, San Francisco"
    ],
    experience: "10+ years",
    specializations: ["Preventive Medicine", "Chronic Disease Management", "Pediatric Care"],
    bio: "Dr. Michael Wilson is a dedicated family physician with a holistic approach to patient care. He specializes in managing chronic diseases and is known for his excellent rapport with patients of all ages."
  },
  {
    id: 3,
    name: "Dr. Robert Brown",
    specialty: "Senior Physician - Internal Medicine",
    rating: 4.7,
    image: "/images/teammember_3.jpg",
    availability: "Mon, Tue, Thu",
    phone: "+1 (555) 345-6789",
    email: "robert.brown@healwell.com",
    education: [
      "MD from Stanford University School of Medicine",
      "Residency in Internal Medicine at Massachusetts General Hospital"
    ],
    experience: "20+ years",
    specializations: ["Geriatric Medicine", "Endocrinology", "Rheumatology"],
    bio: "Dr. Robert Brown is a highly experienced internist with a special focus on geriatric care. He is committed to providing comprehensive, patient-centered care and has received numerous awards for his contributions to internal medicine."
  },
  {
    id: 4,
    name: "Dr. Sarah Johnson",
    specialty: "Dentist - Dental Care",
    rating: 4.6,
    image: "/images/teammember_4.avif",
    availability: "Wed, Fri, Sat",
    phone: "+1 (555) 456-7890",
    email: "sarah.johnson@healwell.com",
    education: [
      "DDS from University of Michigan School of Dentistry",
      "Advanced Education in General Dentistry at UCLA"
    ],
    experience: "8+ years",
    specializations: ["Cosmetic Dentistry", "Orthodontics", "Pediatric Dentistry"],
    bio: "Dr. Sarah Johnson is a skilled dentist known for her gentle approach and expertise in cosmetic dentistry. She is dedicated to providing a comfortable and positive dental experience for patients of all ages."
  }
];

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">
      <TopBar />
      <Navigation />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative py-24 md:py-32 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-blue-900 opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Meet Our <span className="text-blue-300">Expert Doctors</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl mb-8 max-w-2xl mx-auto"
          >
            Dedicated healthcare professionals providing personalized care with years of experience and expertise in various medical fields.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative max-w-md w-full">
              <Input
                type="text"
                placeholder="Search doctors or specialties"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 w-full rounded-full border-none focus:ring-2 focus:ring-blue-300 bg-white/90 backdrop-blur-sm text-blue-900 placeholder-blue-400"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
            </div>
          </motion.div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </motion.section>

      {/* Doctors Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-16"
      >
        {/* Doctors Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredDoctors.map((doctor) => (
            <motion.div
              key={doctor.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col"
            >
              <div className="flex flex-col items-center p-6">
                <div className="relative w-40 h-40 mb-4">
                  <Image
                    src={doctor.image}
                    alt={`Picture of ${doctor.name}`}
                    fill
                    className="rounded-full object-cover border-4 border-blue-100"
                  />
                </div>
                <h2 className="text-2xl font-semibold text-blue-900 text-center mb-1">{doctor.name}</h2>
                <p className="text-blue-600 text-sm text-center">{doctor.specialty}</p>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Star className="text-yellow-400 mr-1" />
                    <span className="text-gray-700 font-semibold">{doctor.rating.toFixed(1)}</span>
                  </div>
                  <div className="text-blue-600 text-sm font-medium">{doctor.availability}</div>
                </div>
                <Button 
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200"
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  View Profile
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Doctor Profile Modal */}
      <AnimatePresence>
        {selectedDoctor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 15 }}
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-3xl w-full m-4"
            >
              <div className="flex flex-col md:flex-row items-start mb-6">
                <Image
                  src={selectedDoctor.image}
                  alt={`Picture of ${selectedDoctor.name}`}
                  width={200}
                  height={200}
                  className="rounded-xl mr-6 mb-4 md:mb-0"
                />
                <div>
                  <h2 className="text-3xl font-bold text-blue-900 mb-2">{selectedDoctor.name}</h2>
                  <p className="text-blue-600 mb-2">{selectedDoctor.specialty}</p>
                  <div className="flex items-center mb-2">
                    <Star className="text-yellow-400 mr-1" />
                    <span className="text-gray-700 font-semibold">{selectedDoctor.rating.toFixed(1)}</span>
                  </div>
                  <p className="text-gray-600 mb-2">Experience: {selectedDoctor.experience}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Calendar className="text-blue-500 mr-3" />
                      <span>Available: {selectedDoctor.availability}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="text-blue-500 mr-3" />
                      <span>{selectedDoctor.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="text-blue-500 mr-3" />
                      <span>{selectedDoctor.email}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">Education</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedDoctor.education.map((edu, index) => (
                      <li key={index} className="text-gray-600">{edu}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-2">Specializations</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedDoctor.specializations.map((spec, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-2">About</h3>
                <p className="text-gray-600">{selectedDoctor.bio}</p>
              </div>
              <div className="flex justify-end">
                <Button 
                  variant="outline"
                  onClick={() => setSelectedDoctor(null)}
                  className="border-blue-500 text-blue-500 hover:bg-blue-50"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer/>
    </div>
  );
}