import '@/app/globals.css';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-4xl w-full px-6 py-12 md:py-24">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-gray-900">
          Welcome to the Story Finder
        </h1>
        
        <p className="text-xl md:text-2xl mb-6 text-gray-600">
          This quiz will help you discover where you naturally break from convention and where you might grow.
        </p>
        
        <p className="text-xl md:text-2xl mb-12 text-gray-600">
          Most importantly, it will help you find the stories that matter most to you.
        </p>

        <a 
          href="/quiz" 
          className="button-primary text-lg md:text-xl px-8 py-4 inline-block"
        >
          Find My Stories
        </a>
      </div>
    </main>
  );
}
