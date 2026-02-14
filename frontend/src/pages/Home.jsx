import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { syncUser } from "../services/userService";
import {
  Plane,
  Cloud,
  MapPin,
  Star,
  TrendingUp,
  Globe,
  Sparkles,
  ChevronRight,
  ChevronUp,
  Play,
  Heart,
  MessageCircle,
  Send,
} from "lucide-react";

// Reliable gradient placeholder generator
const createGradientPlaceholder = (
  color1,
  color2,
  width = 400,
  height = 500,
) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
                <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
            </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)"/>
    </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

function Home() {
  const navigate = useNavigate();
  const [showAllDestinations, setShowAllDestinations] = useState(false);

  const stats = [
    { value: "50K+", label: "Trips Planned", icon: Plane },
    { value: "29", label: "States Covered", icon: Globe },
    { value: "98%", label: "Happy Travelers", icon: Heart },
    { value: "24/7", label: "AI Support", icon: MessageCircle },
  ];
  const { user } = useUser();
  const { getToken } = useAuth();

  // ✅ ADD THIS useEffect (User Sync to PostgreSQL)
  useEffect(() => {
    if (user) {
      syncUser(user, getToken);
    }
  }, [user, getToken]);
  const features = [
    {
      icon: <Plane className="h-6 w-6" />,
      title: "Smart Flight Search",
      description:
        "AI-powered domestic flight recommendations with real-time pricing across India.",
      color: "from-blue-400 to-sky-500",
    },
    {
      icon: <Cloud className="h-6 w-6" />,
      title: "Weather Intelligence",
      description:
        "Accurate Indian weather forecasts to help you pack right for any season.",
      color: "from-sky-400 to-indigo-500",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Local Guides",
      description:
        "Discover hidden gems across India with personalized regional recommendations.",
      color: "from-indigo-400 to-purple-500",
    },
  ];

  const destinations = [
    {
      name: "Goa",
      image: createGradientPlaceholder("#00BCD4", "#009688"),
      rating: 4.9,
      reviews: "5.2k",
    },
    {
      name: "Jaipur, Rajasthan",
      image: createGradientPlaceholder("#E91E63", "#9C27B0"),
      rating: 4.8,
      reviews: "4.1k",
    },
    {
      name: "Kerala Backwaters",
      image: createGradientPlaceholder("#4CAF50", "#8BC34A"),
      rating: 4.9,
      reviews: "3.8k",
    },
    {
      name: "Ladakh",
      image: createGradientPlaceholder("#2196F3", "#3F51B5"),
      rating: 4.9,
      reviews: "2.9k",
    },
    {
      name: "Varanasi, UP",
      image: createGradientPlaceholder("#FF9800", "#F44336"),
      rating: 4.7,
      reviews: "3.5k",
    },
    {
      name: "Manali, Himachal",
      image: createGradientPlaceholder("#03A9F4", "#00BCD4"),
      rating: 4.8,
      reviews: "4.3k",
    },
    {
      name: "Andaman Islands",
      image: createGradientPlaceholder("#00BCD4", "#4CAF50"),
      rating: 4.9,
      reviews: "2.1k",
    },
    {
      name: "Udaipur, Rajasthan",
      image: createGradientPlaceholder("#9C27B0", "#673AB7"),
      rating: 4.8,
      reviews: "3.2k",
    },
    {
      name: "Darjeeling, WB",
      image: createGradientPlaceholder("#795548", "#5D4037"),
      rating: 4.7,
      reviews: "2.8k",
    },
    {
      name: "Rishikesh, Uttarakhand",
      image: createGradientPlaceholder("#4CAF50", "#009688"),
      rating: 4.8,
      reviews: "3.1k",
    },
    {
      name: "Hampi, Karnataka",
      image: createGradientPlaceholder("#FF5722", "#E91E63"),
      rating: 4.7,
      reviews: "1.9k",
    },
    {
      name: "Shimla, Himachal",
      image: createGradientPlaceholder("#607D8B", "#455A64"),
      rating: 4.6,
      reviews: "3.7k",
    },
    {
      name: "Agra, UP",
      image: createGradientPlaceholder("#FFC107", "#FF9800"),
      rating: 4.9,
      reviews: "6.2k",
    },
    {
      name: "Ooty, Tamil Nadu",
      image: createGradientPlaceholder("#8BC34A", "#4CAF50"),
      rating: 4.6,
      reviews: "2.4k",
    },
    {
      name: "Jaisalmer, Rajasthan",
      image: createGradientPlaceholder("#FFC107", "#FF5722"),
      rating: 4.8,
      reviews: "2.2k",
    },
    {
      name: "Munnar, Kerala",
      image: createGradientPlaceholder("#4CAF50", "#2E7D32"),
      rating: 4.8,
      reviews: "2.7k",
    },
  ];

  const displayedDestinations = showAllDestinations
    ? destinations
    : destinations.slice(0, 4);

  const partners = [
    {
      name: "MakeMyTrip",
      url: "https://www.makemytrip.com",
      logo: "https://imgak.mmtcdn.com/pwa_v3/pwa_hotel_assets/favicon.ico",
    },
    {
      name: "Goibibo",
      url: "https://www.goibibo.com",
      logo: "https://goibibo.ibcdn.com/images/ui/favicon.ico",
    },
    {
      name: "IRCTC",
      url: "https://www.irctc.co.in",
      logo: "https://www.irctc.co.in/nget/assets/images/favicon.ico",
    },
    {
      name: "Yatra",
      url: "https://www.yatra.com",
      logo: "https://www.yatra.com/favicon.ico",
    },
    {
      name: "Cleartrip",
      url: "https://www.cleartrip.com",
      logo: "https://www.cleartrip.com/favicon.ico",
    },
    {
      name: "EaseMyTrip",
      url: "https://www.easemytrip.com",
      logo: "https://www.easemytrip.com/favicon.ico",
    },
    {
      name: "Ixigo",
      url: "https://www.ixigo.com",
      logo: "https://www.ixigo.com/favicon.ico",
    },
    {
      name: "RedBus",
      url: "https://www.redbus.in",
      logo: "https://www.redbus.in/favicon.ico",
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 pb-20 px-4">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-sky-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800"></div>

        {/* Decorative circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-sky-200 dark:bg-sky-900/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-70 animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-indigo-200 dark:bg-indigo-900/20 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-70 animate-float-slow"></div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-8">
              <Sparkles className="h-4 w-4" />
              <span>🇮🇳 AI-Powered Travel Planning for India</span>
            </div>

            {/* Main headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Explore Incredible
              <br />
              <span className="gradient-text">India with AI</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
              From Kashmir to Kanyakumari — plan your perfect trip across India
              with AI assistance. Flights, weather, local guides, all in one
              place.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate("/search")}
                className="group flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full text-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
              >
                <Play className="h-5 w-5" />
                Start Planning Free
              </button>
              <button
                onClick={() => navigate("/search")}
                className="flex items-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 rounded-full text-lg font-semibold hover:border-gray-300 dark:hover:border-gray-600 transition-all hover:scale-105"
              >
                Get Started Free
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Hero Image Grid with Floating Cards */}
          <div className="relative mt-16 max-w-5xl mx-auto">
            {/* Central Phone/App mockup with destination image */}
            <div className="relative mx-auto w-64 sm:w-80">
              <div className="relative bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
                <div className="bg-gray-900 rounded-[2.5rem] overflow-hidden">
                  <img
                    src={createGradientPlaceholder(
                      "#1e3a5f",
                      "#3b82f6",
                      400,
                      600,
                    )}
                    alt="Beautiful Ladakh destination"
                    className="w-full h-96 object-cover"
                  />
                  {/* Overlay content */}
                  <div className="absolute bottom-20 left-4 right-4">
                    <div className="flex items-center gap-2 text-white">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <MapPin className="h-4 w-4" />
                      </div>
                      <span className="font-medium">Ladakh</span>
                      <span className="ml-auto bg-red-500 px-2 py-0.5 rounded-full text-xs flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                        Live
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating stat cards */}
            {/* Left side - Engagement card */}
            <div className="absolute left-0 sm:-left-8 top-1/4 animate-float">
              <div className="bg-yellow-400 dark:bg-yellow-500 rounded-2xl p-4 shadow-xl">
                <div className="text-xs font-medium text-yellow-800 mb-1">
                  Engagement
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-yellow-800" />
                  <span className="text-2xl font-bold text-yellow-900">
                    40%
                  </span>
                  <span className="text-yellow-800">↑</span>
                </div>
              </div>
            </div>

            {/* Left side - Product card */}
            <div className="absolute -left-4 sm:-left-16 bottom-1/4 animate-float-delayed">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-xl">
                <img
                  src={createGradientPlaceholder(
                    "#3b82f6",
                    "#06b6d4",
                    100,
                    100,
                  )}
                  alt="Kerala Backwaters"
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-3 w-3 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right side - Items sold card */}
            <div className="absolute right-0 sm:-right-8 top-1/4 animate-float-slow">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      8
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      destinations
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500">
                      this week
                    </div>
                  </div>
                  <img
                    src={createGradientPlaceholder(
                      "#0ea5e9",
                      "#06b6d4",
                      60,
                      80,
                    )}
                    alt="Goa Beaches"
                    className="w-12 h-16 rounded-lg object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right side - Social card */}
            <div className="absolute -right-4 sm:-right-12 bottom-1/4 animate-float-delayed">
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={createGradientPlaceholder(
                    "#22c55e",
                    "#10b981",
                    150,
                    120,
                  )}
                  alt="Munnar Tea Gardens"
                  className="w-36 h-24 object-cover"
                />
                <div className="p-2 flex items-center justify-between">
                  <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                    1.5k
                  </span>
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                    <MessageCircle className="h-4 w-4 text-gray-400" />
                    <Send className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners/Brands Section */}
      <section className="py-12 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {partners.map((partner, index) => (
              <a
                key={index}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all group"
                title={partner.name}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-6 w-6 object-contain opacity-60 group-hover:opacity-100 transition-opacity"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "block";
                  }}
                />
                <span className="text-sm sm:text-base font-semibold text-gray-400 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                  {partner.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 dark:bg-blue-900/50 rounded-2xl mb-4">
                    <IconComponent className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Powerful AI tools to make your travel planning effortless
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:-translate-y-2"
              >
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl mb-6 text-white shadow-lg`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Popular Destinations in India
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Explore trending destinations across incredible India
              </p>
            </div>
            <button
              onClick={() => setShowAllDestinations(!showAllDestinations)}
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-blue-600 dark:text-blue-400 font-semibold border-2 border-blue-500 dark:border-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all"
            >
              {showAllDestinations ? "Show Less" : "View All"}
              {showAllDestinations ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronRight className="h-5 w-5" />
              )}
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedDestinations.map((dest, index) => (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-2"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <button className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                    <Heart className="h-5 w-5" />
                  </button>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {dest.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {dest.rating}
                      </span>
                    </div>
                    <span className="text-gray-400 dark:text-gray-500">•</span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {dest.reviews} reviews
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile View All Button & Destination Count */}
          <div className="mt-8 flex flex-col items-center gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {showAllDestinations
                ? `Showing all ${destinations.length} destinations`
                : `Showing 4 of ${destinations.length} destinations`}
            </p>
            <button
              onClick={() => setShowAllDestinations(!showAllDestinations)}
              className="sm:hidden flex items-center gap-2 px-6 py-3 text-blue-600 dark:text-blue-400 font-semibold border-2 border-blue-500 dark:border-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all"
            >
              {showAllDestinations
                ? "Show Less"
                : `View All ${destinations.length} Destinations`}
              {showAllDestinations ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronRight className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-500 via-sky-500 to-indigo-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Explore India?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join thousands of Indian travelers who plan their perfect trips with
            TripAgent AI assistance.
          </p>
          <button
            onClick={() => navigate("/search")}
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-gray-900 rounded-full text-lg font-bold hover:bg-gray-100 transition-all shadow-2xl hover:scale-105"
          >
            <Sparkles className="h-5 w-5" />
            Plan Your India Trip
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 dark:bg-black text-gray-400">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-blue-400 to-sky-500 rounded-lg p-1.5">
                <Plane className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">TripAgent</span>
            </div>
            <div className="flex items-center gap-8 text-sm">
              <a href="#" className="hover:text-white transition-colors">
                About
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Features
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Pricing
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Contact
              </a>
            </div>
            <p className="text-sm">© 2026 TripAgent. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
