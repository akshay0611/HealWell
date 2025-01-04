import { Button } from "@/components/ui/button";
import { Headphones, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function AboutSection() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="relative h-[400px] md:h-[500px]">
            <Image
              src="/placeholder.svg"
              alt="Medical Team"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="absolute bottom-12 -right-6 bg-[#0B1B3F] text-white p-6 rounded-full">
            <div className="text-center">
              <div className="text-3xl font-bold">26+</div>
              <div className="text-sm">Years of Experience</div>
            </div>
          </div>
          <div className="absolute -bottom-12 left-12 w-48 h-48">
            <Image
              src="/placeholder.svg"
              alt="Medical Care"
              width={200}
              height={200}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 bg-blue-500 text-white py-8 px-4 rounded-r-lg">
            <div
              className="vertical-text transform -rotate-180"
              style={{ writingMode: "vertical-rl" }}
            >
              How We Work
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <div className="text-blue-500 font-semibold mb-4">ABOUT US</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Over 26 Years of Providing Exceptional Medical Care.
            </h2>
            <p className="text-gray-600 mb-8">
              We are proud to work with forward-thinking medical institutions, 
              including some of the world&apos;s leading brands. Our mission is 
              to provide safe and comfortable healthcare solutions for everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-100 rounded-lg">
                  <Headphones className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold">Client Support</h3>
              </div>
              <p className="text-gray-600">
                Our team ensures you receive dedicated assistance for all your healthcare needs.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-100 rounded-lg">
                  <UserRound className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold">Doctor Support</h3>
              </div>
              <p className="text-gray-600">
                Our experienced medical professionals are here to guide you every step of the way.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <p className="text-gray-600">
                Discover more about our medical services and team{" "}
                <Link href="#" className="text-blue-500 hover:underline">
                  READ MORE +
                </Link>
              </p>
            </div>

            <Button className="bg-blue-500 hover:bg-blue-600" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
