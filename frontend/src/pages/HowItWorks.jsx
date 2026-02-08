import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Search,
    MapPin,
    Calendar,
    CreditCard,
    Plane,
    CheckCircle,
    ArrowRight,
    Globe,
    Sparkles,
    Heart,
    Star,
    Users,
    Clock,
    Shield,
    Zap
} from 'lucide-react'

// Reliable gradient placeholder generator
const createGradientPlaceholder = (color1, color2, width = 600, height = 400) => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
                <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
            </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)"/>
    </svg>`
    return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

const HowItWorks = () => {
    const navigate = useNavigate()
    const [activeStep, setActiveStep] = useState(0)
    const [scrollProgress, setScrollProgress] = useState(0)
    const containerRef = useRef(null)
    const stepsRef = useRef([])

    const steps = [
        {
            id: 1,
            title: 'Search Your Dream Destination',
            description: 'Enter your desired location, travel dates, and preferences. Our AI instantly analyzes millions of options to find the perfect matches for you.',
            icon: Search,
            color: 'from-blue-400 to-sky-500',
            bgColor: 'bg-blue-50 dark:bg-blue-900/20',
            image: createGradientPlaceholder('#3b82f6', '#0ea5e9'),
            features: ['Smart destination suggestions', 'Flexible date search', 'Budget optimization']
        },
        {
            id: 2,
            title: 'Explore & Compare Options',
            description: 'Browse through curated flights, hotels, and experiences. Compare prices, read reviews, and view detailed information all in one place.',
            icon: Globe,
            color: 'from-sky-400 to-indigo-500',
            bgColor: 'bg-sky-50 dark:bg-sky-900/20',
            image: createGradientPlaceholder('#0ea5e9', '#6366f1'),
            features: ['Real-time price comparison', 'Verified reviews', 'Virtual tours']
        },
        {
            id: 3,
            title: 'Customize Your Itinerary',
            description: 'Use our AI-powered planner to create a personalized day-by-day itinerary. Add activities, restaurants, and hidden gems recommended just for you.',
            icon: Calendar,
            color: 'from-indigo-400 to-purple-500',
            bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
            image: createGradientPlaceholder('#6366f1', '#a855f7'),
            features: ['AI itinerary builder', 'Local recommendations', 'Weather-aware planning']
        },
        {
            id: 4,
            title: 'Secure Booking',
            description: 'Book everything with confidence using our secure payment system. Get instant confirmations and all your travel documents in one place.',
            icon: CreditCard,
            color: 'from-purple-400 to-pink-500',
            bgColor: 'bg-purple-50 dark:bg-purple-900/20',
            image: createGradientPlaceholder('#a855f7', '#ec4899'),
            features: ['Secure payments', 'Instant confirmation', 'Free cancellation options']
        },
        {
            id: 5,
            title: 'Enjoy Your Journey',
            description: 'Access your complete trip details offline, get real-time updates, and enjoy 24/7 support throughout your adventure.',
            icon: Plane,
            color: 'from-sky-400 to-blue-500',
            bgColor: 'bg-sky-50 dark:bg-sky-900/20',
            image: createGradientPlaceholder('#0ea5e9', '#3b82f6'),
            features: ['Offline access', 'Real-time updates', '24/7 support']
        }
    ]

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return

            const container = containerRef.current
            const scrollTop = window.scrollY - container.offsetTop
            const scrollHeight = container.scrollHeight - window.innerHeight
            const progress = Math.max(0, Math.min(1, scrollTop / scrollHeight))

            setScrollProgress(progress)

            // Determine active step based on scroll position
            const stepHeight = scrollHeight / steps.length
            const currentStep = Math.min(
                steps.length - 1,
                Math.max(0, Math.floor(scrollTop / stepHeight))
            )
            setActiveStep(currentStep)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [steps.length])

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob"></div>
                    <div className="absolute top-40 right-10 w-72 h-72 bg-sky-300 dark:bg-sky-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-indigo-300 dark:bg-indigo-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                </div>

                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <Sparkles className="h-4 w-4" />
                        See How Easy It Is
                    </div>

                    <h1 className="text-5xl sm:text-7xl font-bold text-gray-900 dark:text-white mb-6">
                        Plan Your Trip in
                        <span className="block mt-2 bg-gradient-to-r from-blue-500 via-sky-500 to-indigo-500 bg-clip-text text-transparent">
                            5 Simple Steps
                        </span>
                    </h1>

                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
                        From dreaming to boarding, we make every step of your travel journey seamless and enjoyable.
                    </p>

                    {/* Scroll Indicator */}
                    <div className="flex flex-col items-center gap-2 animate-bounce">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Scroll to explore</span>
                        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-500 rounded-full flex justify-center pt-2">
                            <div className="w-1.5 h-3 bg-gray-400 dark:bg-gray-500 rounded-full animate-scroll-down"></div>
                        </div>
                    </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-1/4 left-10 animate-float">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl">
                        <Plane className="h-8 w-8 text-blue-500" />
                    </div>
                </div>
                <div className="absolute bottom-1/4 right-10 animate-float-delayed">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl">
                        <MapPin className="h-8 w-8 text-sky-500" />
                    </div>
                </div>
                <div className="absolute top-1/3 right-1/4 animate-float-slow">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl">
                        <Heart className="h-8 w-8 text-pink-500" />
                    </div>
                </div>
            </section>

            {/* Steps Section with Scroll Animation */}
            <section ref={containerRef} className="relative py-20">
                {/* Progress Bar */}
                <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
                    <div className="relative">
                        {/* Background Line */}
                        <div className="absolute left-1/2 -translate-x-1/2 w-1 h-64 bg-gray-200 dark:bg-gray-700 rounded-full"></div>

                        {/* Progress Line */}
                        <div
                            className="absolute left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 to-sky-500 rounded-full transition-all duration-300"
                            style={{ height: `${scrollProgress * 256}px` }}
                        ></div>

                        {/* Step Indicators */}
                        {steps.map((step, index) => (
                            <div
                                key={step.id}
                                className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 transition-all duration-300 ${index <= activeStep
                                    ? 'bg-blue-500 border-blue-500 scale-125'
                                    : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'
                                    }`}
                                style={{ top: `${(index / (steps.length - 1)) * 240}px` }}
                            >
                                {index <= activeStep && (
                                    <CheckCircle className="h-3 w-3 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Steps Content */}
                <div className="max-w-7xl mx-auto px-4">
                    {steps.map((step, index) => {
                        const IconComponent = step.icon
                        const isEven = index % 2 === 0

                        return (
                            <div
                                key={step.id}
                                ref={el => stepsRef.current[index] = el}
                                className={`min-h-screen flex items-center py-20 step-section ${index === activeStep ? 'is-active' : ''
                                    }`}
                            >
                                <div className={`grid lg:grid-cols-2 gap-12 items-center w-full ${isEven ? '' : 'lg:flex-row-reverse'
                                    }`}>
                                    {/* Content */}
                                    <div className={`space-y-6 ${isEven ? 'lg:pr-12' : 'lg:pl-12 lg:order-2'}`}>
                                        {/* Step Number */}
                                        <div className={`inline-flex items-center gap-3 ${step.bgColor} px-4 py-2 rounded-full`}>
                                            <span className={`w-8 h-8 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-sm`}>
                                                {step.id}
                                            </span>
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Step {step.id} of {steps.length}
                                            </span>
                                        </div>

                                        {/* Icon */}
                                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center shadow-lg transform transition-transform duration-500 hover:scale-110 hover:rotate-6`}>
                                            <IconComponent className="h-8 w-8 text-white" />
                                        </div>

                                        {/* Title & Description */}
                                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                                            {step.title}
                                        </h2>
                                        <p className="text-lg text-gray-600 dark:text-gray-300">
                                            {step.description}
                                        </p>

                                        {/* Features */}
                                        <ul className="space-y-3">
                                            {step.features.map((feature, fIndex) => (
                                                <li key={fIndex} className="flex items-center gap-3">
                                                    <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center`}>
                                                        <CheckCircle className="h-4 w-4 text-white" />
                                                    </div>
                                                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* CTA */}
                                        {index === steps.length - 1 && (
                                            <button
                                                onClick={() => navigate('/search')}
                                                className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-sky-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                                            >
                                                Start Planning Now
                                                <ArrowRight className="h-5 w-5" />
                                            </button>
                                        )}
                                    </div>

                                    {/* Image/Animation */}
                                    <div className={`relative ${isEven ? 'lg:order-2' : ''}`}>
                                        <div className="relative group">
                                            {/* Main Image */}
                                            <div className="relative overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-500 group-hover:scale-[1.02]">
                                                <img
                                                    src={step.image}
                                                    alt={step.title}
                                                    className="w-full h-[400px] object-cover"
                                                />
                                                <div className={`absolute inset-0 bg-gradient-to-t ${step.color} opacity-20`}></div>
                                            </div>

                                            {/* Floating Cards */}
                                            <div className={`absolute -top-6 ${isEven ? '-right-6' : '-left-6'} bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl animate-float`}>
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center`}>
                                                        <Star className="h-5 w-5 text-white" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">4.9 Rating</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">2.3k reviews</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={`absolute -bottom-6 ${isEven ? '-left-6' : '-right-6'} bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl animate-float-delayed`}>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex -space-x-2">
                                                        <div className="w-8 h-8 rounded-full bg-blue-400 border-2 border-white"></div>
                                                        <div className="w-8 h-8 rounded-full bg-sky-400 border-2 border-white"></div>
                                                        <div className="w-8 h-8 rounded-full bg-indigo-400 border-2 border-white"></div>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">50K+ Travelers</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">Trust TripAgent</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Background Decoration */}
                                        <div className={`absolute -z-10 top-10 ${isEven ? 'right-10' : 'left-10'} w-full h-full bg-gradient-to-r ${step.color} opacity-20 rounded-3xl blur-2xl`}></div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>

            {/* Interactive Demo Section */}
            <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            See It In Action
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            Watch how easy it is to plan your perfect trip
                        </p>
                    </div>

                    {/* Mock App Interface */}
                    <div className="relative max-w-4xl mx-auto">
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
                            {/* Browser Header */}
                            <div className="bg-gray-100 dark:bg-gray-700 px-6 py-4 flex items-center gap-3">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                </div>
                                <div className="flex-1 bg-white dark:bg-gray-600 rounded-lg px-4 py-2 text-sm text-gray-500 dark:text-gray-300">
                                    tripagent.com/search
                                </div>
                            </div>

                            {/* App Content */}
                            <div className="p-8">
                                {/* Search Bar Animation */}
                                <div className="relative mb-8">
                                    <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 border-2 border-blue-500/50">
                                        <div className="flex items-center gap-4 flex-wrap">
                                            <div className="flex-1 min-w-[200px]">
                                                <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Where to?</label>
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-5 w-5 text-blue-500" />
                                                    <span className="text-gray-900 dark:text-white font-medium typing-animation">Goa, India</span>
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-[200px]">
                                                <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">When?</label>
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-5 w-5 text-blue-500" />
                                                    <span className="text-gray-900 dark:text-white font-medium">Mar 15 - Mar 22</span>
                                                </div>
                                            </div>
                                            <button className="bg-gradient-to-r from-blue-500 to-sky-500 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:shadow-lg transition-all pulse-animation">
                                                <Search className="h-5 w-5" />
                                                Search
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Results Animation */}
                                <div className="grid md:grid-cols-3 gap-4">
                                    {[1, 2, 3].map((item, index) => (
                                        <div
                                            key={item}
                                            className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden card-slide-up"
                                            style={{ animationDelay: `${index * 0.2}s` }}
                                        >
                                            <div className="h-32 bg-gradient-to-r from-blue-400 to-sky-400"></div>
                                            <div className="p-4">
                                                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded mb-2 w-3/4"></div>
                                                <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-400 rounded-full blur-3xl opacity-30"></div>
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-sky-400 rounded-full blur-3xl opacity-30"></div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { icon: Users, value: '50K+', label: 'Happy Travelers', color: 'text-blue-500' },
                            { icon: Globe, value: '120+', label: 'Destinations', color: 'text-sky-500' },
                            { icon: Clock, value: '24/7', label: 'Support', color: 'text-indigo-500' },
                            { icon: Shield, value: '100%', label: 'Secure Booking', color: 'text-purple-500' },
                        ].map((stat, index) => {
                            const IconComponent = stat.icon
                            return (
                                <div key={index} className="text-center group">
                                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                        <IconComponent className={`h-8 w-8 ${stat.color}`} />
                                    </div>
                                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</h3>
                                    <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 bg-gradient-to-r from-blue-500 via-sky-500 to-indigo-500 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
                    <Zap className="h-16 w-16 mx-auto mb-6 text-white opacity-80" />
                    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                        Ready to Start Your Adventure?
                    </h2>
                    <p className="text-xl text-white/80 mb-10">
                        Join thousands of travelers who plan their perfect trips with TripAgent
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => navigate('/search')}
                            className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            Start Planning Free
                            <ArrowRight className="h-5 w-5" />
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
                        >
                            Learn More
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HowItWorks