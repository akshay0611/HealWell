'use client'

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Facebook, Twitter, Linkedin } from "lucide-react"
import Link from "next/link" // Import Link component from Next.js
import { ArrowRight } from 'lucide-react'; // Import the ArrowRight icon

// Define the type for a team member
interface TeamMember {
  name: string;
  specialty: string;
  image: string;
}

const OurTeamMember = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]); // Use specific type
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Fetch data from the backend
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch('/api/doctor');
        const data = await response.json();

        if (data.success) {
          setTeamMembers(data.data);
        } else {
          setError('Failed to load team members');
        }
      } catch {
        setError('An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>{error}</div>; // Show error message
  }

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-white overflow-hidden py-24">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-grid-blue-100/25 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-blue-600 font-semibold uppercase tracking-wide mb-2 flex items-center justify-center gap-2">
            <span className="w-6 h-px bg-blue-600"></span>
            OUR TEAM MEMBER
            <span className="w-6 h-px bg-blue-600"></span>
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mt-2 mb-6">
            Meet Our Specialists This<br />Doctor Meeting
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src={member.image} // The backend provides the image URL
                  alt={`Photo of ${member.name}`}
                  width={400}
                  height={500}
                  className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Overlay with Social Links */}
                <div className="absolute inset-0 bg-blue-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex gap-4">
                    <a
                      href="#"
                      aria-label={`Facebook profile of ${member.name}`}
                      className="p-2 bg-white rounded-full text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a
                      href="#"
                      aria-label={`Twitter profile of ${member.name}`}
                      className="p-2 bg-white rounded-full text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a
                      href="#"
                      aria-label={`LinkedIn profile of ${member.name}`}
                      className="p-2 bg-white rounded-full text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="text-center mt-4">
                <h3 className="text-xl font-semibold text-blue-900">{member.name}</h3>
                <p className="text-blue-600 font-medium">{member.specialty}</p> {/* Displaying specialty from the backend */}
              </div>
            </motion.div>
          ))}
        </div>

        {/* "Meet Our Team" Button */}
        <div className="text-center mt-12">
  <Link
    href="/doctors"
    className="px-6 py-3 bg-blue-600 text-white font-semibold text-lg rounded-full hover:bg-blue-700 transition-colors inline-flex items-center justify-center gap-2"
  >
    Discover Our Experts
    <ArrowRight className="w-5 h-5 ml-2" style={{ color: '#3b82f6' }} />
  </Link>
</div>
      </div>
    </section>
  );
};

export default OurTeamMember;