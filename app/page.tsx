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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome, I'm <span className="text-[#ffbb4d]">James Li</span></h1>
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
          <h2 className="text-3xl font-bold mb-8 text-[#333333]">Get In Touch</h2>
          <div className="max-w-2xl">
            <p className="text-[#666666] mb-6">Feel free to reach out to me via email or connect with me on social media.</p>
            <div className="mb-6">
              <p className="text-lg text-[#333333] font-medium">Email:</p>
              <p className="text-[#666666]">Jamesli28000@gmail.com</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="bg-[#ffe6b3] hover:bg-[#ffd580] text-[#333333] py-2 px-4 rounded transition-colors">LinkedIn</a>
              <a href="#" className="bg-[#ffe6b3] hover:bg-[#ffd580] text-[#333333] py-2 px-4 rounded transition-colors">GitHub</a>
            </div>
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

