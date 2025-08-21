export type Trek = {
  slug: string;
  name: string;
  image: string;
  description: string;
  longDescription: string[];
  altitude: number;
  duration: string; // e.g. "12-14 days"
  difficulty: string; // e.g. "Moderate", "Challenging"
  bestMonths: string[];
  highlights: string[];
  tips: string[];
  gallery: string[];
  itinerary: { day: number; title: string; description: string }[]; // ✅ added
  estimatedCost: { budget: string; includes: string[] }; // ✅ added
  permits: string[]; // ✅ added
};

// ✅ helper function
function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

// ✅ Treks data
export const treksData: Trek[] = [
  {
    slug: toSlug("Everest Base Camp"),
    name: "Everest Base Camp",
    image: "/Images/TrekImages/ebc.jpg",
    duration: "12-14 days",
    difficulty: "Hard",
    description:
      "The Everest Base Camp Trek is one of the most famous treks in the world, offering breathtaking views of the world’s tallest peak.",
    longDescription: [
      "Follow in the footsteps of legendary mountaineers to the base of the world’s highest mountain.",
      "Experience Sherpa culture, monasteries, and incredible Himalayan landscapes.",
    ],
    altitude: 5364, // meters
    bestMonths: ["March", "April", "May", "October", "November"],
    highlights: [
      "Panoramic views of Everest, Lhotse, Nuptse, and Ama Dablam",
      "Sherpa culture and monasteries",
      "Reaching Everest Base Camp",
    ],
    tips: [
      "Acclimatize properly to avoid altitude sickness.",
      "Carry a down jacket and good trekking boots.",
      "Start early to avoid afternoon clouds.",
    ],
    gallery: [
      "https://i.pinimg.com/1200x/20/6d/c8/206dc8f388c1a8701f038b99f30f7c70.jpg",
      "https://i.pinimg.com/1200x/92/b9/2e/92b92ed0f8fc8b5d7e802e963da08d4b.jpg",
    ],
    itinerary: [
      { day: 1, title: "Fly to Lukla (2,860 m), trek to Phakding (2,610 m)", description: "30-min flight, then trek 3–4 hrs along Dudh Koshi River to Phakding." },
      { day: 2, title: "Trek to Namche Bazaar (3,440 m)", description: "6–7 hrs hike through pine forests & suspension bridges to reach Sherpa hub." },
      { day: 3, title: "Acclimatization at Namche", description: "Short hike to Everest View Hotel (3,880 m) for panoramic mountain views." },
      { day: 4, title: "Trek to Tengboche (3,860 m)", description: "5–6 hrs trek to Tengboche Monastery with Everest & Ama Dablam views." },
      { day: 5, title: "Trek to Dingboche (4,410 m)", description: "5–6 hrs trek past rhododendron forests & alpine meadows." },
      { day: 6, title: "Acclimatization at Dingboche", description: "Short hike to Nangkartshang Peak (5,083 m) for views of Makalu & Lhotse." },
      { day: 7, title: "Trek to Lobuche (4,910 m)", description: "5–6 hrs trek through rocky terrain & climber memorials." },
      { day: 8, title: "Trek to Gorak Shep, hike to Everest Base Camp", description: "3 hrs trek to Gorak Shep, then hike to EBC (5,364 m)." },
      { day: 9, title: "Hike Kala Patthar (5,545 m), descend to Pheriche", description: "Best sunrise view of Everest, then descend 6–7 hrs to Pheriche." },
      { day: 10, title: "Trek to Namche Bazaar", description: "6–7 hrs downhill trek back to Namche." },
      { day: 11, title: "Trek to Lukla", description: "6–7 hrs descend, final night celebration." },
      { day: 12, title: "Fly back to Kathmandu", description: "Morning flight to Kathmandu, rest & relax." },
    ],
    estimatedCost: {
      budget: "$1,200–$1,500 per person",
      includes: [
        "Domestic flights (Kathmandu–Lukla)",
        "Meals during trek",
        "Accommodation",
        "Guide & porter",
        "Permits",
      ],
    },
    permits: [
      "Sagarmatha National Park Entry Permit",
      "Khumbu Pasang Lhamu Rural Municipality Permit",
    ],
  },
  {
    slug: toSlug("Annapurna Circuit"),
    name: "Annapurna Circuit",
    image:
      "/Images/TrekImages/ac.jpg",
    duration: "15-20 days",
    difficulty: "Moderate to Hard",
    description:
      "The Annapurna Circuit Trek offers diverse landscapes, rich culture, and stunning views of the Annapurna and Dhaulagiri ranges.",
    longDescription: [
      "Travel through subtropical forests, high mountain passes, and Tibetan-influenced villages.",
      "Cross the famous Thorong La Pass, one of the highest trekking passes in the world.",
    ],
    altitude: 5416,
    bestMonths: ["March", "April", "October", "November"],
    highlights: [
      "Thorong La Pass crossing",
      "Varied landscapes from jungle to desert",
      "Cultural immersion with Gurung and Thakali communities",
    ],
    tips: [
      "Train for long days of hiking.",
      "Prepare for both hot and cold weather.",
      "Stay hydrated at high altitude.",
    ],
    gallery: [
      "https://i.pinimg.com/1200x/20/6d/c8/206dc8f388c1a8701f038b99f30f7c70.jpg",
      "https://i.pinimg.com/1200x/92/b9/2e/92b92ed0f8fc8b5d7e802e963da08d4b.jpg",
    ],
    itinerary: [
      { day: 1, title: "Fly to Lukla (2,860 m), trek to Phakding (2,610 m)", description: "30-min flight, then trek 3–4 hrs along Dudh Koshi River to Phakding." },
      { day: 2, title: "Trek to Namche Bazaar (3,440 m)", description: "6–7 hrs hike through pine forests & suspension bridges to reach Sherpa hub." },
      { day: 3, title: "Acclimatization at Namche", description: "Short hike to Everest View Hotel (3,880 m) for panoramic mountain views." },
      { day: 4, title: "Trek to Tengboche (3,860 m)", description: "5–6 hrs trek to Tengboche Monastery with Everest & Ama Dablam views." },
      { day: 5, title: "Trek to Dingboche (4,410 m)", description: "5–6 hrs trek past rhododendron forests & alpine meadows." },
      { day: 6, title: "Acclimatization at Dingboche", description: "Short hike to Nangkartshang Peak (5,083 m) for views of Makalu & Lhotse." },
      { day: 7, title: "Trek to Lobuche (4,910 m)", description: "5–6 hrs trek through rocky terrain & climber memorials." },
      { day: 8, title: "Trek to Gorak Shep, hike to Everest Base Camp", description: "3 hrs trek to Gorak Shep, then hike to EBC (5,364 m)." },
      { day: 9, title: "Hike Kala Patthar (5,545 m), descend to Pheriche", description: "Best sunrise view of Everest, then descend 6–7 hrs to Pheriche." },
      { day: 10, title: "Trek to Namche Bazaar", description: "6–7 hrs downhill trek back to Namche." },
      { day: 11, title: "Trek to Lukla", description: "6–7 hrs descend, final night celebration." },
      { day: 12, title: "Fly back to Kathmandu", description: "Morning flight to Kathmandu, rest & relax." },
    ],
    estimatedCost: {
      budget: "$1,200–$1,500 per person",
      includes: [
        "Domestic flights (Kathmandu–Lukla)",
        "Meals during trek",
        "Accommodation",
        "Guide & porter",
        "Permits",
      ],
    },
    permits: [
      "Sagarmatha National Park Entry Permit",
      "Khumbu Pasang Lhamu Rural Municipality Permit",
    ],
  },
  {
    slug: toSlug("Langtang Valley"),
    name: "Langtang Valley",
    image:
      "/Images/TrekImages/lv.jpg",
    duration: "7-10 days",
    difficulty: "Moderate",
    description:
      "The Langtang Valley Trek is known as the 'valley of glaciers' with close views of Langtang Lirung and traditional Tamang culture.",
    longDescription: [
      "A short yet rewarding trek close to Kathmandu.",
      "Explore Tamang villages and Buddhist monasteries.",
    ],
    altitude: 4984,
    bestMonths: ["March", "April", "October", "November"],
    highlights: [
      "Stunning views of Langtang Lirung",
      "Tamang culture",
      "Kyanjin Gompa and cheese factory",
    ],
    tips: [
      "Good option if you have limited time.",
      "Pack warm clothes for high altitude nights.",
    ],
    gallery: [
      "https://i.pinimg.com/1200x/20/6d/c8/206dc8f388c1a8701f038b99f30f7c70.jpg",
      "https://i.pinimg.com/1200x/92/b9/2e/92b92ed0f8fc8b5d7e802e963da08d4b.jpg",
    ],
    itinerary: [
      { day: 1, title: "Fly to Lukla (2,860 m), trek to Phakding (2,610 m)", description: "30-min flight, then trek 3–4 hrs along Dudh Koshi River to Phakding." },
      { day: 2, title: "Trek to Namche Bazaar (3,440 m)", description: "6–7 hrs hike through pine forests & suspension bridges to reach Sherpa hub." },
      { day: 3, title: "Acclimatization at Namche", description: "Short hike to Everest View Hotel (3,880 m) for panoramic mountain views." },
      { day: 4, title: "Trek to Tengboche (3,860 m)", description: "5–6 hrs trek to Tengboche Monastery with Everest & Ama Dablam views." },
      { day: 5, title: "Trek to Dingboche (4,410 m)", description: "5–6 hrs trek past rhododendron forests & alpine meadows." },
      { day: 6, title: "Acclimatization at Dingboche", description: "Short hike to Nangkartshang Peak (5,083 m) for views of Makalu & Lhotse." },
      { day: 7, title: "Trek to Lobuche (4,910 m)", description: "5–6 hrs trek through rocky terrain & climber memorials." },
      { day: 8, title: "Trek to Gorak Shep, hike to Everest Base Camp", description: "3 hrs trek to Gorak Shep, then hike to EBC (5,364 m)." },
      { day: 9, title: "Hike Kala Patthar (5,545 m), descend to Pheriche", description: "Best sunrise view of Everest, then descend 6–7 hrs to Pheriche." },
      { day: 10, title: "Trek to Namche Bazaar", description: "6–7 hrs downhill trek back to Namche." },
      { day: 11, title: "Trek to Lukla", description: "6–7 hrs descend, final night celebration." },
      { day: 12, title: "Fly back to Kathmandu", description: "Morning flight to Kathmandu, rest & relax." },
    ],
    estimatedCost: {
      budget: "$1,200–$1,500 per person",
      includes: [
        "Domestic flights (Kathmandu–Lukla)",
        "Meals during trek",
        "Accommodation",
        "Guide & porter",
        "Permits",
      ],
    },
    permits: [
      "Sagarmatha National Park Entry Permit",
      "Khumbu Pasang Lhamu Rural Municipality Permit",
    ],
  },
  {
    slug: toSlug("Manaslu Circuit"),
    name: "Manaslu Circuit",
    image:
      "/Images/TrekImages/mc.jpg",
    duration: "14-18 days",
    difficulty: "Hard",
    description:
      "The Manaslu Circuit Trek offers remote trails, Buddhist monasteries, and breathtaking views while circling Mt. Manaslu.",
    longDescription: [
      "A remote alternative to the Annapurna Circuit.",
      "Pass through restricted areas with special permits.",
    ],
    altitude: 5160,
    bestMonths: ["March", "April", "October", "November"],
    highlights: [
      "Crossing Larkya La Pass",
      "Less crowded than Annapurna & Everest",
      "Cultural encounters with Tibetan villages",
    ],
    tips: [
      "Carry cash—ATMs are rare.",
      "Trek with a guide due to permit requirements.",
    ],
    gallery: [
      "https://i.pinimg.com/1200x/20/6d/c8/206dc8f388c1a8701f038b99f30f7c70.jpg",
      "https://i.pinimg.com/1200x/92/b9/2e/92b92ed0f8fc8b5d7e802e963da08d4b.jpg",
    ],
    itinerary: [
      { day: 1, title: "Fly to Lukla (2,860 m), trek to Phakding (2,610 m)", description: "30-min flight, then trek 3–4 hrs along Dudh Koshi River to Phakding." },
      { day: 2, title: "Trek to Namche Bazaar (3,440 m)", description: "6–7 hrs hike through pine forests & suspension bridges to reach Sherpa hub." },
      { day: 3, title: "Acclimatization at Namche", description: "Short hike to Everest View Hotel (3,880 m) for panoramic mountain views." },
      { day: 4, title: "Trek to Tengboche (3,860 m)", description: "5–6 hrs trek to Tengboche Monastery with Everest & Ama Dablam views." },
      { day: 5, title: "Trek to Dingboche (4,410 m)", description: "5–6 hrs trek past rhododendron forests & alpine meadows." },
      { day: 6, title: "Acclimatization at Dingboche", description: "Short hike to Nangkartshang Peak (5,083 m) for views of Makalu & Lhotse." },
      { day: 7, title: "Trek to Lobuche (4,910 m)", description: "5–6 hrs trek through rocky terrain & climber memorials." },
      { day: 8, title: "Trek to Gorak Shep, hike to Everest Base Camp", description: "3 hrs trek to Gorak Shep, then hike to EBC (5,364 m)." },
      { day: 9, title: "Hike Kala Patthar (5,545 m), descend to Pheriche", description: "Best sunrise view of Everest, then descend 6–7 hrs to Pheriche." },
      { day: 10, title: "Trek to Namche Bazaar", description: "6–7 hrs downhill trek back to Namche." },
      { day: 11, title: "Trek to Lukla", description: "6–7 hrs descend, final night celebration." },
      { day: 12, title: "Fly back to Kathmandu", description: "Morning flight to Kathmandu, rest & relax." },
    ],
    estimatedCost: {
      budget: "$1,200–$1,500 per person",
      includes: [
        "Domestic flights (Kathmandu–Lukla)",
        "Meals during trek",
        "Accommodation",
        "Guide & porter",
        "Permits",
      ],
    },
    permits: [
      "Sagarmatha National Park Entry Permit",
      "Khumbu Pasang Lhamu Rural Municipality Permit",
    ],
  },
  {
    slug: toSlug("Gokyo Lakes"),
    name: "Gokyo Lakes",
    image:
      "/Images/TrekImages/gl.jpg",
    duration: "12-14 days",
    difficulty: "Moderate to Hard",
    description:
      "The Gokyo Lakes Trek takes you to turquoise high-altitude lakes with panoramic views of Everest, Lhotse, Makalu, and Cho Oyu.",
    longDescription: [
      "A quieter alternative to the Everest Base Camp trek.",
      "Hike up Gokyo Ri for panoramic views of four 8,000m peaks.",
    ],
    altitude: 5357,
    bestMonths: ["March", "April", "May", "October", "November"],
    highlights: [
      "Turquoise Gokyo Lakes",
      "Gokyo Ri viewpoint",
      "Views of Everest, Cho Oyu, Makalu, Lhotse",
    ],
    tips: [
      "Allow rest days for acclimatization.",
      "Pack layers for changing mountain weather.",
    ],
    gallery: [
      "https://i.pinimg.com/1200x/20/6d/c8/206dc8f388c1a8701f038b99f30f7c70.jpg",
      "https://i.pinimg.com/1200x/92/b9/2e/92b92ed0f8fc8b5d7e802e963da08d4b.jpg",
    ],
    itinerary: [
      { day: 1, title: "Fly to Lukla (2,860 m), trek to Phakding (2,610 m)", description: "30-min flight, then trek 3–4 hrs along Dudh Koshi River to Phakding." },
      { day: 2, title: "Trek to Namche Bazaar (3,440 m)", description: "6–7 hrs hike through pine forests & suspension bridges to reach Sherpa hub." },
      { day: 3, title: "Acclimatization at Namche", description: "Short hike to Everest View Hotel (3,880 m) for panoramic mountain views." },
      { day: 4, title: "Trek to Tengboche (3,860 m)", description: "5–6 hrs trek to Tengboche Monastery with Everest & Ama Dablam views." },
      { day: 5, title: "Trek to Dingboche (4,410 m)", description: "5–6 hrs trek past rhododendron forests & alpine meadows." },
      { day: 6, title: "Acclimatization at Dingboche", description: "Short hike to Nangkartshang Peak (5,083 m) for views of Makalu & Lhotse." },
      { day: 7, title: "Trek to Lobuche (4,910 m)", description: "5–6 hrs trek through rocky terrain & climber memorials." },
      { day: 8, title: "Trek to Gorak Shep, hike to Everest Base Camp", description: "3 hrs trek to Gorak Shep, then hike to EBC (5,364 m)." },
      { day: 9, title: "Hike Kala Patthar (5,545 m), descend to Pheriche", description: "Best sunrise view of Everest, then descend 6–7 hrs to Pheriche." },
      { day: 10, title: "Trek to Namche Bazaar", description: "6–7 hrs downhill trek back to Namche." },
      { day: 11, title: "Trek to Lukla", description: "6–7 hrs descend, final night celebration." },
      { day: 12, title: "Fly back to Kathmandu", description: "Morning flight to Kathmandu, rest & relax." },
    ],
    estimatedCost: {
      budget: "$1,200–$1,500 per person",
      includes: [
        "Domestic flights (Kathmandu–Lukla)",
        "Meals during trek",
        "Accommodation",
        "Guide & porter",
        "Permits",
      ],
    },
    permits: [
      "Sagarmatha National Park Entry Permit",
      "Khumbu Pasang Lhamu Rural Municipality Permit",
    ],
  },
];

// ✅ Utilities
export function getTrekBySlug(slug: string): Trek | undefined {
  return treksData.find((t) => t.slug === slug);
}

export function getAllTrekSlugs(): string[] {
  return treksData.map((t) => t.slug);
}
