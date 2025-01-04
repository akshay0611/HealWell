import React from "react";

const OurBestService = () => {
  const services = [
    { icon: "💊", title: "Pharmacology", description: "Expert pharmaceutical care for all your medication needs." },
    { icon: "🚑", title: "Orthopedics", description: "Comprehensive orthopedic care for bone and joint health." },
    { icon: "❤️", title: "Hematology", description: "Advanced treatment for blood-related disorders and conditions." },
    { icon: "👨‍⚕️", title: "Plastic Surgery", description: "Highly skilled plastic surgeons offering reconstructive and cosmetic procedures." },
    { icon: "🧠", title: "Neurology", description: "Specialized care for brain, spinal cord, and nervous system disorders." },
    { icon: "👁️", title: "Ophthalmology", description: "State-of-the-art eye care and vision treatments." },
    { icon: "🦷", title: "Dental Care", description: "Comprehensive dental services for optimal oral health." },
    { icon: "🩺", title: "Cardiology", description: "Expert cardiovascular care for heart health and wellness." },
  ];

  return (
    <section className="bg-gray-100 py-10 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-blue-600 font-medium uppercase">Our Best Services</h2>
          <h1 className="text-3xl font-bold text-gray-800 mt-2">Top-Rated Healthcare Services at Heal Well</h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            At Heal Well, we provide world-class healthcare services across a wide range of specialties, ensuring that your health and well-being are in expert hands.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative bg-white p-6 rounded-lg shadow-md transition transform hover:scale-105 group overflow-hidden"
            >
              {/* Card background image on hover */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-300 opacity-0 group-hover:opacity-50"
                style={{ backgroundImage: "url('https://medilo-nextjs.vercel.app/assets/img/service_bg.jpg')" }} // Same image for all cards
              ></div>

              {/* Text content with higher z-index to stay on top of the background */}
              <div className="relative z-10">
                <div className="absolute top-4 right-4 text-2xl font-bold opacity-20">
                  {index + 1}
                </div>
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-600">
            Delivering the highest standard of healthcare for you and your loved ones at Heal Well.
          </p>
          <a href="#" className="text-blue-600 font-bold hover:underline">
            SEE MORE &raquo;
          </a>
        </div>
      </div>
    </section>
  );
};

export default OurBestService;
