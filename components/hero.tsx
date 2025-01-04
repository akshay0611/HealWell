import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Hero() {
  return (
    <div className="relative bg-gradient-to-r from-blue-50 to-blue-100 overflow-hidden">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg" />
            <h1 className="text-5xl font-bold leading-tight">
              We Hospital Doctors Patients{" "}
              <span className="text-blue-500">Service.</span>
            </h1>
            <p className="text-gray-600 max-w-lg">
              Medical ers piciatis unde omnis iste natus this the word medical this
              mountains, far from the countries Vokalia and, live the docor white
              teeth sitting on a dental for best medical.
            </p>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#0B1B3F]">
                Receive Medical Service.
              </h3>
              <p className="text-blue-600">Call Us at: (+2) 56 54 1453</p>
            </div>
            <div className="flex space-x-4">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6">
                Contact Now
              </Button>
              <Button
                variant="outline"
                className="border-[#0B1B3F] text-[#0B1B3F] hover:bg-[#0B1B3F] hover:text-white"
              >
                Discover More
              </Button>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/placeholder.svg"
              alt="Medical Professionals"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-8 -left-8">
              <Image
                src="/placeholder.svg"
                alt="Medical Icon"
                width={100}
                height={100}
                className="w-24 h-24"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

