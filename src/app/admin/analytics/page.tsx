import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import { QuizResult, QuestionResponse } from '@prisma/client';

interface QuizResultWithResponses extends QuizResult {
  responses: QuestionResponse[];
  scores: Record<string, number>;
}

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
  // Get all quiz results
  const results = await prisma.quizResult.findMany({
    include: {
      responses: true
    }
  }) as unknown as QuizResultWithResponses[];
  
  // Calculate average scores per rule
  const ruleScores = results.reduce((acc: Record<string, number[]>, result: QuizResultWithResponses) => {
    Object.entries(result.scores).forEach(([rule, score]) => {
      if (!acc[rule]) acc[rule] = [];
      acc[rule].push(score);
    });
    return acc;
  }, {});
  
  const averageScores = Object.entries(ruleScores).map(([rule, scores]) => ({
    rule,
    score: scores.reduce((a: number, b: number) => a + b, 0) / scores.length
  }));
  
  // Calculate response distributions
  const responseDistribution = await prisma.questionResponse.groupBy({
    by: ['ruleType', 'score'],
    _count: true
  });

  const formattedDistribution = responseDistribution.map((d: { ruleType: string; score: number; _count: number }) => ({
    ruleType: d.ruleType,
    score: d.score,
    count: d._count
  }));
  
  return {
    averageScores,
    responseDistribution: formattedDistribution
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