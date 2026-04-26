import { PrismaClient } from '@prisma/client'
import * as process from 'process'

const prisma = new PrismaClient()

const seasonsData = [
  {
    slug: "spring",
    name: "Spring",
    image: "https://i.pinimg.com/736x/20/4b/7b/204b7b34290c881a13e0d347d23466f1.jpg",
    description: "Blooming trails and perfect weather for hikes.",
    tagline: "Blooming Trails and Azure Skies",
    temperature: "15°C to 25°C",
    duration: "March - May",
    climateType: "Temperate and Blooming",
    bestMonths: ["March", "April", "May"],
    longDescription: [
      "Spring in Nepal (March to May) is a season of rebirth, when nature shakes off winter’s chill and bursts into a celebration of color. Across the hillsides, forests turn into vibrant tapestries of pink, red, and white rhododendrons, complemented by blooming magnolias and orchids. Trekkers walking through trails like Ghorepani, Langtang, and Annapurna find themselves surrounded by petals underfoot and blossoms overhead, while distant snow-capped peaks stand in crisp contrast under clear blue skies.",
      "Temperatures are pleasantly warm in the day and refreshingly cool at night, making this one of the most comfortable trekking periods. Wildlife viewing in Chitwan and Bardiya National Parks is particularly rewarding, with migratory birds and active mammals filling the lush grasslands. On the cultural side, spring coincides with Holi—the festival of colors—where locals joyfully splash water and powdered pigments, turning towns into living rainbows."
    ],
    highlights: [
      "Rhododendron blooms along trekking trails",
      "Crystal-clear mountain views",
      "Comfortable day temperatures"
    ],
    tips: [
      "Book permits early for popular trails.",
      "Carry layers—mornings and evenings can still be cool.",
      "Expect higher trail traffic on classic routes."
    ],
    gallery: [],
    weatherPatterns: ["Dry mornings", "Occasional afternoon showers", "Stable high altitude air"],
    natureChanges: ["Rhododendron forests in full bloom", "Wildflower meadows", "Active bird migrations"],
    culturalAspects: ["Holi Festival (Festival of Colors)", "Nepali New Year (Baisakh)", "Local agricultural planting"],
    activities: ["High altitude trekking", "Peak climbing", "Wildlife safaris"],
    climateDetails: ["Mild humidity", "Low rainfall", "Moderate UV levels"],
    bestActivities: ["Everest Base Camp Trek", "Annapurna Circuit", "Langtang Valley"],
    whatToWear: ["Light trekking shirts", "Mid-layer fleece", "Sun hat and sunglasses"],
    regionalVariations: ["Warmer in Terai", "Pleasant in mid-hills", "Cool in high Himalayas"]
  },
  {
    slug: "summer",
    name: "Summer",
    image: "https://i.pinimg.com/1200x/a4/8d/38/a48d38b909a472a7cf03dadcdee52a63.jpg",
    description: "Crystal clear lakes and lush green valleys.",
    tagline: "Lush Valleys and Vibrant Monsoon Life",
    temperature: "20°C to 30°C",
    duration: "June - August",
    climateType: "Monsoon / Humid",
    bestMonths: ["June", "July", "August"],
    longDescription: [
      "Summer in Nepal (June to August) is synonymous with the monsoon—a season that breathes life into every corner of the country. Rainfall sweeps across the hills and plains, painting the valleys in a hundred shades of green. Rice terraces glisten under the clouds, rivers swell into roaring torrents, and waterfalls cascade dramatically down mountain cliffs.",
      "This is a time when rural Nepal hums with agricultural activity. Travelers visiting villages will see farmers ankle-deep in water, planting rice seedlings in neat rows, often to the beat of folk songs. The air is fresh and earthy after rainfall, and fewer visitors mean quieter trails and lower prices."
    ],
    highlights: ["Lush greenery", "Fewer crowds", "Vibrant waterfalls"],
    tips: [
      "Pack rain protection and quick-dry layers.",
      "Consider rain-shadow regions to avoid heavy monsoon.",
      "Leech socks can be helpful on jungle trails."
    ],
    gallery: [],
    weatherPatterns: ["Daily rainfall", "Monsoon clouds", "Occasional bright breaks"],
    natureChanges: ["Intense green landscapes", "Rushing rivers", "Abundant waterfall activity"],
    culturalAspects: ["Rice planting festivals", "Local agrarian traditions", "Lush mountain culture"],
    activities: ["Rain-shadow trekking (Mustang)", "Cultural tours", "Water-based activities"],
    climateDetails: ["High humidity", "Warm temperatures", "Heavy rainfall"],
    bestActivities: ["Upper Mustang Trek", "Dolpo Exploration", "Kathmandu Valley Sightseeing"],
    whatToWear: ["Raincoat / Poncho", "Waterproof boots", "Quick-dry synthetic clothing"],
    regionalVariations: ["Dry in rain-shadow areas", "Very wet in southern plains", "Cloudy in mid-hills"]
  },
  {
    slug: "autumn",
    name: "Autumn",
    image: "https://i.pinimg.com/1200x/04/1a/09/041a09f90fb85d0725a79b967a7c0fdb.jpg",
    description: "Golden forests and traditional village festivals.",
    tagline: "The Golden Peak Season of Clarity",
    temperature: "10°C to 20°C",
    duration: "September - November",
    climateType: "Dry and Clear",
    bestMonths: ["September", "October", "November"],
    longDescription: [
      "Autumn (September to November) is the crown jewel of Nepal’s travel seasons, drawing trekkers, climbers, and culture-seekers from around the world. The monsoon rains have washed the skies clear, revealing Himalayan giants in sharp detail—Everest, Annapurna, and Dhaulagiri shining under brilliant blue.",
      "Beyond its natural allure, autumn is steeped in cultural richness. The season hosts Nepal’s grandest celebrations—Dashain, a festival symbolizing the triumph of good over evil, and Tihar, the luminous festival of lights. Streets and homes are adorned with lanterns and rangoli, while families gather to share traditional feasts."
    ],
    highlights: ["Best mountain visibility", "Festival season", "Prime trekking"],
    tips: [
      "Book accommodation and guides in advance.",
      "Bring sun protection—UV can be intense at altitude.",
      "Expect lively cities and villages with festive decor."
    ],
    gallery: [],
    weatherPatterns: ["Extremely clear skies", "Low wind", "Stable high pressure"],
    natureChanges: ["Golden harvested fields", "Sharp mountain silhouettes", "Drying landscapes"],
    culturalAspects: ["Dashain Festival", "Tihar (Festival of Lights)", "Peak tourist season vibes"],
    activities: ["Base camp trekking", "High pass crossings", "Mountaineering expeditions"],
    climateDetails: ["Low humidity", "Crisp air", "High daytime visibility"],
    bestActivities: ["Manaslu Circuit", "EBC and Three Passes", "Annapurna Base Camp"],
    whatToWear: ["Down jacket for evenings", "Hiking trousers", "Thermals for altitude"],
    regionalVariations: ["Perfect across all altitudes", "Warm Terai", "Chilly high altitude nights"]
  },
  {
    slug: "winter",
    name: "Winter",
    image: "https://i.pinimg.com/736x/b5/29/e9/b529e9830fbd52a1cf8911dc289d9464.jpg",
    description: "Snowy peaks and peaceful mountain retreats.",
    tagline: "Serenity in the Snow-Capped Silence",
    temperature: "0°C to 15°C",
    duration: "December - February",
    climateType: "Cold and Sunny",
    bestMonths: ["December", "January", "February"],
    longDescription: [
      "Winter (December to February) in Nepal paints the landscape in crisp whites and cool blues, offering a tranquil, crowd-free escape. While snow makes high mountain passes challenging, lower-altitude treks like Ghorepani Poon Hill, Helambu, and the Kathmandu Valley rim remain accessible and rewarding.",
      "In the Himalayas, freshly fallen snow glitters under the winter sun, creating breathtaking scenery for photographers and nature lovers. Cities like Kathmandu and Pokhara enjoy mild, sunny days perfect for sightseeing, while evenings invite cozy moments around fire pits."
    ],
    highlights: ["Quieter trails", "Clear horizons", "Cultural immersion"],
    tips: [
      "Pack warm layers and insulated footwear.",
      "Choose lower elevation routes to avoid heavy snow.",
      "Shorter daylight hours—plan accordingly."
    ],
    gallery: [],
    weatherPatterns: ["Bright sunny days", "Cold nights", "Heavy snow at high altitude"],
    natureChanges: ["Snow-covered trails", "Frozen waterfalls", "Clear winter horizons"],
    culturalAspects: ["Losar (Tibetan New Year)", "Maha Shivaratri", "Peaceful monastery retreats"],
    activities: ["Short mountain treks", "Cultural city tours", "Photography expeditions"],
    climateDetails: ["Very low humidity", "Freezing nights at altitude", "Intense daytime sun"],
    bestActivities: ["Poon Hill Trek", "Everest View Trek", "Pokhara Lakeside Relaxation"],
    whatToWear: ["Insulated down jacket", "Thermal base layers", "Gloves and beanie"],
    regionalVariations: ["Sunny but cool mid-hills", "Foggy Terai mornings", "Freezing Himalayas"]
  },
  {
    slug: "festivals",
    name: "Festivals",
    image: "https://i.pinimg.com/1200x/46/14/e3/4614e3974aa171267fc4096895b67610.jpg",
    description: "Dashain, Tihar, Holi and more cultural joy.",
    tagline: "The Vibrant Soul of Nepali Tradition",
    temperature: "Varies",
    duration: "Year-round",
    climateType: "Diverse",
    bestMonths: ["All Year"],
    longDescription: [
      "Nepal’s festivals are a window into the soul of the nation—a blend of spirituality, community, and joyous celebration. Spread throughout the year, each festival carries its own unique flavor and cultural significance.",
      "From the color-splashed streets of Holi in Spring to the luminous oil lamps of Tihar in Autumn, every celebration brings communities together. Participating in these festivals is more than just sightseeing—it’s an invitation to join in the heartbeat of Nepali life."
    ],
    highlights: [
      "Dashain and Tihar (Autumn)",
      "Holi (Spring)",
      "Local jatras and processions"
    ],
    tips: [
      "Check festival dates in advance.",
      "Be respectful of local customs and rituals.",
      "Join guided cultural walks for deeper context."
    ],
    gallery: [],
    weatherPatterns: ["Varies by season"],
    natureChanges: ["Seasonal shifts during major events"],
    culturalAspects: ["Rich religious rituals", "Traditional music and dance", "Deep community bonding"],
    activities: ["Cultural photography", "Temple visits", "Community feast participation"],
    climateDetails: ["Changes with the lunar calendar"],
    bestActivities: ["Kathmandu Durbar Square Jatra", "Indra Jatra", "Buddha Jayanti in Lumbini"],
    whatToWear: ["Respectful modest clothing", "Comfortable walking shoes", "Festival specific items (white for Holi)"],
    regionalVariations: ["Unique celebrations in Newar communities", "Sherpa festivals in mountains", "Terai-specific events like Chhath"]
  }
]

async function main() {
  console.log('Seeding seasons...')
  for (const season of seasonsData) {
    await prisma.season.upsert({
      where: { slug: season.slug },
      update: season,
      create: season,
    })
  }
  console.log('Seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
