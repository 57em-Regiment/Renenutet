-- AddForeignKey
ALTER TABLE "ProductionRequest" ADD CONSTRAINT "ProductionRequest_itemId_inventoryId_fkey" FOREIGN KEY ("itemId", "inventoryId") REFERENCES "Stock"("itemId", "inventoryId") ON DELETE CASCADE ON UPDATE CASCADE;
