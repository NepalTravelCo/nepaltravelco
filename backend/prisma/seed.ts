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
        location: "Kathmandu",
        description: "The beating heart of Nepal's culture. Explore ancient Durbar Squares, sacred temples like Pashupatinath, and the iconic Swayambhunath stupa.",
        image: "https://i.pinimg.com/1200x/35/23/84/352384a7a5937c38bdf830722eeb1bc0.jpg",
    },
    {
        slug: "pokhara-city",
        name: "Pokhara City",
        location: "Pokhara",
        description: "A paradise for nature lovers. Relax by the serene Fewa Lake, witness the reflection of Machhapuchhre, or start your Annapurna adventure here.",
        image: "https://i.pinimg.com/736x/02/85/9d/02859dc872fd9e21d513afcacb120db2.jpg",
    },
    {
        slug: "everest-region",
        name: "Everest Region",
        location: "Khumbu",
        description: "Follow the footsteps of legends. Journey through Khumbu Valley, visit ancient monasteries, and stand in the shadow of the world's highest peaks.",
        image: "https://i.pinimg.com/736x/51/2e/96/512e96d100ebe3269365e7720a316361.jpg",
    },
    {
        slug: "chitwan-national-park",
        name: "Chitwan National Park",
        location: "Terai",
        description: "Experience the wild side of Nepal. Home to the rare one-horned rhino and Bengal tigers. Enjoy jungle safaris and vibrant Tharu culture.",
        image: "https://i.pinimg.com/736x/51/20/1d/51201d610c4991a5096d300a908c8601.jpg",
    },
    {
        slug: "upper-mustang",
        name: "Upper Mustang",
        location: "Mustang",
        description: "The Hidden Kingdom. A desert landscape of red cliffs, ancient caves, and the fortified city of Lo Manthang. A journey into the past.",
        image: "https://i.pinimg.com/736x/3b/41/08/3b410875ceeabc321b01fc576e160aa7.jpg",
    },
    {
        slug: "lumbini-birthplace",
        name: "Lumbini",
        location: "Lumbini",
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

  // Seed Activities (Things to Do)
  const activitiesData = [
    {
      slug: "trekking-hiking",
      name: "Trekking & Hiking",
      tag: "Epic Adventures",
      description: "From the world-famous Everest Base Camp to hidden gems in the Manaslu region.",
      icon: "Mountain",
      color: "secondary",
      image: "https://i.pinimg.com/736x/78/cc/5e/78cc5e7dcbff23c68229bdda00a999a8.jpg",
      highlights: ["Everest Base Camp", "Annapurna Circuit", "Langtang Valley", "Manaslu Circuit", "Short hikes"],
      categoryId: 0 // Trekking
    },
    {
      slug: "cultural-heritage",
      name: "Cultural Heritage",
      tag: "Timeless Traditions",
      description: "Explore the ancient streets of Patan and witness evening prayers at Pashupatinath.",
      icon: "Map",
      color: "blue-600",
      image: "https://i.pinimg.com/736x/a4/06/d7/a406d7f4da651ea5a929deb7e6fac544.jpg",
      highlights: ["Pashupatinath Temple", "Boudhanath Stupa", "Lumbini", "Durbar Squares", "Festivals"],
      categoryId: 4 // Culture
    },
    {
      slug: "wildlife-safari",
      name: "Wildlife Safari",
      tag: "Untamed Nature",
      description: "Ride through the jungles of Chitwan or Bardia to spot royal Bengal tigers.",
      icon: "Compass",
      color: "green-600",
      image: "https://i.pinimg.com/736x/c7/87/0b/c7870bde9d364fe1cc5b1d6b703dc817.jpg",
      highlights: ["Spotting Rhinos in Chitwan", "Tracking Tigers in Bardia", "Canoeing", "Elephant breeding"],
      categoryId: 1 // Adrenaline/Nature (mapping to most relevant)
    },
    {
      slug: "spiritual-yoga",
      name: "Spiritual & Yoga",
      tag: "Inner Peace",
      description: "Find your zen in Buddhist monasteries or practice yoga by Fewa Lake.",
      icon: "Wind",
      color: "purple-600",
      image: "https://i.pinimg.com/736x/d6/19/d1/d619d179b55df33b59d55dc137f28519.jpg",
      highlights: ["Monastery retreats", "Himalayan Yoga", "Vipassana", "Spiritual walks", "Sound healing"],
      categoryId: 2 // Spiritual
    },
    {
      slug: "adventure-sports",
      name: "Adventure Sports",
      tag: "High Energy",
      description: "Paragliding over Pokhara, white water rafting, or a thrilling bungee jump.",
      icon: "Milestone",
      color: "red-600",
      image: "https://i.pinimg.com/736x/3a/e2/8c/3ae28cfe33383a22fe4a3ac0d6f9c7e2.jpg",
      highlights: ["Paragliding in Pokhara", "Trishuli Rafting", "Bungee Jumping", "Mountain biking", "Zip-lining"],
      categoryId: 1 // Adrenaline
    },
    {
      slug: "local-gastronomy",
      name: "Local Gastronomy",
      tag: "Authentic Flavors",
      description: "Taste the legendary Dal Bhat, Newari feasts, and Himalayan delicacies.",
      icon: "Utensils",
      color: "amber-600",
      image: "https://i.pinimg.com/1200x/05/47/ee/0547ee0bbe64263e89252b9237ed6942.jpg",
      highlights: ["Dal Bhat", "Momo", "Newari Samay Baji", "Sel Roti", "Yak cheese & tea"],
      categoryId: 4 // Culture/Gastronomy
    }
  ];

  for (const activity of activitiesData) {
    await prisma.activity.upsert({
      where: { slug: activity.slug },
      update: activity,
      create: activity,
    });
  }
  console.log('Activities seeded');

  // Seed Packages (Best Selling)
  const packagesData = [
    {
      slug: "everest-base-camp-trek",
      title: "Everest Base Camp Trek",
      location: "Namche, Solukhumbu",
      image: "https://i.pinimg.com/736x/16/37/80/16378017612eb06c5d85821f7062cd4e.jpg",
      duration: "14 Days",
      price: 1299,
      description: "A legendary journey through the Khumbu Valley to the foot of the world's highest peak.",
      features: ["5,364m Altitude", "Sherpa Culture", "Iconic Views"]
    },
    {
      slug: "bike-ride-to-upper-mustang",
      title: "Bike Ride To Upper Mustang",
      location: "Lomanthang, Mustang",
      image: "https://i.pinimg.com/736x/86/98/b2/8698b252000d0a556352cd68053dcdc7.jpg",
      duration: "10 Days",
      price: 2450,
      description: "One of the most diverse treks in the world, crossing the Thorong La Pass.",
      features: ["Desert Landscape", "Forbidden Kingdom", "Ancient Caves"]
    },
    {
      slug: "safari-escape-to-chitwan",
      title: "Safari Escape To Chitwan",
      location: "Sauraha, Chitwan",
      image: "https://i.pinimg.com/736x/1d/a2/40/1da2405ab9b54c95932327cde28f4a1c.jpg",
      duration: "3 Days",
      price: 450,
      description: "Experience the wild side of Nepal in the heart of the Terai lowlands.",
      features: ["Jungle Safari", "Tharu Culture", "Wildlife Spotting"]
    },
    {
      slug: "lumbini-heritage-tour",
      title: "Lumbini Heritage Tour",
      location: "Lumbini",
      image: "https://i.pinimg.com/736x/cd/4f/05/cd4f0588787d88ff975aea1b78ec6d24.jpg",
      duration: "2 Days",
      price: 300,
      description: "A pilgrimage to the birthplace of Lord Buddha, a site of profound peace.",
      features: ["UNESCO Heritage", "Spiritual Gardens", "Peace Pagoda"]
    }
  ];

  for (const pkg of packagesData) {
    await prisma.package.upsert({
      where: { slug: pkg.slug },
      update: pkg,
      create: pkg,
    });
  }
  console.log('Packages seeded');

  // Seed Seasons
  const seasonsData = [
    {
      slug: "spring",
      name: "Spring",
      image: "https://i.pinimg.com/736x/20/4b/7b/204b7b34290c881a13e0d347d23466f1.jpg",
      description: "Blooming trails and perfect weather for hikes.",
      bestMonths: ["March", "April", "May"]
    },
    {
      slug: "summer",
      name: "Summer",
      image: "https://i.pinimg.com/1200x/a4/8d/38/a48d38b909a472a7cf03dadcdee52a63.jpg",
      description: "Crystal clear lakes and lush green valleys.",
      bestMonths: ["June", "July", "August"]
    },
    {
      slug: "autumn",
      name: "Autumn",
      image: "https://i.pinimg.com/1200x/04/1a/09/041a09f90fb85d0725a79b967a7c0fdb.jpg",
      description: "Golden forests and traditional village festivals.",
      bestMonths: ["September", "October", "November"]
    },
    {
      slug: "winter",
      name: "Winter",
      image: "https://i.pinimg.com/736x/b5/29/e9/b529e9830fbd52a1cf8911dc289d9464.jpg",
      description: "Snowy peaks and peaceful mountain retreats.",
      bestMonths: ["December", "January", "February"]
    },
    {
      slug: "festivals",
      name: "Festivals",
      image: "https://i.pinimg.com/1200x/46/14/e3/4614e3974aa171267fc4096895b67610.jpg",
      description: "Dashain, Tihar, Holi and more cultural joy.",
      bestMonths: ["Year Round"]
    }
  ];

  for (const season of seasonsData) {
    await prisma.season.upsert({
      where: { slug: season.slug },
      update: season,
      create: season,
    });
  }
  console.log('Seasons seeded');

  // Seed FAQs
  const faqsData = [
    {
      slug: "best-time-to-visit",
      question: "What is the best time to visit Nepal?",
      answer: "The best time to visit Nepal is during autumn (September–November) and spring (March–May). Autumn offers clear mountain views and stable weather, while spring brings blooming rhododendrons and moderate temperatures.",
      category: "General"
    },
    {
      slug: "visa-requirements",
      question: "Do I need a visa to visit Nepal?",
      answer: "Most visitors need a visa to enter Nepal. Tourist visas are available on arrival at Tribhuvan International Airport and major border crossings, or can be obtained in advance from Nepalese embassies.",
      category: "Travel Info"
    },
    {
      slug: "packing-list",
      question: "What should I pack for trekking in Nepal?",
      answer: "Essential trekking gear includes sturdy hiking boots, layered clothing, a warm sleeping bag, rain gear, sun protection, a first aid kit, water purification tablets, and a headlamp.",
      category: "Trekking"
    },
    {
      slug: "safety-solo-travel",
      question: "Is it safe to travel solo in Nepal?",
      answer: "Nepal is generally safe for solo travelers. The Nepalese people are known for their hospitality. However, trekking with a guide or group is recommended on remote trails.",
      category: "Safety"
    },
    {
      slug: "altitude-sickness",
      question: "What is altitude sickness and how to prevent it?",
      answer: "Altitude sickness occurs when ascending too quickly. Prevent it by ascending gradually, acclimatizing properly, staying hydrated, and listening to your body.",
      category: "Health"
    },
    {
      slug: "trekking-accommodations",
      question: "What kind of accommodation is available during treks?",
      answer: "Accommodation ranges from basic teahouses to comfortable lodges depending on the route. Popular routes have well-established teahouses with beds, blankets, and meals.",
      category: "Accommodation"
    }
  ];

  for (const faq of faqsData) {
    await prisma.faq.upsert({
      where: { slug: faq.slug },
      update: faq,
      create: faq,
    });
  }
  console.log('FAQs seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
