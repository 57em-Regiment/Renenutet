CREATE OR REPLACE FUNCTION update_inventory_on_stock_change()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE "Inventory" SET "updatedAt" = NOW()
  WHERE id = COALESCE(NEW."inventoryId", OLD."inventoryId");
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER stock_touches_inventory
AFTER INSERT OR UPDATE OR DELETE ON "Stock"
FOR EACH ROW EXECUTE FUNCTION update_inventory_on_stock_change();
