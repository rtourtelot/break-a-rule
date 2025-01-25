import '@/app/globals.css';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl w-full px-6 py-12 md:py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
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
          className="inline-block px-12 py-6 text-xl md:text-2xl font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-indigo-600 transform hover:-translate-y-0.5 transition-all duration-150"
        >
          Find My Stories
        </a>
      </div>
    </main>
  );
}
