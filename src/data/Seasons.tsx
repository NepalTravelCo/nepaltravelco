export type Season = {
  slug: string
  name: string
  image: string
  description: string
  longDescription: string[]
  bestMonths: string[]
  highlights: string[]
  tips: string[]
  gallery?: string[]
}

// Keep slug generation consistent everywhere
export function toSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export const seasonsData: Season[] = [
  {
    slug: toSlug("Spring"),
    name: "Spring",
    image:
      "https://i.pinimg.com/736x/20/4b/7b/204b7b34290c881a13e0d347d23466f1.jpg",
    description: "Blooming trails and perfect weather for hikes.",
    longDescription: [
      "Spring in Nepal is a vibrant season marked by blossoming rhododendrons, clear skies, and pleasant temperatures ideal for trekking across the mid-hills and Himalayan foothills.",
      "Popular routes like Annapurna and Langtang offer spectacular vistas, while cultural sites are lively with seasonal festivities.",
    ],
    bestMonths: ["March", "April", "May"],
    highlights: [
      "Rhododendron blooms along trekking trails",
      "Crystal-clear mountain views",
      "Comfortable day temperatures",
    ],
    tips: [
      "Book permits early for popular trails.",
      "Carry layers—mornings and evenings can still be cool.",
      "Expect higher trail traffic on classic routes.",
    ],
    gallery: [],
  },
  {
    slug: toSlug("Summer"),
    name: "Summer",
    image:
      "https://i.pinimg.com/1200x/a4/8d/38/a48d38b909a472a7cf03dadcdee52a63.jpg",
    description: "Crystal clear lakes and lush green valleys.",
    longDescription: [
      "Summer overlaps the monsoon; landscapes turn emerald and waterfalls surge.",
      "Great for cultural exploration and rain-shadow treks in Mustang or Dolpo.",
    ],
    bestMonths: ["June", "July", "August"],
    highlights: ["Lush greenery", "Fewer crowds", "Vibrant waterfalls"],
    tips: [
      "Pack rain protection and quick-dry layers.",
      "Consider rain-shadow regions to avoid heavy monsoon.",
      "Leech socks can be helpful on jungle trails.",
    ],
  },
  {
    slug: toSlug("Autumn"),
    name: "Autumn",
    image:
      "https://i.pinimg.com/1200x/04/1a/09/041a09f90fb85d0725a79b967a7c0fdb.jpg",
    description: "Golden forests and traditional village festivals.",
    longDescription: [
      "Autumn is peak season—crisp air, stable weather, and clear skies.",
      "It's also the time for major festivals like Dashain and Tihar.",
    ],
    bestMonths: ["September", "October", "November"],
    highlights: ["Best mountain visibility", "Festival season", "Prime trekking"],
    tips: [
      "Book accommodation and guides in advance.",
      "Bring sun protection—UV can be intense at altitude.",
      "Expect lively cities and villages with festive decor.",
    ],
  },
  {
    slug: toSlug("Winter"),
    name: "Winter",
    image:
      "https://i.pinimg.com/736x/b5/29/e9/b529e9830fbd52a1cf8911dc289d9464.jpg",
    description: "Snowy peaks and peaceful mountain retreats.",
    longDescription: [
      "Winter brings quieter trails and crisp horizons.",
      "Lower altitude hikes and cultural tours are comfortable and rewarding.",
    ],
    bestMonths: ["December", "January", "February"],
    highlights: ["Quieter trails", "Clear horizons", "Cultural immersion"],
    tips: [
      "Pack warm layers and insulated footwear.",
      "Choose lower elevation routes to avoid heavy snow.",
      "Shorter daylight hours—plan accordingly.",
    ],
  },
  {
    slug: toSlug("Festivals"),
    name: "Festivals",
    image:
      "https://i.pinimg.com/736x/b0/85/7d/b0857d75f0d95c4dd9200b7d11533e11.jpg",
    description: "Dashain, Tihar, Holi and more cultural joy.",
    longDescription: [
      "Nepal’s calendar is full of festivals—colorful, communal, and deeply spiritual.",
      "From Holi's vibrant colors to Tihar’s lights, each celebration offers a unique experience.",
    ],
    bestMonths: ["Varies by festival"],
    highlights: [
      "Dashain and Tihar (Autumn)",
      "Holi (Spring)",
      "Local jatras and processions",
    ],
    tips: [
      "Check festival dates in advance.",
      "Be respectful of local customs and rituals.",
      "Join guided cultural walks for deeper context.",
    ],
  },
]

export function getSeasonBySlug(slug: string): Season | undefined {
  return seasonsData.find((s) => s.slug === slug)
}

export function getAllSeasonSlugs(): string[] {
  return seasonsData.map((s) => s.slug)
}
