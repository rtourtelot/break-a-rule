import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default async function EntrantsPage() {
  // Fetch all quiz results
  const { data: results, error: resultsError } = await supabase
    .from('quiz_results')
    .select('*');
  // Fetch all question responses
  const { data: responses, error: responsesError } = await supabase
    .from('question_responses')
    .select('*');

  if (resultsError || responsesError) {
    return <div className="p-8 text-red-600">Error loading data.</div>;
  }

  // Map responses by quiz_result_id
  const responsesByQuiz: Record<string, any[]> = {};
  responses?.forEach((resp: any) => {
    if (!responsesByQuiz[resp.quiz_result_id]) responsesByQuiz[resp.quiz_result_id] = [];
    responsesByQuiz[resp.quiz_result_id].push(resp);
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Simple nav */}
      <nav className="mb-8 flex gap-4 px-4">
        <Link href="/admin/analytics" className="text-blue-600 hover:underline">Analytics</Link>
        <Link href="/admin/entrants" className="text-indigo-600 font-bold underline">Entrants</Link>
      </nav>
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Quiz Entrants & Answers</h1>
        <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Entrant ID</th>
                <th className="px-4 py-2 text-left">Device ID</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Answers</th>
              </tr>
            </thead>
            <tbody>
              {results?.map((result: any) => (
                <tr key={result.id} className="border-t">
                  <td className="px-4 py-2 font-mono text-xs">{result.id}</td>
                  <td className="px-4 py-2 font-mono text-xs">{result.device_id}</td>
                  <td className="px-4 py-2">{new Date(result.created_at).toLocaleString()}</td>
                  <td className="px-4 py-2">
                    <table className="border border-gray-200 rounded">
                      <thead>
                        <tr>
                          <th className="px-2 py-1">Q#</th>
                          <th className="px-2 py-1">Rule</th>
                          <th className="px-2 py-1">Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {responsesByQuiz[result.id]?.map((resp: any) => (
                          <tr key={resp.id}>
                            <td className="px-2 py-1 text-center">{resp.question_id}</td>
                            <td className="px-2 py-1">{resp.rule_type}</td>
                            <td className="px-2 py-1 text-center">{resp.score}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 