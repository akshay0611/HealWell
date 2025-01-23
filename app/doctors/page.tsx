'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TopBar } from "@/components/top-bar";
import { Navigation } from "@/components/navigation";
import { Search, Star, Calendar, Phone, Mail, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from 'next/image';
import Footer from "@/components/footer";
import ChatComponent from "@/components/ChatComponent"; 

interface Doctor {
  _id: string;
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

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/doctor');
        const data = await response.json();
  
        if (response.ok) {
          const doctors: Doctor[] = data.data; // Assert the type of data.data
          setDoctors(doctors);
          const uniqueSpecialties = [...new Set(doctors.map((doctor) => doctor.specialty))];
          setSpecialties(uniqueSpecialties); // No error here
        } else {
          throw new Error(data.message || 'Failed to fetch doctors');
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchDoctors();
  }, []);
  

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty ? doctor.specialty === selectedSpecialty : true;

    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
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
            className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4"
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
            <select
              className="pl-4 pr-8 py-3 w-full max-w-xs rounded-full border-none focus:ring-2 focus:ring-blue-300 bg-white/90 backdrop-blur-sm text-blue-900"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
              <option value="">All Specialties</option>
              {specialties.map((specialty, index) => (
                <option key={index} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </motion.div>
        </div>
      </motion.section>

      {/* Doctors Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-16"
      >
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-6">
            <span className="loader">Loading...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex justify-center py-6 text-red-600">
            <span>{error}</span>
          </div>
        )}

        {/* Doctors Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredDoctors.map((doctor) => (
            <motion.div
              key={doctor._id}
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

      <Footer />
      <ChatComponent /> 

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
                      <a href={`tel:${selectedDoctor.phone}`} className="text-black-700 hover:underline">
                        {selectedDoctor.phone}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Mail className="text-blue-500 mr-3" />
                      <a href={`mailto:${selectedDoctor.email}`} className="text-black-700 hover:underline">
                        {selectedDoctor.email}
                      </a>
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
    </div>
  );
}