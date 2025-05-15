import '@/app/globals.css';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl w-full px-6 py-6 md:py-12">
          <div className="flex justify-center mb-8">
            <Image
              src="/story-finder.png"
              alt="Story Finder Logo"
              width={140}
              height={140}
              className="rounded-full"
              priority
            />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-12 text-blue-600 text-center">
            Welcome to the Story Finder
          </h1>

          <div className="mb-8 space-y-4">
            <p className="text-xl md:text-2xl text-gray-700 text-center">
              Get ready to find the best stories you have to tell, by discovering the cultural rules you currently follow—and those that you break.
            </p>
          </div>

          <div className="text-center mb-10">
            <a 
              href="/quiz" 
              className="inline-block px-12 py-6 text-xl md:text-2xl font-medium text-white bg-blue-500 rounded-full shadow-lg hover:shadow-xl hover:bg-blue-600 transform hover:-translate-y-0.5 transition-all duration-150"
            >
              Find My Stories
            </a>
          </div>

          <div className="w-full flex justify-center mb-10">
            <div className="w-full h-4 rounded-full bg-transparent" style={{ boxShadow: '0 4px 16px 0 rgba(0,0,0,0.10)' }} />
          </div>

          <div className="space-y-6 mb-12">
            <p className="text-xl md:text-2xl text-gray-600">
              Hi, my name is Rick Lewis.
            </p>

            <p className="text-xl md:text-2xl text-gray-600 leading-normal">
              I'm a professional speaker, entertainer, published author, and writing coach.
              My entire vocational life has been focused on communication skills—and the skill
              of storytelling has far and away been the number one contributor to my success.
            </p>
            
            <p className="text-xl md:text-2xl text-gray-600 leading-normal">
              Living a story worth life is the first principle of great storytelling.
              The good news is, most of us have lived a story worthy life.
              The bad news is, we're not yet skilled at retrieving those stories from our personal history.
            </p>

            <p className="text-xl md:text-2xl text-gray-600 leading-normal">
              My book <i>7 Rules You Were Born to Break</i> was written as a useful framework for living
              our best lives in the future and also for discovering the most interesting stories
              that are hidden in our past.
            </p>

            <p className="text-xl md:text-2xl text-gray-600 leading-normal">
              The Story Finder will translate your score, identify the themes of the best stories
              you have to tell, and provide you with specific prompts that will help you find these stories.
              The 7 Rule model gets right to the heart of our shared humanness, and when you find those
              stories you'll be able to communicate with authenticity, credibility, and clarity.
            </p>

            <p className="text-xl md:text-2xl text-gray-600 leading-normal">
              There are seven sections in this quiz—one for each rule—with four questions within each section.
              You're just minutes away from some fascinating and useful information about your way of being
              in the world and the lens you can use to share your life experience.
            </p>

            <p className="text-xl md:text-2xl text-gray-600">
              I hope you enjoy the Story Finder.
            </p>

            <div className="flex items-center gap-6">
              <div>
                <p className="text-xl md:text-2xl text-gray-600 italic">
                  Let's get started,
                </p>
                <Image
                  src="/rick-lewis.png"
                  alt="Rick Lewis"
                  width={120}
                  height={120}
                  className="rounded-full shadow-lg mt-4"
                />
                <p className="text-xl md:text-2xl text-gray-600 italic mt-3">
                  Rick Lewis
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <a 
              href="/quiz" 
              className="inline-block px-12 py-6 text-xl md:text-2xl font-medium text-white bg-blue-500 rounded-full shadow-lg hover:shadow-xl hover:bg-blue-600 transform hover:-translate-y-0.5 transition-all duration-150"
            >
              Find My Stories
            </a>
          </div>
        </div>
      </main>
      <footer className="w-full py-6 bg-transparent flex justify-center items-center mt-8">
        <span className="text-gray-400 text-sm">© {new Date().getFullYear()} Rick Lewis</span>
      </footer>
    </>
  );
}
