
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

  console.log({ admin });

  // Dictionary to match seasons to experiences
  // We will manually add some sample data if the file reads are too complex for a simple script, 
  // but let's try to mimic the data structure provided.
  
  // Seed Treks (Sample data mirrored from Treks.tsx)
  const treks = [
     {
        slug: "everest-base-camp",
        name: "Everest Base Camp",
        image: "/Images/TrekImages/ebc.jpg",
        duration: "12-14 days",
        difficulty: "Hard",
        description: "The Everest Base Camp Trek is one of the most famous treks in the world.",
        longDescription: [
          "Follow in the footsteps of legendary mountaineers.",
          "Experience Sherpa culture."
        ],
        altitude: 5364,
        bestMonths: ["March", "April", "May", "October", "November"],
        highlights: ["Panoramic views", "Sherpa culture", "EBC"],
        tips: ["Acclimatize properly", "Carry down jacket"],
        gallery: [
          "https://i.pinimg.com/1200x/20/6d/c8/206dc8f388c1a8701f038b99f30f7c70.jpg", 
          "https://i.pinimg.com/1200x/92/b9/2e/92b92ed0f8fc8b5d7e802e963da08d4b.jpg"
        ],
        itinerary: [
          { day: 1, title: "Fly to Lukla", description: "30-min flight." },
          { day: 2, title: "Trek to Namche", description: "6-7 hrs hike." }
        ],
        estimatedCost: {
          budget: "$1,200–$1,500",
          includes: ["Flights", "Meals", "Accommodation"]
        },
        permits: ["Sagarmatha National Park"]
     },
     // Add other treks...
  ];

  for (const trek of treks) {
    await prisma.trek.upsert({
      where: { slug: trek.slug },
      update: {},
      create: trek,
    });
  }

  // Seed Experiences (Seasons)
  const experiences = [
    {
        slug: "spring",
        name: "Spring",
        image: "https://i.pinimg.com/736x/20/4b/7b/204b7b34290c881a13e0d347d23466f1.jpg",
        description: "Blooming trails and perfect weather for hikes.",
        longDescription: ["Spring in Nepal is a season of rebirth."],
        bestMonths: ["March", "April", "May"],
        highlights: ["Rhododendron blooms", "Clear views"],
        tips: ["Book early", "Carry layers"],
        gallery: []
    },
    // Add other seasons...
  ];

  for (const exp of experiences) {
    await prisma.experience.upsert({
      where: { slug: exp.slug },
      update: {},
      create: exp,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
