'use client';

import { useRouter } from 'next/navigation';

export default function Welcome() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <div className="space-y-8 max-w-3xl">
        <h1 className="text-6xl font-medium tracking-tight text-gray-900">
          Welcome to the Story Finder
        </h1>
        <div className="space-y-6 text-xl text-gray-600">
          <p>
            This quiz will help you discover where you naturally break from convention 
            and where you might grow.
          </p>
          <p>
            Most importantly, it will help you find the stories that matter most to you.
          </p>
        </div>
        <button 
          onClick={() => router.push('/quiz')}
          className="px-10 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full text-lg font-medium text-white hover:from-blue-600 hover:to-indigo-600 shadow-md hover:shadow-lg transition-all duration-150"
        >
          Find My Stories
        </button>
      </div>
    </div>
  );
} 