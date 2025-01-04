import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Navigation() {
  return (
    <nav className="bg-white py-4 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/placeholder.svg"
              alt="Medilo Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="text-2xl font-bold">HealWell</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-500">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-500">
              About
            </Link>
            <Link href="/service" className="text-gray-700 hover:text-blue-500">
              Service
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-blue-500">
              Blog
            </Link>
            <Link href="/pages" className="text-gray-700 hover:text-blue-500">
              Pages
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-500">
              Contact
            </Link>
          </div>

          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6">
            Contact Now
          </Button>
        </div>
      </div>
    </nav>
  )
}

