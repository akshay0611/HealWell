'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Heart, ArrowLeft, Home } from 'lucide-react'

const Button = ({ 
  children, 
  onClick, 
  className 
}: { 
  children: React.ReactNode, 
  onClick: () => void, 
  className?: string 
}) => (
  <button
    onClick={onClick}
    className={`px-6 py-2 rounded-md shadow transition-colors flex items-center justify-center ${className}`}
  >
    {children}
  </button>
)

export default function NotFound() {
    const router = useRouter()
    const [countdown, setCountdown] = useState(5)

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer)
                    router.push('/')
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [router])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800">
            <style jsx global>{`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                    100% { transform: translateY(0px); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                .animate-pulse {
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: .5; }
                }
            `}</style>
            <div className="max-w-2xl text-center p-6">
                <div className="mb-8 animate-pulse">
                    <Heart className="w-24 h-24 text-red-500 mx-auto" />
                </div>
                <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
                <h2 className="text-3xl font-semibold mb-4">Oops! Page Not Found</h2>
                <p className="text-xl text-gray-600 mb-8">
                    We couldn't find the page you're looking for. It seems this page is on a coffee break!
                </p>
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <p className="text-lg text-gray-700">
                        Don't worry, we're redirecting you to our <span className="text-blue-600 font-medium">Home Page</span> in <strong className="text-2xl text-blue-600">{countdown}</strong> seconds.
                    </p>
                    <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-blue-500 transition-all duration-1000 ease-linear" 
                            style={{ width: `${(countdown / 5) * 100}%` }}
                        ></div>
                    </div>
                </div>
                <div className="flex items-center justify-center space-x-4">
                    <Button
                        onClick={() => router.push('/')}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        <Home className="mr-2 h-4 w-4" /> Go to Home
                    </Button>
                    <Button
                        onClick={() => router.back()}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
                    </Button>
                </div>
            </div>
            <div className="mt-12 relative w-96 h-96">
                <Image
                    src="/images/404.png"
                    alt="Friendly doctor illustration"
                    layout="fill"
                    objectFit="contain"
                    className="animate-float"
                />
            </div>
        </div>
    )
}