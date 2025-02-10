import '@/app/globals.css';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl w-full px-6 py-12 md:py-24">
        <h1 className="text-4xl md:text-6xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 text-center">
          Welcome to the Story Finder
        </h1>
        
        <div className="space-y-8 mb-12">
          <p className="text-xl md:text-2xl text-gray-600">
            This quiz will help you discover where you already break free of hidden cultural rules and where you tend to follow them.
          </p>
          
          <p className="text-xl md:text-2xl text-gray-600">
            On the results page, you'll be prompted to find stories that highlight your rule breaking strengths and illustrate your opportunities for growth. Sharing these stories will allow you to authentically engage with others and inspire your own growth.
          </p>
          
          <p className="text-xl md:text-2xl text-gray-600">
            Enjoy the story finder.
          </p>

          <p className="text-xl md:text-2xl font-medium text-gray-800">
            Rick Lewis
          </p>
        </div>

        <div className="text-center">
          <a 
            href="/quiz" 
            className="inline-block px-12 py-6 text-xl md:text-2xl font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-indigo-600 transform hover:-translate-y-0.5 transition-all duration-150"
          >
            Find My Stories
          </a>
        </div>
      </div>
    </main>
  );
}
