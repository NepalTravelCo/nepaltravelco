"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowLeft, ArrowRight, Images, Landmark, Mountain, PartyPopper, Trees } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { getPublicBackendBaseUrl } from "@/lib/backend-url"

type ValleySection = {
  id: string
  tag: string
  title: string
  subtitle: string | null
  shortText: string | null
  content: string
  mainImage: string | null
  gallery: string[]
  metadata: Record<string, string | number | boolean | null> | null
}

const placeholderImage = "/placeholder.svg"

type CuratedImageSet = {
  mainImage: string
  gallery: string[]
}

// Add your real image URLs here.
// - mainImage: primary image for the card
// - gallery: additional images for the modal/gallery strip
const curatedImageLinks: Record<string, CuratedImageSet> = {
  "curated-temple-1": {
    mainImage: "https://i.pinimg.com/1200x/79/25/eb/7925eb1c0cba636deb418f7b6cd6603f.jpg",
    gallery: ["https://i.pinimg.com/1200x/07/83/69/07836900733b8e571eac952c4ba527e6.jpg", "https://i.pinimg.com/736x/31/c9/36/31c93670f4daddc18727c0a2d034cf29.jpg", "https://i.pinimg.com/1200x/d5/7a/d5/d57ad5a06ee02dfb208163faca595238.jpg", "https://i.pinimg.com/736x/b5/3d/77/b53d77681c65c2104f153461a7b34a1b.jpg"],
  },
  "curated-temple-2": {
    mainImage: "https://i.pinimg.com/736x/fd/f0/9d/fdf09d787c84b6d7783b711dc63c56c9.jpg",
    gallery: ["https://i.pinimg.com/1200x/bd/48/09/bd48095e26d26ccc663e8f3f6a9adbe5.jpg", "https://i.pinimg.com/1200x/9c/92/24/9c9224e86d662b2954c887a67c0f386d.jpg", "https://i.pinimg.com/736x/d2/10/0b/d2100baf96aeec23d50c822aa6bc5e43.jpg"],
  },
  "curated-temple-3": {
    mainImage: "https://i.pinimg.com/1200x/3d/5e/5c/3d5e5cffb17c34826ce41fa4ccf0dc89.jpg",
    gallery: ["https://i.pinimg.com/736x/6e/2f/94/6e2f942e56457c07f87681210ecf30e8.jpg", "https://i.pinimg.com/736x/9f/27/34/9f27341af967124c25f007c9ea8c859d.jpg", "https://i.pinimg.com/736x/57/19/ec/5719ecce412db3700d3c19abe117c9ad.jpg"],
  },
  "curated-durbar-1": {
    mainImage: "https://i.pinimg.com/1200x/3a/e6/11/3ae61135291ed9e10306ae0c56e8333d.jpg",
    gallery: ["https://i.pinimg.com/736x/d9/97/37/d99737c1f5de1fac18b06eda9cb17964.jpg", "https://i.pinimg.com/1200x/b4/95/d1/b495d1c0faae6d5c0c896afbb70aefd0.jpg", "https://i.pinimg.com/1200x/2f/73/7b/2f737b6e9161c7a34ac39b5d6612d958.jpg"],
  },
  "curated-durbar-2": {
    mainImage: "https://i.pinimg.com/1200x/48/69/ed/4869edaa1c7447b922acd796a20f8946.jpg",
    gallery: ["https://i.pinimg.com/1200x/71/09/89/71098943db75f49e2cb39915b855ad71.jpg", "https://i.pinimg.com/1200x/b7/5e/1e/b75e1eb84ed1e5ac411b8e310f4dc2c5.jpg", "https://i.pinimg.com/1200x/0f/47/0b/0f470bcc7572aa3b68b3ac53c857ba82.jpg"],
  },
  "curated-durbar-3": {
    mainImage: "https://i.pinimg.com/736x/55/13/68/551368b3616f86d61d8348f83be1b6c9.jpg",
    gallery: ["https://i.pinimg.com/736x/23/fa/e2/23fae25e2373d4a1acda062ad6feac2e.jpg", "https://i.pinimg.com/736x/a4/06/d7/a406d7f4da651ea5a929deb7e6fac544.jpg", "https://i.pinimg.com/1200x/59/2a/b8/592ab8d645c79427be1f4021606670bf.jpg"],
  },
  "curated-festival-1": {
    mainImage: "https://i.pinimg.com/736x/a4/a2/81/a4a2817b484770e3572125f3fd0f51e0.jpg",
    gallery: ["https://i.pinimg.com/1200x/76/f1/25/76f1250a703e981b5b0a37b6633b5e83.jpg","https://i.pinimg.com/736x/e9/59/c6/e959c60fdfcc46c9da8780eb510b6c5e.jpg", "https://i.pinimg.com/1200x/e8/17/15/e81715ab6b676b944a0c03affc1ce17a.jpg"],  
  },
  "curated-festival-2": {
    mainImage: "https://i.pinimg.com/1200x/41/c1/28/41c128af6bf7970c52d916a4fef82f98.jpg",
    gallery: ["https://i.pinimg.com/1200x/76/d0/53/76d05391bf871b4373e5886a2fab0c06.jpg", "https://i.pinimg.com/1200x/5d/22/0d/5d220d73a4c71cc67cc279b72124cc36.jpg", "https://i.pinimg.com/736x/0f/00/f6/0f00f6ce8c92926ea1302fbf4a78c473.jpg"],
  },
  "curated-festival-3": {
    mainImage: "https://i.pinimg.com/1200x/8e/44/73/8e4473e48ec4778c00d7c6a4de79abeb.jpg",
    gallery: ["https://i.pinimg.com/736x/9f/2f/db/9f2fdb3fbfa3e55a4701ea001e8e74e1.jpg", "https://i.pinimg.com/1200x/74/80/ee/7480eefd978cc8217859f41dc9075168.jpg", "https://i.pinimg.com/1200x/45/cb/ec/45cbeccfda5805dba1aae9bd98b9e459.jpg"],
  },
  "curated-hike-1": {
    mainImage: "https://i.pinimg.com/736x/1c/ca/37/1cca372d10e3206fe9318051be7cb153.jpg",
    gallery: ["https://i.pinimg.com/1200x/c3/9a/45/c39a45aeff920ba3367c7ae941e136e0.jpg", "https://i.pinimg.com/1200x/dd/a7/8b/dda78b6182ae327b732e522efa2df4eb.jpg", "https://i.pinimg.com/736x/6c/07/fc/6c07fc5564844ead631e4eff88d2e8da.jpg"],
  },
  "curated-hike-2": {
    mainImage: "https://i.pinimg.com/1200x/9d/eb/c5/9debc5b4315a203d8eb6c2391681c220.jpg",
    gallery: ["https://i.pinimg.com/1200x/c2/3a/76/c23a76d3e730eb3e19f14430e899a927.jpg", "https://i.pinimg.com/1200x/84/4c/b4/844cb470d93d272e4f4983fa3c4539f1.jpg", "https://i.pinimg.com/1200x/37/d0/c1/37d0c1cd96685ab0f9c0acf8828d756b.jpg"],
  },
  "curated-hike-3": {
    mainImage: "https://i.pinimg.com/1200x/48/8f/f8/488ff8c815809cb986170f5ba9d3ebb3.jpg",
    gallery: ["https://i.pinimg.com/1200x/a3/0a/ae/a30aaed9cbc7965af236cfbf0da27ad3.jpg", "https://i.pinimg.com/736x/68/9e/79/689e7943480d01ace647b0d2454592dc.jpg", "https://i.pinimg.com/736x/30/8f/3a/308f3ac7f17ef7d916364c5e1f150718.jpg"],
  },
}

