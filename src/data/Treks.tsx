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
  gallery?: string[];
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
    image:
      "https://i.pinimg.com/1200x/98/1b/2d/981b2d7f86a5206bc1dbe334e00da65a.jpg",
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
  },
  {
    slug: toSlug("Annapurna Circuit"),
    name: "Annapurna Circuit",
    image:
      "https://i.pinimg.com/1200x/cf/5e/7f/cf5e7f730fc61a2a1a1c7e58fcb0f34c.jpg",
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
  },
  {
    slug: toSlug("Langtang Valley"),
    name: "Langtang Valley",
    image:
      "https://i.pinimg.com/1200x/3f/8c/7e/3f8c7e734cf9f2a2b897cfcdd7ff5364.jpg",
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
  },
  {
    slug: toSlug("Manaslu Circuit"),
    name: "Manaslu Circuit",
    image:
      "https://i.pinimg.com/1200x/f1/6c/62/f16c62e4f41b78114eac8dd6a1dbb95f.jpg",
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
  },
  {
    slug: toSlug("Gokyo Lakes"),
    name: "Gokyo Lakes",
    image:
      "https://i.pinimg.com/1200x/65/8c/52/658c523f7e936d0219e9e99e0c89d50e.jpg",
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
  },
];

// ✅ Utilities
export function getTrekBySlug(slug: string): Trek | undefined {
  return treksData.find((t) => t.slug === slug);
}

export function getAllTrekSlugs(): string[] {
  return treksData.map((t) => t.slug);
}
