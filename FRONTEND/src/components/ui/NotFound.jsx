import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-primary-600 mb-4">Not Found</h2>
        <p className="text-lg text-gray-600 mb-8">
          We couldn't find what you're looking for.
        </p>
        <Link 
          to="/"
          className="btn btn-primary"
        >
          Go back home
        </Link>
      </div>
    </div>
  )
}

export default NotFound