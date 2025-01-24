'use client';

import { useState } from 'react';
import Welcome from '@/components/Welcome';
import Quiz from '@/components/Quiz';

export default function Home() {
  const [started, setStarted] = useState(false);

  return (
    <main className="min-h-screen p-8 md:p-24 max-w-5xl mx-auto">
      <h1 className="text-4xl md:text-6xl font-bold mb-8">
        Welcome to the Story Finder
      </h1>
      
      <p className="text-xl md:text-2xl text-gray-600 mb-6">
        This quiz will help you discover where you naturally break from convention and where you might grow.
      </p>
      
      <p className="text-xl md:text-2xl text-gray-600 mb-12">
        Most importantly, it will help you find the stories that matter most to you.
      </p>

      <a 
        href="/quiz" 
        className="button-primary text-lg md:text-xl rounded-full px-8 py-4 inline-block"
      >
        Find My Stories
      </a>
    </main>
  );
}
