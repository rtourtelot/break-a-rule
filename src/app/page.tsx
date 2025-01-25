import '@/app/globals.css';

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">
          Welcome to the Story Finder
        </h1>
        
        <p className="text-xl mb-4 text-gray-600">
          This quiz will help you discover where you naturally break from convention and where you might grow.
        </p>
        
        <p className="text-xl mb-8 text-gray-600">
          Most importantly, it will help you find the stories that matter most to you.
        </p>

        <a 
          href="/quiz" 
          className="inline-block px-6 py-3 text-lg font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Find My Stories
        </a>
      </div>
    </main>
  );
}
