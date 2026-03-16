import { 
    Mountain, 
    Map, 
    Compass, 
    Wind, 
    Milestone,
    Utensils,
    Camera,
    Heart,
    Spade
} from "lucide-react";

export const activities = [
    {
        slug: "trekking-hiking",
        title: "Trekking & Hiking",
        tag: "Epic Adventures",
        description: "From the world-famous Everest Base Camp to hidden gems in the Manaslu region. Discover trails that touch the sky. Nepal is the ultimate destination for trekkers, offering everything from short mountain hikes to multi-week high-altitude expeditions.",
        icon: Mountain,
        color: "secondary", // orange
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2070",
        highlights: [
            "Everest Base Camp - The ultimate trek",
            "Annapurna Circuit - Diverse landscapes and culture",
            "Langtang Valley - The valley of glaciers",
            "Manaslu Circuit - A rugged, remote adventure",
            "Short hikes around Kathmandu and Pokhara"
        ]
    },
    {
        slug: "cultural-heritage",
        title: "Cultural Heritage",
        tag: "Timeless Traditions",
        description: "Explore the ancient streets of Patan, witness evening prayers at Pashupatinath, and immerse in local festivals. Nepal's rich cultural tapestry is woven with Hindu and Buddhist traditions, reflected in its stunning architecture and daily rituals.",
        icon: Map,
        color: "blue-600",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2070",
        highlights: [
            "Pashupatinath Temple - Sacred Hindu site",
            "Boudhanath Stupa - Center of Tibetan Buddhism",
            "Lumbini - Birthplace of Buddha",
            "Ancient Durbar Squares of Kathmandu Valley",
            "Vibrant religious festivals year-round"
        ]
    },
    {
        slug: "wildlife-safari",
        title: "Wildlife Safari",
        tag: "Untamed Nature",
        description: "Ride through the jungles of Chitwan or Bardia to spot royal Bengal tigers, one-horned rhinos, and exotic birds. Experience the rich biodiversity of Nepal's tropical plains through jeep safaris, canoe rides, and jungle walks.",
        icon: Compass,
        color: "green-600",
        image: "https://images.unsplash.com/photo-1582268305739-c29026410292?q=80&w=2070",
        highlights: [
            "Spotting One-horned Rhinos in Chitwan",
            "Tracking Bengal Tigers in Bardia",
            "Canoeing in the Rapti River",
            "Elephant breeding centers",
            "Bird watching - Over 500 species"
        ]
    },
    {
        slug: "spiritual-yoga",
        title: "Spiritual & Yoga",
        tag: "Inner Peace",
        description: "Find your zen in Buddhist monasteries, join meditation retreats in the Himalayas, or practice yoga by Fewa Lake. Nepal offers a tranquil environment for spiritual seekers and those looking to reconnect with themselves.",
        icon: Wind,
        color: "purple-600",
        image: "https://images.unsplash.com/photo-1526481280693-3bfa7561693f?q=80&w=2070",
        highlights: [
            "Meditation retreats in monasteries",
            "Yoga classes with Himalayan backdrops",
            "Vipassana meditation sessions",
            "Spiritual walks in sacred valleys",
            "Sound healing and Ayurvedic treatments"
        ]
    },
    {
        slug: "adventure-sports",
        title: "Adventure Sports",
        tag: "High Energy",
        description: "Paragliding over Pokhara, world-class white water rafting, or a thrilling bungee jump over the Bhote Koshi river. Nepal is a playground for adrenaline junkies, offering world-class facilities and breathtaking settings for extreme sports.",
        icon: Milestone,
        color: "red-600",
        image: "https://images.unsplash.com/photo-1571501700685-61845184208a?q=80&w=2070",
        highlights: [
            "Paragliding in Pokhara",
            "White water rafting in Trishuli or Bhote Koshi",
            "Bungee jumping at The Last Resort",
            "Mountain biking in rugged terrains",
            "Zip-lining near the Annapurnas"
        ]
    },
    {
        slug: "local-gastronomy",
        title: "Local Gastronomy",
        tag: "Authentic Flavors",
        description: "Taste the legendary Dal Bhat, Newari feasts, and Himalayan delicacies. A culinary journey through Nepal's diversity. From spicy mountain foods to traditional sweets in the valleys, Nepal's cuisine is as varied as its geography.",
        icon: Utensils,
        color: "amber-600",
        image: "https://images.unsplash.com/photo-1526481280693-3bfa7561693f?q=80&w=2070",
        highlights: [
            "Dal Bhat Power - The staple of Nepal",
            "Momo - The famous Nepalese dumplings",
            "Newari Samay Baji feasts",
            "Traditional Sel Roti sweets",
            "High-altitude yak cheese and tea"
        ]
    }
];
