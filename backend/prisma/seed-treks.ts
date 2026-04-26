import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed Regions first (Trek depends on Region)
  const regionsData = [
    {
      name: "Everest Region",
      slug: "everest",
      trailCount: 15,
      altitude: 5364,
      description: "Home to the world's highest peak, the Everest region (Khumbu) offers legendary trails through Sherpa heartlands and ancient monasteries.",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2671",
    },
    {
      name: "Annapurna Region",
      slug: "annapurna",
      trailCount: 22,
      altitude: 4130,
      description: "Diverse landscapes ranging from subtropical forests to high-altitude deserts, featuring the iconic Annapurna Massif and Machhapuchhre.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2670",
    },
    {
      name: "Langtang Region",
      slug: "langtang",
      trailCount: 8,
      altitude: 3870,
      description: "The closest alpine region to Kathmandu, famous for its 'Valley of Glaciers' and authentic Tamang culture.",
      image: "https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?q=80&w=2670",
    },
    {
      name: "Manaslu Region",
      slug: "manaslu",
      trailCount: 6,
      altitude: 5106,
      description: "A restricted area offering a pristine circuit around the world's eighth-highest mountain, Manaslu.",
      image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=80&w=2670",
    },
    {
      name: "Mustang Region",
      slug: "mustang",
      trailCount: 10,
      altitude: 3840,
      description: "The rain-shadow area of Nepal, featuring Tibetan-influenced culture, ancient caves, and red-rock desert landscapes.",
      image: "https://images.unsplash.com/photo-1623492701902-47dc207df5dc?q=80&w=2670",
    }
  ];

  const regions = [];
  for (const region of regionsData) {
    const r = await prisma.region.upsert({
      where: { slug: region.slug },
      update: region,
      create: region,
    });
    regions.push(r);
  }
  console.log('✅ Regions seeded');

  // Seed Treks
  const treksData = [
    {
      slug: "everest-base-camp",
      name: "Everest Base Camp Trek",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2671",
      duration: "12 Days",
      difficulty: "Hard",
      altitude: 5364,
      description: "A legendary journey to the foot of the world's highest peak, Mount Everest.",
      longDescription: [
        "The Everest Base Camp trek is a once-in-a-lifetime adventure that takes you through the heart of the Khumbu region. You will fly into the world's most dangerous airport at Lukla and begin a journey through Sherpa villages like Namche Bazaar.",
        "The trail offers stunning views of Everest, Lhotse, and Ama Dablam, culminating at the iconic base camp and the vantage point of Kala Patthar for the best sunrise views of the roof of the world.",
        "Experience the deep spirituality of Tengboche Monastery and the resilience of the mountain people who call this rugged landscape home."
      ],
      bestMonths: ["March", "April", "May", "October", "November"],
      highlights: [
        "Stand at the foot of Mt. Everest (5,364m)",
        "Sunrise views from Kala Patthar (5,545m)",
        "Sherpa culture and high-altitude monasteries",
        "The thrilling flight to Lukla"
      ],
      tips: [
        "Drink at least 4 liters of water daily",
        "Walk slowly and maintain a steady pace",
        "Bring a good quality down jacket and sleeping bag"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2671",
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2671"
      ],
      itinerary: [
        { day: 1, title: "Fly to Lukla, trek to Phakding", description: "A short flight followed by a 3-hour trek." },
        { day: 2, title: "Trek to Namche Bazaar", description: "A challenging 6-hour climb to the Sherpa capital." },
        { day: 3, title: "Acclimatization Day in Namche", description: "Hike to Everest View Hotel for the first glimpse of Everest." },
        { day: 4, title: "Trek to Tengboche", description: "Visit the famous Tengboche Monastery." },
        { day: 5, title: "Trek to Dingboche", description: "Entering the alpine zone with stunning views." }
      ],
      estimatedCost: { budget: "$1,350", includes: ["Flights", "Permits", "Guide", "Porter", "Meals"] },
      permits: ["Sagarmatha National Park Permit", "Pasang Lhamu Rural Municipality Permit"],
      regionId: regions.find(r => r.slug === 'everest')?.id
    },
    {
      slug: "annapurna-base-camp",
      name: "Annapurna Base Camp Trek",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2670",
      duration: "10 Days",
      difficulty: "Moderate",
      altitude: 4130,
      description: "A spectacular trek into a natural amphitheater surrounded by massive 7,000m and 8,000m peaks.",
      longDescription: [
        "The Annapurna Base Camp (ABC) trek is one of the most popular routes in Nepal. It takes you through diverse terrain, from terraced rice fields to dense rhododendron forests and finally to the stark alpine sanctuary.",
        "The sanctuary is a massive bowl surrounded by peaks like Annapurna South, Machhapuchhre (Fishtail), and Hiunchuli. It's a relatively moderate trek compared to Everest, making it accessible to many.",
        "Soak in the natural hot springs at Jhinu Danda on your way back and enjoy the legendary hospitality of the Gurung and Magar villages."
      ],
      bestMonths: ["March", "April", "May", "September", "October", "November"],
      highlights: [
        "360-degree mountain views from the Sanctuary",
        "Rhododendron forests in full bloom (Spring)",
        "Natural hot springs at Jhinu Danda",
        "Views of the 'Fishtail' peak (Machhapuchhre)"
      ],
      tips: [
        "Prepare for lots of stone stairs",
        "Try the local Gurung bread",
        "The trail can be slippery during early spring"
      ],
      gallery: [],
      itinerary: [
        { day: 1, title: "Drive to Nayapul, trek to Ghandruk", description: "Starting the journey through beautiful Gurung villages." },
        { day: 2, title: "Trek to Chhomrong", description: "A day of many steps with great views of Annapurna South." }
      ],
      estimatedCost: { budget: "$950", includes: ["Permits", "Guide", "Meals", "Transport from Pokhara"] },
      permits: ["ACAP Permit", "TIMS Card"],
      regionId: regions.find(r => r.slug === 'annapurna')?.id
    },
    {
      slug: "manaslu-circuit",
      name: "Manaslu Circuit Trek",
      image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=80&w=2670",
      duration: "14 Days",
      difficulty: "Hard",
      altitude: 5106,
      description: "The 'New Everest'—a remote and culturally rich circuit around the eighth-highest peak.",
      longDescription: [
        "The Manaslu Circuit is gaining popularity as a remote alternative to the Annapurna Circuit. It offers a perfect blend of high-altitude scenery and rich Tibetan-Buddhist culture.",
        "The trek crosses the challenging Larkya La Pass (5,106m) and follows the Budi Gandaki River through steep gorges and high-altitude plateaus.",
        "Because it's a restricted area, it remains less crowded and perfectly preserved, offering a raw Himalayan experience."
      ],
      bestMonths: ["March", "April", "May", "October", "November"],
      highlights: [
        "Crossing the Larkya La Pass (5,106m)",
        "Pristine Tibetan culture in Samagaon",
        "Views of Manaslu, the 'Mountain of the Spirit'",
        "Uncrowded trails and remote villages"
      ],
      tips: [
        "This trek requires a special restricted area permit",
        "You must trek with a licensed guide and at least two people",
        "Prepare for very basic accommodation in some sections"
      ],
      gallery: [],
      itinerary: [],
      estimatedCost: { budget: "$1,200", includes: ["Restricted Area Permit", "Guide", "Meals"] },
      permits: ["Manaslu Restricted Area Permit", "MCAP Permit", "ACAP Permit"],
      regionId: regions.find(r => r.slug === 'manaslu')?.id
    },
    {
      slug: "langtang-valley",
      name: "Langtang Valley Trek",
      image: "https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?q=80&w=2670",
      duration: "7 Days",
      difficulty: "Moderate",
      altitude: 3870,
      description: "A short but incredibly rewarding trek into a beautiful glaciated valley near Kathmandu.",
      longDescription: [
        "Langtang is often called the 'most beautiful valley in the world'. It was heavily affected by the 2015 earthquake but has shown incredible resilience and is now fully open for trekkers.",
        "The trail climbs through forests of pine and bamboo to the high alpine pastures of Kyanjin Gompa, where you can taste local yak cheese and climb Kyanjin Ri for panoramic views.",
        "This is an ideal trek for those with limited time who still want a full Himalayan experience."
      ],
      bestMonths: ["March", "April", "May", "September", "October", "November"],
      highlights: [
        "Kyanjin Gompa and its ancient monastery",
        "Climbing Kyanjin Ri (4,773m) for 360-degree views",
        "Authentic Tamang culture and hospitality",
        "The legendary Yak Cheese factory"
      ],
      tips: [
        "A great first-time Himalayan trek",
        "Support the local community by staying in locally-owned lodges",
        "Don't miss the sunrise from Kyanjin Ri"
      ],
      gallery: [],
      itinerary: [],
      estimatedCost: { budget: "$700", includes: ["Permits", "Transport", "Meals", "Guide"] },
      permits: ["Langtang National Park Permit", "TIMS Card"],
      regionId: regions.find(r => r.slug === 'langtang')?.id
    },
    {
      slug: "upper-mustang",
      name: "Upper Mustang Trek",
      image: "https://images.unsplash.com/photo-1623492701902-47dc207df5dc?q=80&w=2670",
      duration: "12 Days",
      difficulty: "Moderate",
      altitude: 3840,
      description: "A journey into the forbidden kingdom of Lo, featuring desert-like landscapes and ancient Buddhist culture.",
      longDescription: [
        "Upper Mustang is a hidden gem in the rain shadow of the Himalayas. It's a land of red cliffs, deep canyons, and mysterious ancient caves carved into the hillsides.",
        "The walled city of Lo Manthang is the heart of the region, where the King of Mustang once resided. The culture here is deeply Tibetan and has remained largely unchanged for centuries.",
        "The landscape is a stark contrast to the rest of Nepal, offering a desert-like experience with towering mountains as a backdrop."
      ],
      bestMonths: ["May", "June", "July", "August", "September", "October"],
      highlights: [
        "The walled city of Lo Manthang",
        "Ancient 'Sky Caves' carved into cliffs",
        "Tibetan-Buddhist monasteries and Tiji Festival",
        "Unique rain-shadow desert landscape"
      ],
      tips: [
        "Great for trekking during the monsoon season",
        "Restricted area permit is expensive (\$500 for 10 days)",
        "The winds in the afternoon can be very strong"
      ],
      gallery: [],
      itinerary: [],
      estimatedCost: { budget: "$2,200", includes: ["Restricted Area Permit", "Flights to Jomsom", "Guide", "Meals"] },
      permits: ["Upper Mustang Restricted Area Permit", "ACAP Permit"],
      regionId: regions.find(r => r.slug === 'mustang')?.id
    }
  ];

  for (const trekData of treksData) {
    if (trekData.regionId) {
      await prisma.trek.upsert({
        where: { slug: trekData.slug },
        update: trekData,
        create: trekData as any,
      });
    }
  }

  console.log('✅ Treks seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
