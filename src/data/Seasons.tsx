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
      "Spring in Nepal (March to May) is a season of rebirth, when nature shakes off winter’s chill and bursts into a celebration of color. Across the hillsides, forests turn into vibrant tapestries of pink, red, and white rhododendrons, complemented by blooming magnolias and orchids. Trekkers walking through trails like Ghorepani, Langtang, and Annapurna find themselves surrounded by petals underfoot and blossoms overhead, while distant snow-capped peaks stand in crisp contrast under clear blue skies.",

      "Temperatures are pleasantly warm in the day and refreshingly cool at night, making this one of the most comfortable trekking periods. Wildlife viewing in Chitwan and Bardiya National Parks is particularly rewarding, with migratory birds and active mammals filling the lush grasslands. On the cultural side, spring coincides with Holi—the festival of colors—where locals joyfully splash water and powdered pigments, turning towns into living rainbows. For travelers seeking a perfect mix of trekking, wildlife, and cultural immersion, spring offers Nepal at its most charming.",
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
      "Summer in Nepal (June to August) is synonymous with the monsoon—a season that breathes life into every corner of the country. Rainfall sweeps across the hills and plains, painting the valleys in a hundred shades of green. Rice terraces glisten under the clouds, rivers swell into roaring torrents, and waterfalls cascade dramatically down mountain cliffs. While high-altitude trekking can be tricky due to slippery paths and limited visibility, regions in the rain-shadow like Upper Mustang, Dolpo, and Manang remain mostly dry and open for exploration.",

      "This is a time when rural Nepal hums with agricultural activity. Travelers visiting villages will see farmers ankle-deep in water, planting rice seedlings in neat rows, often to the beat of folk songs. The air is fresh and earthy after rainfall, and fewer visitors mean quieter trails and lower prices. For photographers, the dramatic skies and shifting light create breathtaking compositions. Summer is also ideal for those who enjoy cultural immersion, local homestays, and exploring lush, lesser-trodden landscapes.",
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
      "Autumn (September to November) is the crown jewel of Nepal’s travel seasons, drawing trekkers, climbers, and culture-seekers from around the world. The monsoon rains have washed the skies clear, revealing Himalayan giants in sharp detail—Everest, Annapurna, and Dhaulagiri shining under brilliant blue. The weather is stable, with warm days and cool nights, making it perfect for both high-altitude trekking and lowland adventures.",

      "Beyond its natural allure, autumn is steeped in cultural richness. The season hosts Nepal’s grandest celebrations—Dashain, a festival symbolizing the triumph of good over evil, and Tihar, the luminous festival of lights. Streets and homes are adorned with lanterns and rangoli, while families gather to share traditional feasts. Trekkers find villages along routes alive with festivities, music, and dance. Whether you’re scaling mountain passes, strolling through golden forests, or joining in local celebrations, autumn offers Nepal in its most iconic and picture-perfect form.",
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
      "Winter (December to February) in Nepal paints the landscape in crisp whites and cool blues, offering a tranquil, crowd-free escape. While snow makes high mountain passes challenging, lower-altitude treks like Ghorepani Poon Hill, Helambu, and the Kathmandu Valley rim remain accessible and rewarding. These trails offer clear skies, sharp mountain silhouettes, and peaceful paths free from the peak-season rush.",
      
      "In the Himalayas, freshly fallen snow glitters under the winter sun, creating breathtaking scenery for photographers and nature lovers. Cities like Kathmandu and Pokhara enjoy mild, sunny days perfect for sightseeing, while evenings invite cozy moments around fire pits. This is also the season for exploring monasteries, ancient temples, and cultural heritage sites without the bustle of large crowds. Winter in Nepal offers a slower pace, serene beauty, and a unique chance to experience the country’s landscapes and traditions in a more intimate setting.",
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
      "Nepal’s festivals are a window into the soul of the nation—a blend of spirituality, community, and joyous celebration. Spread throughout the year, each festival carries its own unique flavor and cultural significance. Dashain, the country’s largest festival, spans fifteen days and honors the goddess Durga’s victory over evil. Families reunite, elders bless the younger generation, and kites dance in the autumn sky. Tihar follows soon after, illuminating the nights with oil lamps, candles, and colorful rangoli patterns, as each day honors a different animal or deity.",

      "In spring, Holi explodes in a swirl of colors, with people playfully throwing powdered pigments and water in the streets. Many regions host their own jatras—traditional processions that can involve chariots, masked dances, and centuries-old rituals. Visitors can also witness smaller harvest festivals, Buddhist celebrations in monasteries, and regional events tied to the lunar calendar. For travelers, participating in these festivals is more than just sightseeing—it’s an invitation to join in the heartbeat of Nepali life.",
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
