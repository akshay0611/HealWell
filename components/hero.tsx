import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Hero() {
  return (
    <div className="relative bg-gradient-to-r from-blue-50 to-blue-100 overflow-hidden">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg" />
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
              <p className="text-blue-600">For Immediate Assistance, Call Us: +91 98765 43210</p>
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
              src="/medical-team-india.svg"
              alt="Team of Indian Medical Professionals"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-8 -left-8">
              <Image
                src="/indian-medical-icon.svg"
                alt="Healthcare Icon India"
                width={100}
                height={100}
                className="w-24 h-24"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
