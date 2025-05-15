import prisma from '@/lib/prisma';
import React from 'react';

export default async function TestQuizDataPage() {
  // Fetch all quiz results and their responses
  const results = await prisma.quizResult.findMany({
    include: { responses: true }
  });

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6">Test Quiz Data (Raw)</h1>
      {results.length === 0 ? (
        <div className="text-red-500">No quiz results found in the database.</div>
      ) : (
        <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
          {JSON.stringify(results, null, 2)}
        </pre>
      )}
    </div>
  );
} 