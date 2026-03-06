import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-background mb-6">Page Not Found</h2>
        <p className="text-gray-500 mb-8 max-w-md">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block bg-secondary hover:bg-accent text-background font-medium py-2 px-6 rounded transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}