export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff9e6] to-[#fff5cc] text-[#333333]">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <header className="mb-16">
          <nav className="flex justify-between items-center">
            <div className="text-xl font-semibold">
              {/* Replace "Portfolio" text with favicon */}
              <img src="/favicon.ico" alt="Logo" className="h-12 w-12" />
            </div>
            <div className="flex space-x-6">
              <a href="#about" className="text-[#666666] hover:text-[#333333] transition-colors">About</a>
              <a href="#projects" className="text-[#666666] hover:text-[#333333] transition-colors">Projects</a>
              <a href="#contact" className="text-[#666666] hover:text-[#333333] transition-colors">Contact</a>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="mb-24">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Hello, I am <span className="text-[#ffbb4d]">James Li</span></h1>
          <p className="text-xl text-[#666666] max-w-2xl mb-8">Currently a Mathematics undergraduate at Toronto Metropolitan University</p>
          <button className="bg-[#ffe6b3] hover:bg-[#ffd580] text-[#333333] font-medium py-2 px-6 rounded transition-colors">
            View My Work
          </button>
        </section>

        {/* About Section */}
        <section id="about" className="mb-24">
          <h2 className="text-3xl font-bold mb-8 text-[#333333]">About Me</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-[#666666] mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <p className="text-[#666666] mb-4">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
            <div>
              <p className="text-[#666666] mb-4">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
              <p className="text-[#666666]">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-24">
          <h2 className="text-3xl font-bold mb-8 text-[#333333]">Featured Projects</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="border border-[#ffe6b3] rounded-lg p-6 hover:shadow-md transition-shadow bg-white bg-opacity-70">
                <div className="bg-[#ffe6b3] border-2 border-dashed border-[#ffd580] rounded-xl w-full h-48 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Project {item}</h3>
                <p className="text-[#666666] mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <a href="#" className="text-[#ffbb4d] hover:text-[#333333] transition-colors">View details →</a>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-24">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="https://www.linkedin.com/in/james-li-3675a91b4/" className="bg-[#ffe6b3] hover:bg-[#ffd580] text-[#333333] py-3 px-6 rounded transition-colors flex items-center justify-center space-x-2 min-w-[150px]">
              <img src="/linkedin-icon.svg" alt="LinkedIn" className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>
            <a href="https://github.com/James-Li-t" className="bg-[#ffe6b3] hover:bg-[#ffd580] text-[#333333] py-3 px-6 rounded transition-colors flex items-center justify-center space-x-2 min-w-[150px]">
              <img src="/github-icon.svg" alt="GitHub" className="w-5 h-5" />
              <span>GitHub</span>
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-8 border-t border-[#ffe6b3]">
          <p className="text-[#666666] text-center">© {new Date().getFullYear()} James Li.</p>
        </footer>
      </div>
      </div>
  );
}

