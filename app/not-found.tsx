export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff9e6] to-[#fff5cc] flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#ffbb4d] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-[#333333] mb-6">Page Not Found</h2>
        <p className="text-[#666666] mb-8 max-w-md">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="inline-block bg-[#ffe6b3] hover:bg-[#ffd580] text-[#333333] font-medium py-2 px-6 rounded transition-colors"
        >
          Return Home
        </a>
      </div>
    </div>
  );
}