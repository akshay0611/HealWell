import { Users, Headphones, BarChart2, Trophy } from 'lucide-react'

export function StatsSection() {
  const stats = [
    {
      number: "567+",
      label: "Happy Patients",
      icon: Users,
    },
    {
      number: "23K+",
      label: "Support Calls Answered",
      icon: Headphones,
    },
    {
      number: "241+",
      label: "Successful Treatments",
      icon: BarChart2,
    },
    {
      number: "16K+",
      label: "Medical Awards",
      icon: Trophy,
    },
  ]

  return (
    <div className="bg-[#0B1B3F] py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center relative group"
            >
              <div className="bg-white rounded-full p-4 mb-4 transition-transform transform group-hover:scale-110">
                <stat.icon className="w-8 h-8 text-blue-500 group-hover:text-blue-700 transition-colors" />
              </div>
              <div className="text-white">
                <div className="text-4xl font-bold mb-2 group-hover:text-blue-300 transition-colors">
                  {stat.number}
                </div>
                <div className="text-lg group-hover:text-blue-300 transition-colors">
                  {stat.label}
                </div>
              </div>
              {index < stats.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 w-px h-12 bg-blue-400/20 -translate-y-1/2 group-hover:bg-blue-700 transition-all" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
