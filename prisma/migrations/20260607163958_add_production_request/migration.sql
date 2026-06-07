-- AlterTable
ALTER TABLE "Stock" ADD COLUMN     "minimumQuantity" INTEGER;

-- CreateTable
CREATE TABLE "ProductionRequest" (
    "id" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "inventoryId" TEXT,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductionRequest_pkey" PRIMARY KEY ("id")
);
