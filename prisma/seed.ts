
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Seed Admin User
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'Admin',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('Admin user seeded:', admin.email);

  // Seed Regions
  const regionsData = [
    {
      name: "Annapurna Region",
      slug: "annapurna",
      trailCount: 12,
      description: "Home to some of the world's most popular trekking routes, offering diverse landscapes from subtropical forests to high-altitude deserts.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2670",
    },
    {
      name: "Everest Region",
      slug: "everest",
      trailCount: 8,
      description: "The legendary Khumbu region, home to the world's highest peak and the resilient Sherpa people.",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2671",
    },
    {
      name: "Langtang Region",
      slug: "langtang",
      trailCount: 5,
      description: "Close to Kathmandu, this region offers stunning glaciated valleys and authentic Tamang culture.",
      image: "https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?q=80&w=2670",
    },
    {
      name: "Manaslu Region",
      slug: "manaslu",
      trailCount: 4,
      description: "A restricted area offering a pristine circuit around the world's eighth-highest mountain.",
      image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=80&w=2670",
    },
    {
      name: "Mustang Region",
      slug: "mustang",
      trailCount: 6,
      description: "The 'Forbidden Kingdom' of Lo, featuring rain-shadow landscapes and ancient Tibetan-Buddhist culture.",
      image: "https://images.unsplash.com/photo-1623492701902-47dc207df5dc?q=80&w=2670",
    },
    {
      name: "Dolpo Region",
      slug: "dolpo",
      trailCount: 3,
      description: "Remote and rugged, Upper Dolpo is a land of turquoise lakes and centuries-old Bon culture.",
      image: "https://images.unsplash.com/photo-1528484461644-4217abc827d4?q=80&w=2670",
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
  console.log('Regions seeded');

  // Seed Treks
  const treks = [
    {
      slug: "everest-base-camp",
      name: "Everest Base Camp",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2671",
      duration: "12-14 days",
      difficulty: "Hard",
      description: "The journey to the foot of the world's highest peak.",
      longDescription: [
        "The Everest Base Camp Trek is a once-in-a-lifetime journey following in the footsteps of legends.",
        "Traverse through Sherpa villages, ancient monasteries, and breathtaking Himalayan landscapes."
      ],
      altitude: 5364,
      bestMonths: ["March", "April", "May", "October", "November"],
      highlights: ["Base Camp (5,364m)", "Kala Patthar views", "Sherpa heartland"],
      tips: ["Acclimatize properly", "Pack lightweight layers"],
      gallery: [],
      itinerary: [
        { day: 1, title: "Fly to Lukla, trek to Phakding", description: "Exciting flight and gentle hike." },
        { day: 2, title: "Namche Bazaar", description: "Steep climb to the Sherpa capital." }
      ],
      estimatedCost: { budget: "$1,200 - $1,600", includes: ["Permits", "Guide", "Accomodation"] },
      permits: ["Sagarmatha National Park Permit", "Khumbu Rural Municipality Permit"],
      regionId: regions.find(r => r.slug === 'everest').id
    },
    {
      slug: "annapurna-circuit",
      name: "Annapurna Circuit",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2670",
      duration: "12-18 days",
      difficulty: "Hard",
      description: "One of the most diverse treks in the world, crossing the Thorong La Pass.",
      longDescription: ["Experience the transition from lush jungles to high-altitude deserts."],
      altitude: 5416,
      bestMonths: ["March", "April", "May", "October", "November"],
      highlights: ["Thorong La Pass (5,416m)", "Tilicho Lake (optional)", "Mustang landscape"],
      tips: ["Be prepared for high pass winds", "Carry enough Nepalese currency"],
      gallery: [],
      itinerary: [],
      estimatedCost: { budget: "$1,000 - $1,400", includes: ["Permits", "Guide", "Meals"] },
      permits: ["ACAP Permit", "TIMS Card"],
      regionId: regions.find(r => r.slug === 'annapurna').id
    },
    {
        slug: "manaslu-circuit",
        name: "Manaslu Circuit",
        image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=80&w=2670",
        duration: "14-16 days",
        difficulty: "Hard",
        description: "A remote and culturally rich trek around the world's eighth highest mountain.",
        longDescription: ["Off-the-beaten-path experience with stunning scenery."],
        altitude: 5106,
        bestMonths: ["March", "April", "May", "September", "October", "November"],
        highlights: ["Larkya La Pass (5,106m)", "Mt. Manaslu views", "Tibetan border villages"],
        tips: ["Restricted area permit required", "Guide is mandatory"],
        gallery: [],
        itinerary: [],
        estimatedCost: { budget: "$1,300 - $1,700", includes: ["Restricted permits", "Guide"] },
        permits: ["Manaslu Restricted Area Permit", "MCAP", "ACAP"],
        regionId: regions.find(r => r.slug === 'manaslu').id
      }
  ];

  for (const trek of treks) {
    await prisma.trek.upsert({
      where: { slug: trek.slug },
      update: trek,
      create: trek,
    });
  }
  console.log('Treks seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
