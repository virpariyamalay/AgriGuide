import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
      <div className="max-w-xl text-center">
        <h1 className="text-6xl font-bold text-primary-600">404</h1>
        <h2 className="text-3xl font-semibold mt-4 mb-6">Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-8">
          Oops! The page you are looking for might have been moved or doesn't exist.
        </p>
        <Link 
          to="/" 
          className="btn btn-primary inline-flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Return Home
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage