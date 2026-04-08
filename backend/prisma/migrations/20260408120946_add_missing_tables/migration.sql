/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Package` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Destination" ADD COLUMN     "location" TEXT;

-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "accent" TEXT,
ADD COLUMN     "difficulty" TEXT,
ADD COLUMN     "duration" TEXT,
ADD COLUMN     "maxAltitude" TEXT,
ADD COLUMN     "subtitle" TEXT;

-- AlterTable
ALTER TABLE "Package" ADD COLUMN     "image" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "Trek" ADD COLUMN     "regionId" TEXT;

-- CreateTable
CREATE TABLE "Region" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "trailCount" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "altitude" INTEGER NOT NULL DEFAULT 3500,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "color" TEXT,
    "image" TEXT NOT NULL,
    "highlights" TEXT[],
    "categoryId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Season" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "bestMonths" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Season_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faq" (
    "id" TEXT NOT NULL,
    "slug" TEXT,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "category" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Faq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactInquiry" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'UNREAD',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "accommodation" TEXT,
    "budget" TEXT,
    "destination" TEXT,
    "duration" TEXT,
    "groupSize" TEXT,
    "nationality" TEXT,
    "phone" TEXT,
    "tripType" TEXT,

    CONSTRAINT "ContactInquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InfoSection" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "tag" TEXT,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "mainImage" TEXT,
    "gallery" TEXT[],
    "shortText" TEXT,
    "content" TEXT NOT NULL,
    "metadata" JSONB,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InfoSection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Region_name_key" ON "Region"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Region_slug_key" ON "Region"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Activity_slug_key" ON "Activity"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Season_slug_key" ON "Season"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Faq_slug_key" ON "Faq"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "InfoSection_slug_key" ON "InfoSection"("slug");

-- CreateIndex
CREATE INDEX "InfoSection_category_idx" ON "InfoSection"("category");

-- CreateIndex
CREATE INDEX "InfoSection_tag_idx" ON "InfoSection"("tag");

-- CreateIndex
CREATE UNIQUE INDEX "Package_slug_key" ON "Package"("slug");

-- AddForeignKey
ALTER TABLE "Trek" ADD CONSTRAINT "Trek_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE SET NULL ON UPDATE CASCADE;
