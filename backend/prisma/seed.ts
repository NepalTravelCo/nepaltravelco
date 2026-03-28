import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

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

  // Seed Regions with correct basecamp elevations
  const regionsData = [
    {
      name: "Annapurna Region",
      slug: "annapurna",
      trailCount: 12,
      altitude: 4130, // ABC - Annapurna Base Camp
      description: "Home to some of the world's most popular trekking routes, offering diverse landscapes from subtropical forests to high-altitude deserts.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2670",
    },
    {
      name: "Everest Region",
      slug: "everest",
      trailCount: 8,
      altitude: 5364, // Everest Base Camp
      description: "The legendary Khumbu region, home to the world's highest peak and the resilient Sherpa people.",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2671",
    },
    {
      name: "Langtang Region",
      slug: "langtang",
      trailCount: 5,
      altitude: 3870, // Kyanjin Gompa (standard valley height)
      description: "Close to Kathmandu, this region offers stunning glaciated valleys and authentic Tamang culture.",
      image: "https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?q=80&w=2670",
    },
    {
      name: "Manaslu Region",
      slug: "manaslu",
      trailCount: 4,
      altitude: 4800, // Manaslu Base Camp
      description: "A restricted area offering a pristine circuit around the world's eighth-highest mountain.",
      image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=80&w=2670",
    },
    {
      name: "Mustang Region",
      slug: "mustang",
      trailCount: 6,
      altitude: 3840, // Lo Manthang
      description: "The 'Forbidden Kingdom' of Lo, featuring rain-shadow landscapes and ancient Tibetan-Buddhist culture.",
      image: "https://images.unsplash.com/photo-1623492701902-47dc207df5dc?q=80&w=2670",
    },
    {
      name: "Dolpo Region",
      slug: "dolpo",
      trailCount: 3,
      altitude: 4200, // Shey Gompa
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
      image: "/Images/TrekImages/ebc.jpg",
      duration: "12-14 days",
      difficulty: "Hard",
      description: "The Everest Base Camp Trek is one of the most famous treks in the world, offering breathtaking views of the world’s tallest peak.",
      longDescription: [
        "Follow in the footsteps of legendary mountaineers to the base of the world’s highest mountain.",
        "Experience Sherpa culture, monasteries, and incredible Himalayan landscapes."
      ],
      altitude: 5364,
      bestMonths: ["March", "April", "May", "October", "November"],
      highlights: [
        "Panoramic views of Everest, Lhotse, Nuptse, and Ama Dablam",
        "Sherpa culture and monasteries",
        "Reaching Everest Base Camp"
      ],
      tips: [
        "Acclimatize properly to avoid altitude sickness.",
        "Carry a down jacket and good trekking boots.",
        "Start early to avoid afternoon clouds."
      ],
      gallery: [
        "https://i.pinimg.com/1200x/20/6d/c8/206dc8f388c1a8701f038b99f30f7c70.jpg",
        "https://i.pinimg.com/1200x/92/b9/2e/92b92ed0f8fc8b5d7e802e963da08d4b.jpg"
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
        { day: 12, title: "Fly back to Kathmandu", description: "Morning flight to Kathmandu, rest & relax." }
      ],
      estimatedCost: { 
        budget: "$1,200–$1,500 per person", 
        includes: ["Domestic flights", "Meals during trek", "Accommodation", "Guide & porter", "Permits"] 
      },
      permits: ["Sagarmatha National Park Entry Permit", "Khumbu Pasang Lhamu Rural Municipality Permit"],
      regionId: regions.find(r => r.slug === 'everest')?.id || ''
    },
    {
      slug: "annapurna-circuit",
      name: "Annapurna Circuit",
      image: "/Images/TrekImages/ac.jpg",
      duration: "15-20 days",
      difficulty: "Moderate to Hard",
      description: "The Annapurna Circuit Trek offers diverse landscapes, rich culture, and stunning views of the Annapurna and Dhaulagiri ranges.",
      longDescription: [
        "Travel through subtropical forests, high mountain passes, and Tibetan-influenced villages.",
        "Cross the famous Thorong La Pass, one of the highest trekking passes in the world."
      ],
      altitude: 5416,
      bestMonths: ["March", "April", "October", "November"],
      highlights: ["Thorong La Pass crossing", "Varied landscapes from jungle to desert", "Cultural immersion"],
      tips: ["Train for long days of hiking", "Prepare for both hot and cold weather"],
      gallery: [],
      itinerary: [],
      estimatedCost: { budget: "$1,200–$1,500 per person", includes: ["Permits", "Guide", "Meals"] },
      permits: ["ACAP Permit", "TIMS Card"],
      regionId: regions.find(r => r.slug === 'annapurna')?.id || ''
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

  // Seed Destinations
  const destinationsData = [
    {
        slug: "kathmandu-valley",
        name: "Kathmandu Valley",
        description: "The beating heart of Nepal's culture. Explore ancient Durbar Squares, sacred temples like Pashupatinath, and the iconic Swayambhunath stupa.",
        image: "https://i.pinimg.com/1200x/35/23/84/352384a7a5937c38bdf830722eeb1bc0.jpg",
    },
    {
        slug: "pokhara-city",
        name: "Pokhara City",
        description: "A paradise for nature lovers. Relax by the serene Fewa Lake, witness the reflection of Machhapuchhre, or start your Annapurna adventure here.",
        image: "https://i.pinimg.com/736x/02/85/9d/02859dc872fd9e21d513afcacb120db2.jpg",
    },
    {
        slug: "everest-region",
        name: "Everest Region",
        description: "Follow the footsteps of legends. Journey through Khumbu Valley, visit ancient monasteries, and stand in the shadow of the world's highest peaks.",
        image: "https://i.pinimg.com/736x/51/2e/96/512e96d100ebe3269365e7720a316361.jpg",
    },
    {
        slug: "chitwan-national-park",
        name: "Chitwan National Park",
        description: "Experience the wild side of Nepal. Home to the rare one-horned rhino and Bengal tigers. Enjoy jungle safaris and vibrant Tharu culture.",
        image: "https://i.pinimg.com/736x/51/20/1d/51201d610c4991a5096d300a908c8601.jpg",
    },
    {
        slug: "upper-mustang",
        name: "Upper Mustang",
        description: "The Hidden Kingdom. A desert landscape of red cliffs, ancient caves, and the fortified city of Lo Manthang. A journey into the past.",
        image: "https://i.pinimg.com/736x/3b/41/08/3b410875ceeabc321b01fc576e160aa7.jpg",
    },
    {
        slug: "lumbini-birthplace",
        name: "Lumbini",
        description: "The birthplace of Lord Buddha. A pilgrimage site of immense spiritual significance, featuring monasteries built by various nations and the sacred Mayadevi Temple.",
        image: "https://i.pinimg.com/736x/cd/4f/05/cd4f0588787d88ff975aea1b78ec6d24.jpg",
    }
  ];

  for (const dest of destinationsData) {
    await prisma.destination.upsert({
      where: { slug: dest.slug },
      update: dest,
      create: dest,
    });
  }
  console.log('Destinations seeded');

  // Seed Experiences
  const experiencesData = [
    {
      slug: "everest-heli-tour",
      name: "Everest Heli Tour",
      subtitle: "A journey above the world",
      description: "Experience one of the world's most exclusive aerial journeys with an unforgettable helicopter tour over the Himalayas.",
      image: "/Images/Experiences/heli-tour.png",
      accent: "var(--accent)",
      duration: "4-5 Hours",
      difficulty: "Luxury",
      maxAltitude: "5,545m"
    },
    {
      slug: "bungee-jumping",
      name: "Bungee Jumping",
      subtitle: "Plunge into the deep",
      description: "Take the ultimate leap at one of the world’s most dramatic bungee and swing sites.",
      image: "/Images/Stocks/bungee.jpg",
      accent: "#ef4444",
      duration: "Full Day",
      difficulty: "Hardcore",
      maxAltitude: "1,200m"
    },
    {
      slug: "mustang-bike-tour",
      name: "Mustang Bike Tour",
      subtitle: "Ride the forbidden kingdom",
      description: "Ride through the ancient kingdom of Mustang, where rugged trails meet timeless Tibetan culture.",
      image: "/Images/Experiences/mustang-bike.png",
      accent: "#f59e0b",
      duration: "10-12 Days",
      difficulty: "Expert",
      maxAltitude: "3,840m"
    },
    {
      slug: "mountain-flight",
      name: "Mountain Flight",
      subtitle: "Windows to the Himalayas",
      description: "Experience the Himalayas from above on a breathtaking mountain flight. Witness Everest, Lhotse, and Annapurna up close.",
      image: "/Images/Experiences/mountain-flight.png",
      accent: "#3b82f6",
      duration: "1 Hour",
      difficulty: "Easy",
      maxAltitude: "8,848m (Sight)"
    },
    {
      slug: "national-parks-safari",
      name: "National Parks & Safari",
      subtitle: "Wild heartbeat of Nepal",
      description: "Explore Nepal’s national parks and wildlife reserves on guided jungle safaris.",
      image: "/Images/Experiences/safari.png",
      accent: "#10b981",
      duration: "3-4 Days",
      difficulty: "Moderate",
      maxAltitude: "150m"
    }
  ];

  for (const exp of experiencesData) {
    await prisma.experience.upsert({
      where: { slug: exp.slug },
      update: exp,
      create: exp,
    });
  }
  console.log('Experiences seeded');

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
