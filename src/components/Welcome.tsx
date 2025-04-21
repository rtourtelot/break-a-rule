'use client';

import { useRouter } from 'next/navigation';

export default function Welcome() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <div className="space-y-12 max-w-3xl">
        <h1 className="text-6xl font-medium tracking-tight text-blue-600">
          Welcome to the Story Finder
        </h1>
        
        <div className="space-y-8 text-xl text-gray-600">
          <p>
            This quiz will help you discover where you already break free of hidden cultural
            rules and where you tend to follow them.
          </p>
          
          <p>
            On the results page, you'll be prompted to find stories that highlight your rule
            breaking strengths and illustrate your opportunities for growth. Sharing these
            stories will allow you to authentically engage with others and inspire your own
            growth.
          </p>

          <p>
            Enjoy the story finder.
          </p>

          <p className="text-2xl text-gray-800">
            Rick Lewis
          </p>
        </div>

        <button 
          onClick={() => router.push('/quiz')}
          className="px-10 py-4 bg-blue-500 rounded-full text-xl font-medium text-white hover:bg-blue-600 shadow-md hover:shadow-lg transition-all duration-150"
        >
          Find My Stories
        </button>
      </div>
    </div>
  );
} 