import { useNavigate } from 'react-router-dom'
import { Plane, Cloud, MapPin } from 'lucide-react'
import Button from '../components/common/Button'
import Card from '../components/common/Card'

function Home() {
    const navigate = useNavigate()

    const features = [
        {
            icon: <Plane className="h-8 w-8 text-blue-600" />,
            title: 'Flight Search',
            description: 'Find the best flights with AI-powered recommendations',
        },
        {
            icon: <Cloud className="h-8 w-8 text-blue-600" />,
            title: 'Weather Info',
            description: 'Get accurate weather forecasts for your destination',
        },
        {
            icon: <MapPin className="h-8 w-8 text-blue-600" />,
            title: 'Trip Planning',
            description: 'Plan your entire trip with intelligent assistance',
        },
    ]

    return (
        <div className="max-w-6xl mx-auto">
            <div className="text-center py-16">
                <h1 className="text-5xl font-bold text-gray-800 mb-4">
                    Welcome to <span className="text-blue-600">TripAgent</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Your AI-powered travel assistant. Search flights, check weather, and
                    plan your perfect trip with intelligent recommendations.
                </p>
                <Button size="lg" onClick={() => navigate('/search')}>
                    Start Planning Your Trip
                </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
                {features.map((feature, index) => (
                    <Card key={index} hoverable className="text-center p-6">
                        <div className="flex justify-center mb-4">{feature.icon}</div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            {feature.title}
                        </h3>
                        <p className="text-gray-600">{feature.description}</p>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Home