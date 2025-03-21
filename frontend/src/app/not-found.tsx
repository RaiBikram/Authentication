export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
        <p className="mt-2 text-lg">Oops! The page you're looking for doesn't exist.</p>
        <a href="/" className="mt-4 text-blue-500 hover:underline">Go back home</a>
      </div>
    );
  }
  