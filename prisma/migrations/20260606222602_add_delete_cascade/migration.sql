-- DropForeignKey
ALTER TABLE "Stock" DROP CONSTRAINT "Stock_inventoryId_fkey";

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
