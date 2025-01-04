import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Hospital } from 'lucide-react'; 

export function Hero() {
  return (
    <div className="relative bg-gradient-to-r from-blue-50 to-blue-100 overflow-hidden">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
           
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Hospital className="w-8 h-8 text-blue-500" />
            </div>

            <h1 className="text-5xl font-bold leading-tight">
              World-Class Healthcare Services in 
              <span className="text-blue-500"> India.</span>
            </h1>
            <p className="text-gray-600 max-w-lg">
              Located in the heart of India, our hospital is dedicated to
              providing affordable and comprehensive medical care to people
              across the nation. With advanced technology, expert doctors,
              and compassionate staff, we strive to meet the unique healthcare
              needs of every individual.
            </p>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#0B1B3F]">
                Trusted by Millions Across the Country.
              </h3>
              {/* Making the phone number clickable with hover effect */}
              <a 
                href="tel:+919876543210" 
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                For Immediate Assistance, Call Us: +91 98765 43210
              </a>
            </div>
            <div className="flex space-x-4">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6">
                Book an Appointment
              </Button>
              <Button
                variant="outline"
                className="border-[#0B1B3F] text-[#0B1B3F] hover:bg-[#0B1B3F] hover:text-white"
              >
                Explore Our Services
              </Button>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/images/hero_1.jpg"
              alt="Team of Indian Medical Professionals"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