const curatedSections: ValleySection[] = [
  {
    id: "curated-temple-1",
    tag: "temple",
    title: "Pashupatinath Temple",
    subtitle: "A sacred riverside complex devoted to Lord Shiva",
    shortText:
      "One of Nepal's most revered pilgrimage sites, this temple complex blends ritual life, stone carvings, and centuries of spiritual continuity along the Bagmati River.",
    content:
      "Pashupatinath is a UNESCO World Heritage Site and a central spiritual landmark for Hindu devotees from Nepal and abroad.\n\nThe complex includes pagoda-style shrines, ashrams, and ceremonial ghats where sacred rites continue every day.\n\nVisit respectfully during morning or evening rituals to witness the temple's living cultural atmosphere.",
    mainImage: curatedImageLinks["curated-temple-1"]?.mainImage ?? placeholderImage,
    gallery: curatedImageLinks["curated-temple-1"]?.gallery ?? [],
    metadata: {
      location: "Kathmandu",
      established: "5th Century",
      significance: "UNESCO World Heritage",
    },
  },
  {
    id: "curated-temple-2",
    tag: "temple",
    title: "Swayambhunath Stupa",
    subtitle: "An ancient hilltop sanctuary known as the Monkey Temple",
    shortText:
      "Overlooking the valley, Swayambhunath combines Buddhist symbolism, prayer wheels, and panoramic city views in one of Kathmandu's oldest sacred precincts.",
    content:
      "Swayambhunath is admired for its white dome, golden spire, and the iconic all-seeing Buddha eyes painted on all sides.\n\nThe site reflects a shared spiritual heritage, welcoming both Buddhist and Hindu devotees throughout the year.\n\nSunrise and sunset hours are ideal for a quieter climb and valley-wide viewpoints.",
    mainImage: curatedImageLinks["curated-temple-2"]?.mainImage ?? placeholderImage,
    gallery: curatedImageLinks["curated-temple-2"]?.gallery ?? [],
    metadata: {
      location: "Kathmandu",
      established: "Ancient Era",
      significance: "Buddhist Heritage",
    },
  },
  {
    id: "curated-temple-3",
    tag: "temple",
    title: "Boudhanath Stupa",
    subtitle: "An ancient hilltop sanctuary known as the Monkey Temple",
    shortText:
      "Overlooking a vibrant circle of monasteries, Boudhanath Stupa blends Tibetan Buddhist rituals, spinning prayer wheels, and a serene spiritual ambiance within one of the largest stupas in the world.",
    content:
      "Boudhanath Stupa is renowned for its massive white mandala dome, towering gilded spire, and the serene, all-seeing Buddha eyes that gaze in every direction.\n\nThe stupa stands as a living center of Tibetan Buddhist culture, where monks, pilgrims, and locals circle it in prayer, creating a deeply spiritual and peaceful atmosphere.\n\nEarly mornings and evenings are the best times to visit, when butter lamps glow, prayer wheels spin gently, and the surrounding area feels calm with a soft golden light.",
    mainImage: curatedImageLinks["curated-temple-3"]?.mainImage ?? placeholderImage,
    gallery: curatedImageLinks["curated-temple-3"]?.gallery ?? [],
    metadata: {
      location: "Kathmandu",
      established: "Ancient Era",
      significance: "Buddhist Heritage",
    },
  },
  {
    id: "curated-durbar-1",
    tag: "durbar-square",
    title: "Kathmandu Durbar Square",
    subtitle: "Historic royal courtyard of temples, palaces, and living heritage",
    shortText:
      "A UNESCO-listed cultural core where carved temples, palace courtyards, and ritual life preserve the artistic and political legacy of the Malla era.",
    content:
      "Kathmandu Durbar Square served as the ceremonial and administrative heart of the old kingdom and remains one of the valley's most significant heritage spaces.\n\nIntricate wooden struts, pagoda roofs, and shrines reveal centuries of Newar craftsmanship and layered urban history.\n\nVisit in the morning for gentler crowds, or in the evening to experience the square's atmospheric lighting and local rhythm.",
    mainImage: curatedImageLinks["curated-durbar-1"]?.mainImage ?? placeholderImage,
    gallery: curatedImageLinks["curated-durbar-1"]?.gallery ?? [],
    metadata: {
      location: "Kathmandu",
      established: "Malla Period",
      significance: "UNESCO World Heritage",
    },
  },
  {
        id: "curated-durbar-2",
        tag: "durbar-square",
        title: "Patan Durbar Square",
        subtitle: "A masterpiece of Newar craftsmanship and sacred courtyards",
        shortText:
            "Renowned for its intricate temples, royal palace complex, and refined metalwork traditions, Patan Durbar Square reflects the artistic soul of the Kathmandu Valley.",
        content:
            "Patan Durbar Square is celebrated for its harmonious blend of palace courtyards, tiered temples, and exquisite wood and metal carvings that define the city's historic core.\n\nThe square is closely tied to centuries-old artisan traditions, particularly in metal sculpture, and remains an active cultural hub with festivals and daily rituals.\n\nMorning and late afternoon visits offer the best light to appreciate the fine details and a quieter atmosphere for exploring its courtyards and museums.",
        mainImage: curatedImageLinks["curated-durbar-2"]?.mainImage ?? placeholderImage,
        gallery: curatedImageLinks["curated-durbar-2"]?.gallery ?? [],
        metadata: {
            location: "Lalitpur",
            established: "Medieval Era",
            significance: "Newar Art and Architecture",
        },
    },
  {
    id: "curated-durbar-3",
    tag: "durbar-square",
    title: "Bhaktapur Durbar Square",
    subtitle: "An open-air museum of medieval architecture and artistry",
    shortText:
      "Known for brick-paved lanes, royal courtyards, and iconic monuments, Bhaktapur Durbar Square offers one of the valley's richest historic environments.",
    content:
      "Bhaktapur Durbar Square showcases palace complexes, temple ensembles, and artisan traditions that have shaped the town's identity for generations.\n\nThe square's preserved urban fabric, local pottery, and cultural festivals make it a standout destination for architecture and heritage travelers.\n\nLate afternoon is ideal for warm light on the monuments and relaxed exploration through adjacent alleys.",
    mainImage: curatedImageLinks["curated-durbar-3"]?.mainImage ?? placeholderImage,
    gallery: curatedImageLinks["curated-durbar-3"]?.gallery ?? [],
    metadata: {
      location: "Bhaktapur",
      established: "Medieval Era",
      significance: "Newar Architectural Heritage",
    },
  },
  {
    id: "curated-festival-1",
    tag: "festival",
    title: "Indra Jatra",
    subtitle: "Kathmandu's grand festival of masked dances and chariot processions",
    shortText:
      "Held in historic city squares, Indra Jatra fills the capital with cultural performances, ceremonial displays, and devotional gatherings.",
    content:
      "Indra Jatra is among the valley's most celebrated urban festivals and is deeply tied to Newar cultural traditions.\n\nPublic spaces become open stages where music, dance, and ritual processions unfold over multiple days.\n\nTravelers should expect lively crowds and are encouraged to observe local etiquette during ceremonies.",
    mainImage: curatedImageLinks["curated-festival-1"]?.mainImage ?? placeholderImage,
    gallery: curatedImageLinks["curated-festival-1"]?.gallery ?? [],
    metadata: {
      location: "Kathmandu Durbar Square",
      duration: "8 Days",
      significance: "Newar Cultural Festival",
    },
  },
  {
  id: "curated-festival-2",
  tag: "festival",
  title: "Rato Machindranath Jatra",
  subtitle: "The valley’s longest chariot festival honoring the rain deity",
  shortText:
    "Famous for its towering chariot and community participation, Rato Machindranath Jatra is a vibrant celebration rooted in both Hindu and Buddhist traditions.",
  content:
    "Rato Machindranath Jatra is one of the most significant and lengthy festivals in the Kathmandu Valley, centered around the worship of the rain deity revered by both Hindus and Buddhists.\n\nA massive wooden chariot carrying the deity is pulled through various parts of Lalitpur, accompanied by rituals, music, and large gatherings of devotees.\n\nThe festival concludes with the ceremonial display of the Bhoto, drawing crowds from across the valley and offering a unique cultural experience for visitors.",
  mainImage: curatedImageLinks["curated-festival-2"]?.mainImage ?? placeholderImage,
  gallery: curatedImageLinks["curated-festival-2"]?.gallery ?? [],
  metadata: {
    location: "Lalitpur",
    duration: "Several Weeks",
    significance: "Rain Deity Festival",
  },
},
  {
    id: "curated-festival-3",
    tag: "festival",
    title: "Bisket Jatra",
    subtitle: "Traditional New Year festival with community processions",
    shortText:
      "Celebrated especially in Bhaktapur, Bisket Jatra marks the Nepali New Year through processions, rituals, and vibrant public participation.",
    content:
      "Bisket Jatra is known for ceremonial chariots, symbolic rites, and neighborhood-level cultural pride.\n\nThe event creates a unique opportunity to witness heritage in motion across temples and old city lanes.\n\nComfortable walking shoes and early arrival are recommended for the best viewing spots.",
    mainImage: curatedImageLinks["curated-festival-3"]?.mainImage ?? placeholderImage,
    gallery: curatedImageLinks["curated-festival-3"]?.gallery ?? [],
    metadata: {
      location: "Bhaktapur",
      duration: "Several Days",
      significance: "Nepali New Year Celebration",
    },
  },
  {
    id: "curated-hike-1",
    tag: "hike",
    title: "Nagarkot Sunrise Trail",
    subtitle: "A scenic ridge walk with Himalayan dawn views",
    shortText:
      "This short escape offers cool mountain air, layered hill landscapes, and a chance to see the Himalayas in clear weather.",
    content:
      "Nagarkot is a favorite quick getaway from Kathmandu for sunrise and ridge-line walking routes.\n\nThe trail is suitable for casual hikers and can be paired with village stops and local tea houses.\n\nCarry light layers, especially in the early morning when temperatures are cooler.",
    mainImage: curatedImageLinks["curated-hike-1"]?.mainImage ?? placeholderImage,
    gallery: curatedImageLinks["curated-hike-1"]?.gallery ?? [],
    metadata: {
      location: "Nagarkot",
      duration: "Half Day",
      difficulty: "Easy to Moderate",
    },
  },
  {
    id: "curated-hike-2",
    tag: "hike",
    title: "Shivapuri Forest Route",
    subtitle: "A refreshing nature route near the northern valley edge",
    shortText:
      "Perfect for travelers seeking a quiet woodland trail, this route combines forest paths, monastery stops, and gentle elevation gain.",
    content:
      "Shivapuri National Park offers a greener side of the valley with protected forests and birdlife.\n\nPopular route options range from short ascents to full-day walks depending on pace and weather.\n\nBring water, trail shoes, and check local entry guidance before heading out.",
    mainImage: curatedImageLinks["curated-hike-2"]?.mainImage ?? placeholderImage,
    gallery: curatedImageLinks["curated-hike-2"]?.gallery ?? [],
    metadata: {
      location: "Shivapuri",
      duration: "Full Day",
      difficulty: "Moderate",
    },
  },
  {
  id: "curated-hike-3",
  tag: "hike",
  title: "Phulchowki Summit Trail",
  subtitle: "The highest hill hike around the valley with rich biodiversity",
  shortText:
    "Known for its lush forests and panoramic viewpoints, this trail offers a rewarding climb to the highest peak surrounding Kathmandu Valley.",
  content:
    "Phulchowki, the tallest hill in the Kathmandu Valley, is a favorite for hikers seeking dense forest trails, diverse birdlife, and a more secluded experience.\n\nThe route gradually ascends through rhododendron forests and peaceful woodland paths, making it especially beautiful during spring.\n\nAt the summit, hikers are rewarded with sweeping views of the valley and distant Himalayan ranges. Start early and carry sufficient water, as facilities along the trail are limited.",
  mainImage: curatedImageLinks["curated-hike-3"]?.mainImage ?? placeholderImage,
  gallery: curatedImageLinks["curated-hike-3"]?.gallery ?? [],
  metadata: {
    location: "Godawari",
    duration: "5–7 Hours",
    difficulty: "Moderate to Challenging",
  },
},
]

