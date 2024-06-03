// src/pages/ErrorPage.jsx
import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  const status = error?.status || 404;
  const message = error?.message || "Page not found";

  return (
    <div className="container flex flex-col justify-center items-center h-screen text-center py-32">
      <h1 className="text-7xl font-extrabold mb-8">Error {status}</h1>
      <p className="lg:text-3xl">{message}</p>
      <button className="btn bg-red-500 text-white mt-8 py-2 px-4 rounded">
        <Link to="/">HomePage</Link>
      </button>
    </div>
  );
};

export default ErrorPage;
