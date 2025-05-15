import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import { supabase } from '@/lib/supabaseClient';

// Basic auth check - we'll improve this later
const isAuthorized = async () => {
  const cookieStore = await cookies();
  const adminAuth = cookieStore.get('adminAuth');
  
  if (!adminAuth?.value) return false;
  
  try {
    const decodedCredentials = Buffer.from(adminAuth.value, 'base64').toString();
    const [username, password] = decodedCredentials.split(':');
    
    return username === process.env.ADMIN_USERNAME && 
           password === process.env.ADMIN_PASSWORD;
  } catch (e) {
    return false;
  }
};

async function getAnalyticsData() {
  // Fetch all quiz results from Supabase
  const { data: results, error } = await supabase
    .from('quiz_results')
    .select('*');
  if (error) throw new Error('Failed to fetch quiz results: ' + error.message);
  if (!results || results.length === 0) {
    return { averageScores: [], responseDistribution: [] };
  }

  // Calculate average scores per rule
  const ruleScores: Record<string, number[]> = {};
  results.forEach((result: any) => {
    if (result.scores) {
      Object.entries(result.scores).forEach(([rule, score]) => {
        if (!ruleScores[rule]) ruleScores[rule] = [];
        ruleScores[rule].push(Number(score));
      });
    }
  });
  const averageScores = Object.entries(ruleScores).map(([rule, scores]) => ({
    rule,
    score: scores.reduce((a, b) => a + b, 0) / scores.length
  }));

  // Fetch all per-question responses from Supabase
  const { data: responses, error: responsesError } = await supabase
    .from('question_responses')
    .select('*');
  if (responsesError) throw new Error('Failed to fetch question responses: ' + responsesError.message);

  // Aggregate responses by ruleType and score
  const responseDistributionMap: Record<string, Record<number, number>> = {};
  responses?.forEach((resp: any) => {
    if (!responseDistributionMap[resp.rule_type]) responseDistributionMap[resp.rule_type] = {};
    if (!responseDistributionMap[resp.rule_type][resp.score]) responseDistributionMap[resp.rule_type][resp.score] = 0;
    responseDistributionMap[resp.rule_type][resp.score] += 1;
  });
  // Convert to array format for AnalyticsDashboard
  const responseDistribution = Object.entries(responseDistributionMap).flatMap(([ruleType, scoresObj]) =>
    Object.entries(scoresObj).map(([score, count]) => ({
      ruleType,
      score: Number(score),
      count: Number(count)
    }))
  );

  return {
    averageScores,
    responseDistribution
  };
}

export default async function AdminAnalyticsPage() {
  const authorized = await isAuthorized();
  if (!authorized) {
    return redirect('/api/auth');
  }
  
  const { averageScores, responseDistribution } = await getAnalyticsData();
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Analytics Dashboard</h1>
        <AnalyticsDashboard 
          averageScores={averageScores}
          responseDistribution={responseDistribution}
        />
      </div>
    </div>
  );
} 