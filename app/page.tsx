export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <header className="mb-16">
          <nav className="flex justify-between items-center">
            <div className="text-xl font-semibold">Portfolio</div>
            <div className="flex space-x-6">
              <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
              <a href="#projects" className="text-gray-600 hover:text-gray-900 transition-colors">Projects</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="mb-24">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Hello, I'm <span className="text-gray-400">Your Name</span></h1>
          <p className="text-xl text-gray-600 max-w-2xl mb-8">I'm a creative developer specializing in building beautiful, functional digital experiences.</p>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-6 rounded transition-colors">
            View My Work
          </button>
        </section>

        {/* About Section */}
        <section id="about" className="mb-24">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">About Me</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <p className="text-gray-600 mb-4">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
            <div>
              <p className="text-gray-600 mb-4">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
              <p className="text-gray-600">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-24">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Featured Projects</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Project {item}</h3>
                <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <a href="#" className="text-gray-500 hover:text-gray-800 transition-colors">View details →</a>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-24">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Get In Touch</h2>
          <div className="max-w-2xl">
            <p className="text-gray-600 mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded transition-colors">Email</a>
              <a href="#" className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded transition-colors">LinkedIn</a>
              <a href="#" className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded transition-colors">GitHub</a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-8 border-t border-gray-100">
          <p className="text-gray-500 text-center">© {new Date().getFullYear()} Your Name. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
