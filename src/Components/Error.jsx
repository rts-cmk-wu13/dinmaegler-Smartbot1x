import { isRouteErrorResponse, Link, useRouteError } from "react-router";

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          {error.status} {error.statusText}
        </h1>
        <p className="text-lg text-gray-700">{error.data}</p>
        <Link
          to="/"
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Gå til forsiden
        </Link>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-lg text-gray-700">{error.message}</p>
        <p className="text-md text-gray-500 mb-4">
          De relevante folk har fået besked.
        </p>
        <Link
          to="/"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Gå til forsiden
        </Link>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-red-600">Unknown Error</h1>
      </div>
    );
  }
}
