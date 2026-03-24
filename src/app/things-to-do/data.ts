import { 
    Mountain, 
    Map, 
    Compass, 
    Wind, 
    Milestone,
    Utensils
} from "lucide-react";

export const activities = [
    {
        slug: "trekking-hiking",
        title: "Trekking & Hiking",
        tag: "Epic Adventures",
        description: "From the world-famous Everest Base Camp to hidden gems in the Manaslu region. Discover trails that touch the sky. Nepal is the ultimate destination for trekkers, offering everything from short mountain hikes to multi-week high-altitude expeditions.",
        icon: Mountain,
        color: "secondary", // orange
        image: "https://i.pinimg.com/736x/78/cc/5e/78cc5e7dcbff23c68229bdda00a999a8.jpg",
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
        image: "https://i.pinimg.com/736x/a4/06/d7/a406d7f4da651ea5a929deb7e6fac544.jpg",
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
        image: "https://i.pinimg.com/736x/c7/87/0b/c7870bde9d364fe1cc5b1d6b703dc817.jpg",
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
        image: "https://i.pinimg.com/736x/d6/19/d1/d619d179b55df33b59d55dc137f28519.jpg",
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
        image: "https://i.pinimg.com/736x/3a/e2/8c/3ae28cfe33383a22fe4a3ac0d6f9c7e2.jpg",
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
        image: "https://i.pinimg.com/1200x/05/47/ee/0547ee0bbe64263e89252b9237ed6942.jpg",
        highlights: [
            "Dal Bhat Power - The staple of Nepal",
            "Momo - The famous Nepalese dumplings",
            "Newari Samay Baji feasts",
            "Traditional Sel Roti sweets",
            "High-altitude yak cheese and tea"
        ]
    }
];