const sectionMeta: Record<
  string,
  { title: string; eyebrow: string; icon: LucideIcon }
> = {
  temple: { title: "Sacred Temples", eyebrow: "Spiritual Heritage", icon: Landmark },
  "durbar-square": { title: "Durbar Squares", eyebrow: "Royal Courtyards", icon: Images },
  festival: { title: "Festivals & Celebrations", eyebrow: "Living Traditions", icon: PartyPopper },
  hike: { title: "Hikes & Short Escapes", eyebrow: "Nature Trails", icon: Trees },
}

const sectionOrder = ["temple", "durbar-square", "festival", "hike"]

const headingEmphasisStart: Record<string, number> = {
  temple: 1,
  "durbar-square": 1,
  festival: 2,
  hike: 2,
}

const renderStyledHeading = (title: string, startIndex: number) => {
  const words = title.split(" ")

  return words.map((word, index) => {
    const emphasized = index >= startIndex
    return (
      <span
        key={`${word}-${index}`}
        className={emphasized ? "text-stone-900 italic font-normal" : "text-stone-900"}
      >
        {word}{" "}
      </span>
    )
  })
}

export default function ExploreValleySections() {
  const [sections, setSections] = useState<ValleySection[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const [modalOpen, setModalOpen] = useState(false)
  const [modalImages, setModalImages] = useState<string[]>([])
  const [modalTitle, setModalTitle] = useState("")
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await fetch(`${getPublicBackendBaseUrl()}/api/sections?category=explore-valley`)
        if (!response.ok) {
          throw new Error("Failed to load explore valley sections")
        }
        const data = await response.json()
        setSections(data)
      } catch (error) {
        console.error("Error fetching explore valley sections:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSections()
  }, [])

  const groupedSections = useMemo(() => {
    const grouped = new Map<string, ValleySection[]>()
    sections.forEach((item) => {
      if (!grouped.has(item.tag)) {
        grouped.set(item.tag, [])
      }
      grouped.get(item.tag)?.push(item)
    })
    return grouped
  }, [sections])

  const sectionsForDisplay = useMemo(() => {
    // Always show curated temple/durbar/festival/hike content.
    const forcedTags = new Set(["temple", "durbar-square", "festival", "hike"])
    const apiSectionsToKeep = sections.filter((item) => !forcedTags.has(item.tag))
    return [...apiSectionsToKeep, ...curatedSections]
  }, [sections])

  const groupedSectionsForDisplay = useMemo(() => {
    const grouped = new Map<string, ValleySection[]>()
    sectionsForDisplay.forEach((item) => {
      if (!grouped.has(item.tag)) {
        grouped.set(item.tag, [])
      }
      grouped.get(item.tag)?.push(item)
    })
    return grouped
  }, [sectionsForDisplay])

  const openModal = (images: string[], title: string, startAt = 0) => {
    if (!images.length) return
    setModalImages(images)
    setModalTitle(title)
    setActiveImageIndex(startAt)
    setModalOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setModalOpen(false)
    setModalImages([])
    setModalTitle("")
    setActiveImageIndex(0)
    document.body.style.overflow = "unset"
  }

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % modalImages.length)
  }

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + modalImages.length) % modalImages.length)
  }

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  if (loading) {
    return (
      <section className="py-20">
        <div className="rounded-3xl border border-stone-200 bg-white p-8 md:p-10">
          <p className="text-stone-500 text-sm md:text-base">Loading valley stories...</p>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="space-y-16 md:space-y-20">
        {sectionOrder.map((tag) => {
          const items = groupedSectionsForDisplay.get(tag) ?? groupedSections.get(tag) ?? []
          if (!items.length) return null

          const meta = sectionMeta[tag]
          const SectionIcon = meta?.icon ?? Mountain

          return (
            <div key={tag} className="relative p-1 md:p-2 lg:p-3">
              <div className="mb-8 md:mb-10 border-b border-stone-200 pb-6">
                <div className="flex items-start md:items-center justify-between gap-4">
                  <div>
                    <p className="text-secondary font-semibold tracking-[0.26em] uppercase text-xs mb-3">
                      {meta?.eyebrow ?? "Valley Guide"}
                    </p>
                    <h2 className="font-[var(--heading-font)] text-3xl md:text-5xl text-stone-900 font-bold leading-tight">
                      {renderStyledHeading(meta?.title ?? tag, headingEmphasisStart[tag] ?? 1)}
                    </h2>
                  </div>
                  <div className="hidden md:flex h-11 w-11 rounded-full bg-stone-900 text-white items-center justify-center shrink-0">
                    <SectionIcon size={18} />
                  </div>
                </div>
              </div>

              <div className="space-y-10 md:space-y-12">
                {items.map((item, index) => {
                  const reverse = index % 2 !== 0
                  const hasExpanded = expandedItems.has(item.id)
                  const sanitizedGallery = (item.gallery ?? [])
                    .map((image) => image.trim())
                    .filter((image) => image.length > 0)

                  const modalGallery = [item.mainImage, ...sanitizedGallery].filter(
                    (image): image is string => Boolean(image && image.trim().length > 0),
                  )

                  const metadataPairs = Object.entries(item.metadata ?? {}).filter(([, value]) =>
                    ["string", "number"].includes(typeof value),
                  ) as Array<[string, string | number]>

                  const getChipClasses = (key: string) => {
                    const normalized = key.toLowerCase()

                    if (normalized.includes("location")) {
                      return "bg-secondary/20 text-stone-900 border border-secondary/40"
                    }

                    if (
                      normalized.includes("established") ||
                      normalized.includes("date") ||
                      normalized.includes("duration")
                    ) {
                      return "bg-secondary/15 text-stone-900 border border-secondary/35"
                    }

                    return "bg-secondary/10 text-stone-800 border border-secondary/30"
                  }

                  return (
                    <motion.article
                      key={item.id}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="grid lg:grid-cols-12 gap-5 lg:gap-8 items-stretch"
                    >
                      <div className={`lg:col-span-7 ${reverse ? "lg:order-2" : ""}`}>
                        <div
                          className="relative h-[280px] md:h-[420px] overflow-hidden rounded-[1.5rem] cursor-pointer"
                          onClick={() => openModal(modalGallery, item.title)}
                        >
                          <Image
                            src={item.mainImage || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-700 hover:scale-105"
                            sizes="(max-width: 1024px) 100vw, 58vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                            <h3 className="font-[var(--heading-font)] text-2xl md:text-3xl text-white font-semibold mb-2">{item.title}</h3>
                            {item.subtitle && <p className="text-stone-200 text-sm md:text-base">{item.subtitle}</p>}
                          </div>
                        </div>
                      </div>

                      <div className={`lg:col-span-5 ${reverse ? "lg:order-1" : ""}`}>
                        <div className="h-full rounded-[1.5rem] border border-stone-200 bg-white p-5 md:p-7 shadow-[0_12px_30px_-20px_rgba(0,0,0,0.45)]">
                          <div className="flex flex-wrap gap-2 mb-4">
                            {metadataPairs.slice(0, 3).map(([key, value]) => (
                              <span
                                key={key}
                                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium capitalize ${getChipClasses(key)}`}
                              >
                                {key.replace(/[-_]/g, " ")}: {String(value)}
                              </span>
                            ))}
                          </div>

                          <p className="text-stone-700 leading-relaxed text-sm md:text-base">
                            {item.shortText || "Discover the stories, rituals, and landscapes that shape the Kathmandu Valley."}
                          </p>

                          {hasExpanded && (
                            <div className="mt-4 space-y-3">
                              {item.content
                                .split("\n\n")
                                .filter(Boolean)
                                .map((paragraph, paragraphIndex) => (
                                  <p key={paragraphIndex} className="text-stone-600 leading-relaxed text-sm md:text-base">
                                    {paragraph}
                                  </p>
                                ))}
                            </div>
                          )}

                          <button
                            onClick={() => toggleExpanded(item.id)}
                            className="mt-6 inline-flex items-center rounded-full bg-stone-900 text-white px-4 py-2 text-xs md:text-sm font-semibold hover:bg-stone-700 transition-colors"
                          >
                            {hasExpanded ? "Read Less" : "Read More"}
                          </button>

                          {sanitizedGallery.length > 0 && (
                            <div className="mt-6 grid grid-cols-4 gap-2">
                              {sanitizedGallery.slice(0, 4).map((image, imageIndex) => (
                                <button
                                  key={`${item.id}-thumb-${imageIndex}`}
                                  onClick={() => openModal(modalGallery, item.title, imageIndex + 1)}
                                  className="relative h-16 rounded-lg overflow-hidden"
                                >
                                  <Image src={image} alt={`${item.title} ${imageIndex + 1}`} fill className="object-cover" sizes="80px" />
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.article>
                  )
                })}
              </div>
            </div>
          )
        })}
      </section>

      {modalOpen && modalImages.length > 0 && (
        <div className="fixed inset-0 z-[120] bg-black/90 p-4 md:p-8" onClick={closeModal}>
          <div
            className="mx-auto h-full max-w-6xl rounded-2xl border border-white/15 bg-black/50 backdrop-blur-sm flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 md:px-6 py-4 border-b border-white/15 flex items-center justify-between gap-3">
              <h3 className="text-white font-[var(--heading-font)] text-xl md:text-2xl truncate">{modalTitle}</h3>
              <button className="text-white/80 hover:text-white text-sm" onClick={closeModal}>
                Close
              </button>
            </div>

            <div className="relative flex-1">
              <Image
                src={modalImages[activeImageIndex] || "/placeholder.svg"}
                alt={`${modalTitle} image ${activeImageIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>

            <div className="px-5 md:px-6 py-4 border-t border-white/15 flex items-center justify-between">
              <button
                onClick={prevImage}
                className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm"
              >
                <ArrowLeft size={16} /> Previous
              </button>
              <span className="text-white/70 text-xs md:text-sm">
                {activeImageIndex + 1} / {modalImages.length}
              </span>
              <button
                onClick={nextImage}
                className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm"
              >
                Next <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
