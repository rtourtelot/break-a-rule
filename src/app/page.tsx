'use client';

import { useState } from 'react';
import Welcome from '@/components/Welcome';
import Quiz from '@/components/Quiz';

export default function Home() {
  const [started, setStarted] = useState(false);

  return started ? (
    <Quiz />
  ) : (
    <Welcome />
  );
}
