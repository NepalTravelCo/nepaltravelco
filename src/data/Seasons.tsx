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
      "Spring in Nepal is a vibrant and colorful season, often regarded as one of the best times for trekking and exploration. The hillsides come alive with blooming rhododendrons, magnolias, and wildflowers, creating striking contrasts against the snow-clad Himalayan peaks. Mild daytime temperatures make both high- and mid-altitude treks comfortable, while the air remains fresh and crisp. The season also coincides with major cultural events like Holi, adding bursts of color and festivity to the travel experience. Wildlife viewing is also excellent during this time, with national parks teeming with activity",

      "The clear skies during spring allow for spectacular, uninterrupted views of mountains like Everest, Annapurna, and Langtang. Villages along trekking routes are bustling with activity as locals prepare fields for planting, offering an authentic glimpse into rural Nepali life. Whether exploring cultural heritage sites in Kathmandu Valley or hiking through flower-covered hillsides, spring provides an ideal balance of natural beauty and cultural immersion.",
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
      "Summer in Nepal coincides with the monsoon season, transforming the landscapes into lush green paradises. Heavy rains nourish the valleys, fill rivers to their brim, and create countless waterfalls cascading down hillsides. Although high-altitude treks can be challenging due to slippery trails and cloud cover, rain-shadow regions like Mustang, Dolpo, and Manang remain relatively dry and accessible. These regions offer dramatic desert-like landscapes that stand in stark contrast to the rest of the country’s greenery.",

      "This is also a time when rice planting dominates the rural landscape, with farmers working in flooded terraces—a fascinating cultural scene for visitors. The vibrant greenery and refreshed air bring a sense of renewal to the land, while fewer tourists mean quieter trails and better opportunities for deep cultural engagement. Summer is also an excellent season for photography, with moody skies, rich colors, and dramatic weather patterns.",
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
      "Autumn is considered Nepal’s peak tourist season, thanks to its stable weather, warm days, and crystal-clear skies. This is the prime time for trekking, with mountain ranges visible in all their glory—snow-capped peaks sharply outlined against deep blue skies. Trails across the Everest, Annapurna, and Langtang regions buzz with trekkers from around the world, creating a lively, multicultural atmosphere.",
      "The season is also deeply cultural, as it aligns with Nepal’s biggest festivals—Dashain and Tihar. Villages and cities are decorated with vibrant lights, colorful kites, and traditional patterns, while the air is filled with music, laughter, and the aroma of festive foods. Beyond trekking, autumn is perfect for sightseeing, cultural tours, and wildlife safaris, as animals are active and the terrain is easily navigable.",
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
      "Winter in Nepal offers a serene, peaceful experience with fewer tourists and crisp, clear air. While high mountain passes may be snowbound and inaccessible, lower-altitude treks and cultural explorations are highly rewarding. Popular trails like Ghorepani Poon Hill, Helambu, and the Kathmandu Valley rim provide breathtaking winter vistas without extreme conditions.",
      
      "In the high Himalayas, peaks stand majestically against an intense blue sky, their slopes dusted with fresh snow. In cities and rural towns, winter days are sunny and cool, while evenings invite cozy gatherings around fires. The season is also excellent for cultural immersion—visiting monasteries, exploring heritage sites, and experiencing local winter traditions. For photographers, the clarity of the air brings exceptional visibility and sharp mountain views",
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
      "Nepal’s cultural calendar is filled with festivals that reflect the country’s religious diversity and deep traditions. Dashain, the longest and most significant festival, celebrates the victory of good over evil with family reunions, elaborate feasts, and ceremonial rituals. Tihar, the festival of lights, transforms streets and homes with glowing oil lamps, colorful rangoli, and the melodic songs of children performing Deusi-Bhailo.",

      "In spring, Holi erupts in a joyful explosion of colors, water, and music, uniting communities in playful celebration. Beyond the major festivals, local jatras, processions, and harvest celebrations offer intimate cultural encounters, often unique to specific towns or villages. These events are a rare opportunity for travelers to immerse themselves in Nepal’s living traditions, taste festive foods, and witness age-old rituals passed down through generations.",
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
