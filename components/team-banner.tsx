import { Button } from "@/components/ui/button";
import Image from "next/image";

export function TeamBanner() {
  return (
    <div className="bg-[#0B1B3F] text-white">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 items-center">
        <div className="relative h-[200px] md:h-[300px]">
  <Image
    src="/images/team_1.jpg"
    alt="Medical Team"
    fill
    className="object-cover rounded-lg"
  />
</div>

          <div className="p-8 md:p-16 flex flex-col justify-between h-full">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">
                Meet Our Expert Medical Team.
              </h2>
              <p className="text-gray-300">
                Our dedicated professionals work tirelessly to provide top-notch 
                medical services, ensuring every detail contributes to the highest 
                quality care.
              </p>
            </div>
            <div className="mt-8">
              <Button
                className="bg-white text-[#0B1B3F] hover:bg-gray-100"
                size="lg"
              >
                Book an Appointment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
