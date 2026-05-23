-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateTable
CREATE TABLE "Person" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "dateOfBirth" TIMESTAMP(3),
    "birthDisplay" TEXT,
    "dateOfDeath" TIMESTAMP(3),
    "deathDisplay" TEXT,
    "bio" TEXT,
    "profileImageUrl" TEXT,
    "fatherId" TEXT,
    "motherId" TEXT,
    "spouseId" TEXT,
    "isAlive" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "isRootAncestor" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Person_fatherId_idx" ON "Person"("fatherId");

-- CreateIndex
CREATE INDEX "Person_motherId_idx" ON "Person"("motherId");

-- CreateIndex
CREATE INDEX "Person_spouseId_idx" ON "Person"("spouseId");

-- CreateIndex
CREATE INDEX "Person_fullName_idx" ON "Person"("fullName");

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_fatherId_fkey" FOREIGN KEY ("fatherId") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_motherId_fkey" FOREIGN KEY ("motherId") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_spouseId_fkey" FOREIGN KEY ("spouseId") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;
