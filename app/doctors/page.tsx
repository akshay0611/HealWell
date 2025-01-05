'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TopBar } from "@/components/top-bar";
import { Navigation } from "@/components/navigation";
import { Search, Star } from 'lucide-react';
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
}

const doctors: Doctor[] = [
  { id: 1, name: "Dr. John Smith", specialty: "Cardiologist - Heart & Vascular", rating: 4.8, image: "/images/teammember_1.jpg" },
  { id: 2, name: "Dr. Michael Wilson", specialty: "General Practitioner - Family Medicine", rating: 4.9, image: "/images/teammember_2.avif" },
  { id: 3, name: "Dr. Robert Brown", specialty: "Senior Physician - Internal Medicine", rating: 4.7, image: "/images/teammember_3.jpg" },
  { id: 4, name: "Dr. Sarah Johnson", specialty: "Dentist - Dental Care", rating: 4.6, image: "/images/teammember_4.avif" }
];

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">
      {/* TopBar and Navigation */}
      <TopBar />
      <Navigation />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="py-24 md:py-32 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center"
      >
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Meet Our <span className="text-blue-300">Doctors</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl mb-6"
          >
            Dedicated healthcare professionals providing personalized care
          </motion.p>
        </div>
      </motion.section>

      {/* Doctors Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-16"
      >
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search doctors or specialties"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <Image
                src={doctor.image}
                alt={`Picture of ${doctor.name}`}
                width={300}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-blue-900 mb-2">{doctor.name}</h2>
                <p className="text-gray-600 mb-4">{doctor.specialty}</p>
                <div className="flex items-center">
                  <Star className="text-yellow-400 mr-1" />
                  <span className="text-gray-700">{doctor.rating.toFixed(1)}</span>
                </div>
                <Button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-200">
                  Book Appointment
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      <Footer/>
    </div>
  );
}
