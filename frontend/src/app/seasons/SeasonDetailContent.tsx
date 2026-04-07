"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CloudSun,
  Sparkles,
  Trees,
  Waves,
} from "lucide-react";

export type SeasonDetailData = {
  id?: string;
  slug: string;
  name: string;
  image: string;
  description: string;
  bestMonths?: string[];
  longDescription?: string[];
  highlights?: string[];
  tips?: string[];
  gallery?: string[];
  temperature?: string;
  duration?: string;
  climateType?: string;
  tagline?: string;
  weatherPatterns?: string[];
  natureChanges?: string[];
  culturalAspects?: string[];
  activities?: string[];
  climateDetails?: string[];
  bestActivities?: string[];
  whatToWear?: string[];
  regionalVariations?: string[];
};

type DetailListSection = {
  title: string;
  items: string[];
};

function sectionEntryAnimation(index = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay: index * 0.08 },
    viewport: { once: true },
  };
}

function ensureItems(values: string[] | undefined, fallback: string[]): string[] {
  if (values && values.length > 0) return values;
  return fallback;
}

function DetailPanel({ section, index }: { section: DetailListSection; index: number }) {
  return (
    <motion.article
      {...sectionEntryAnimation(index)}
      className="rounded-[2rem] border border-stone-200 bg-white p-6 md:p-8 shadow-sm"
    >
      <h3 className="font-[var(--heading-font)] text-2xl font-bold text-primary">
        {section.title}
      </h3>
      <ul className="mt-5 space-y-3 text-stone-600">
        {section.items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm md:text-base leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-secondary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

export default function SeasonDetailContent({
  season,
  otherSeasons,
}: {
  season: SeasonDetailData;
  otherSeasons: SeasonDetailData[];
}) {
  const monthText =
    season.bestMonths && season.bestMonths.length > 0
      ? season.bestMonths.join(", ")
      : "All year";

  const overviewParagraphs =
    season.longDescription && season.longDescription.length > 0
      ? season.longDescription
      : [season.description];

  const tagline = season.tagline || season.description;
  const highlights = ensureItems(season.highlights, [season.description]);
  const tips = ensureItems(season.tips, [
    "Check local weather updates before planning each day.",
    "Pack layers so you can adapt across day and night temperatures.",
    "Book transport and stays in advance for peak travel months.",
  ]);

  const weatherPatterns = ensureItems(season.weatherPatterns, highlights);
  const natureChanges = ensureItems(season.natureChanges, [
    "Regional landscapes shift significantly across this season.",
    "Visibility and trail conditions vary by altitude and time of day.",
    "Local ecosystems and agriculture adapt to seasonal rhythms.",
  ]);
  const culturalAspects = ensureItems(season.culturalAspects, tips);
  const activities = ensureItems(season.activities, [
    "Guided sightseeing and cultural walks",
    "Scenic drives and short outdoor excursions",
    "Photography-focused day trips",
  ]);

  const detailSections: DetailListSection[] = [
    {
      title: "Climate Details",
      items: ensureItems(season.climateDetails, weatherPatterns),
    },
    {
      title: "Best Activities",
      items: ensureItems(season.bestActivities, activities),
    },
    {
      title: "What to Wear",
      items: ensureItems(season.whatToWear, tips),
    },
    {
      title: "Regional Variations",
      items: ensureItems(season.regionalVariations, natureChanges),
    },
  ];

  const galleryFromApi = season.gallery && season.gallery.length > 0 ? season.gallery : [];
  const relatedImages = otherSeasons.map((item) => item.image).filter(Boolean);
  const galleryImages = [...galleryFromApi, season.image, ...relatedImages].slice(0, 3);

  const highlightCards = [
    { title: "Weather Patterns", icon: CloudSun, points: weatherPatterns },
    { title: "Nature Changes", icon: Trees, points: natureChanges },
    { title: "Cultural Aspects", icon: Sparkles, points: culturalAspects },
    { title: "Activities", icon: Waves, points: activities },
  ];

  return (
    <>
      <section className="relative min-h-[72vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={season.image || "/placeholder.svg"}
            alt={`${season.name} in Nepal`}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-50 via-black/20 to-black/40" />
        </div>

        <div className="relative container-max px-6 md:px-12 py-28 md:py-36 flex min-h-[72vh] flex-col justify-end">
          <motion.div
            {...sectionEntryAnimation(0)}
            className="mb-7 flex flex-wrap items-center gap-3 text-white/90"
          >
            <Link
              href="/seasons"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.25em] transition-colors hover:bg-white/20"
            >
              <ArrowLeft size={14} />
              Back to Seasons
            </Link>
            <span className="text-[10px] uppercase tracking-[0.35em] text-white/70">Season Detail</span>
          </motion.div>

          <motion.h1
            {...sectionEntryAnimation(1)}
            className="font-[var(--heading-font)] text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tighter"
          >
            {season.name}
          </motion.h1>

          <motion.p
            {...sectionEntryAnimation(2)}
            className="mt-5 max-w-3xl text-base md:text-xl text-stone-200 leading-relaxed"
          >
            {tagline}
          </motion.p>
        </div>
      </section>

      <section className="py-20 md:py-24 px-6 md:px-12">
        <div className="container-max">
          <motion.div {...sectionEntryAnimation(0)} className="mb-10">
            <span className="text-secondary font-semibold tracking-[0.3em] uppercase text-xs mb-4 block">
              Seasonal Overview
            </span>
            <h2 className="font-[var(--heading-font)] text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight">
              Understanding <span className="italic font-normal">{season.name}</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
            <motion.article
              {...sectionEntryAnimation(1)}
              className="lg:col-span-8 rounded-[2.5rem] border border-stone-200 bg-white p-7 md:p-10 shadow-sm"
            >
              <p className="text-stone-700 text-base md:text-lg leading-relaxed">{overviewParagraphs[0]}</p>
              {overviewParagraphs[1] && (
                <p className="mt-5 text-stone-600 text-sm md:text-base leading-relaxed">
                  {overviewParagraphs[1]}
                </p>
              )}
            </motion.article>

            <motion.aside
              {...sectionEntryAnimation(2)}
              className="lg:col-span-4 rounded-[2.5rem] border border-stone-200 bg-white p-7 md:p-8 shadow-sm"
            >
              <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-secondary/70 mb-6">
                Key Characteristics
              </h3>
              {/* Keep tokenized typography, radius, borders, and spacing equal to existing cards. */}
              <div className="space-y-5">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Temperature</p>
                  <p className="mt-1 text-lg font-semibold text-primary">
                    {season.temperature || "Varies by region"}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Duration</p>
                  <p className="mt-1 text-lg font-semibold text-primary">{season.duration || monthText}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Climate Type</p>
                  <p className="mt-1 text-lg font-semibold text-primary">
                    {season.climateType || "Seasonal climate pattern"}
                  </p>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 px-6 md:px-12 bg-stone-100/60">
        <div className="container-max">
          <motion.div {...sectionEntryAnimation(0)} className="mb-10">
            <span className="text-secondary font-semibold tracking-[0.3em] uppercase text-xs mb-4 block">
              Highlights
            </span>
            <h2 className="font-[var(--heading-font)] text-4xl md:text-5xl font-bold text-primary leading-tight">
              What Defines <span className="italic font-normal">{season.name}</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {highlightCards.map((card, index) => (
              <motion.article
                key={card.title}
                {...sectionEntryAnimation(index)}
                className="group rounded-[2rem] border border-stone-200 bg-white p-6 md:p-8 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                  <card.icon size={22} />
                </div>
                <h3 className="font-[var(--heading-font)] text-2xl font-bold text-primary">{card.title}</h3>
                <ul className="mt-4 space-y-2.5 text-sm text-stone-600">
                  {card.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-secondary" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 px-6 md:px-12">
        <div className="container-max">
          <motion.div {...sectionEntryAnimation(0)} className="mb-10">
            <span className="text-secondary font-semibold tracking-[0.3em] uppercase text-xs mb-4 block">
              Visual Story
            </span>
            <h2 className="font-[var(--heading-font)] text-4xl md:text-5xl font-bold text-primary leading-tight">
              {season.name} <span className="italic font-normal">Gallery</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <motion.figure
                key={`${image}-${index}`}
                {...sectionEntryAnimation(index)}
                className="relative overflow-hidden rounded-[2.5rem] border border-stone-200 bg-white shadow-sm h-64 md:h-72"
              >
                <Image
                  src={image}
                  alt={`${season.name} visual ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 px-6 md:px-12 bg-stone-100/60">
        <div className="container-max">
          <motion.div {...sectionEntryAnimation(0)} className="mb-10">
            <span className="text-secondary font-semibold tracking-[0.3em] uppercase text-xs mb-4 block">
              In Depth
            </span>
            <h2 className="font-[var(--heading-font)] text-4xl md:text-5xl font-bold text-primary leading-tight">
              Plan Your <span className="italic font-normal">{season.name} Journey</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {detailSections.map((section, index) => (
              <DetailPanel key={section.title} section={section} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 px-6 md:px-12">
        <div className="container-max">
          <motion.div
            {...sectionEntryAnimation(0)}
            className="rounded-[2.5rem] border border-stone-200 bg-white p-8 md:p-12 shadow-sm"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div>
                <h2 className="font-[var(--heading-font)] text-4xl md:text-5xl font-bold text-primary leading-tight">
                  Continue Exploring
                </h2>
                <p className="mt-4 text-stone-600 max-w-2xl leading-relaxed">
                  Compare seasonal experiences and pick the perfect time to travel through Nepal.
                </p>
              </div>

              <Link
                href="/seasons"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-[11px] font-black uppercase tracking-[0.22em] text-white transition-all hover:bg-secondary"
              >
                All Seasons
                <ArrowRight size={15} />
              </Link>
            </div>

            {otherSeasons.length > 0 && (
              <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {otherSeasons.map((item, index) => (
                  <motion.div
                    key={item.slug}
                    {...sectionEntryAnimation(index)}
                    className="group rounded-3xl border border-stone-200 bg-stone-50 p-5 hover:border-secondary/40 transition-colors"
                  >
                    <Link href={`/seasons/${item.slug}`} className="block">
                      <p className="text-[10px] uppercase tracking-widest text-secondary font-bold">Season</p>
                      <h3 className="mt-2 font-[var(--heading-font)] text-2xl font-bold text-primary">
                        {item.name}
                      </h3>
                      <p className="mt-2 text-sm text-stone-600 line-clamp-2">{item.description}</p>
                      <div className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-primary group-hover:text-secondary transition-colors">
                        Explore
                        <ArrowRight size={14} />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
