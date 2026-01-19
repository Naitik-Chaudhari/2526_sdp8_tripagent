import { useNavigate } from 'react-router-dom'
import { Home } from 'lucide-react'
import Button from '../components/common/Button'

function NotFound() {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <h1 className="text-9xl font-bold text-gray-200">404</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mt-4">
                Page Not Found
            </h2>
            <p className="text-gray-600 mt-2 mb-8">
                The page you are looking for does not exist or has been moved.
            </p>
            <Button onClick={() => navigate('/')}>
                <Home className="h-4 w-4 mr-2" />
                Go Home
            </Button>
        </div>
    )
}

export default NotFound