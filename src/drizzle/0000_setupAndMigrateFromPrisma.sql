CREATE TYPE "public"."TransactionType" AS ENUM('DEPOSIT', 'WITHDRAW', 'TRANSFER', 'PRODUCTION', 'LOSS');--> statement-breakpoint
CREATE TABLE "Inventory" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"accessCode" varchar(6),
	"locationId" uuid NOT NULL,
	"ownerId" text,
	"createdAt" timestamp (3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ProductionRequest" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"itemId" uuid NOT NULL,
	"inventoryId" uuid,
	"quantity" integer NOT NULL,
	"createdAt" timestamp (3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ref_item" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ref_location" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Stock" (
	"itemId" uuid NOT NULL,
	"inventoryId" uuid NOT NULL,
	"quantity" integer DEFAULT 0 NOT NULL,
	"minimumQuantity" integer,
	"updatedAt" timestamp (3) DEFAULT now() NOT NULL,
	CONSTRAINT "Stock_pkey" PRIMARY KEY("itemId","inventoryId")
);
--> statement-breakpoint
CREATE TABLE "Transaction" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" "TransactionType" NOT NULL,
	"quantity" integer NOT NULL,
	"note" text,
	"itemId" uuid NOT NULL,
	"fromInventoryId" uuid,
	"toInventoryId" uuid,
	"createdById" uuid NOT NULL,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "public"."ref_location"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "ProductionRequest" ADD CONSTRAINT "ProductionRequest_itemId_inventoryId_fkey" FOREIGN KEY ("itemId","inventoryId") REFERENCES "public"."Stock"("itemId","inventoryId") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "public"."ref_item"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "public"."Inventory"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "public"."ref_item"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_fromInventoryId_fkey" FOREIGN KEY ("fromInventoryId") REFERENCES "public"."Inventory"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_toInventoryId_fkey" FOREIGN KEY ("toInventoryId") REFERENCES "public"."Inventory"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;--> statement-breakpoint
CREATE TRIGGER inventory_updated_at
  BEFORE UPDATE ON "Inventory"
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();--> statement-breakpoint
CREATE TRIGGER stock_updated_at
  BEFORE UPDATE ON "Stock"
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();--> statement-breakpoint
CREATE TRIGGER production_request_updated_at
  BEFORE UPDATE ON "ProductionRequest"
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();--> statement-breakpoint
CREATE OR REPLACE FUNCTION propagate_stock_update_to_inventory()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE "Inventory"
  SET "updatedAt" = now()
  WHERE "id" = NEW."inventoryId";
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;--> statement-breakpoint
CREATE TRIGGER stock_propagate_to_inventory
  AFTER UPDATE ON "Stock"
  FOR EACH ROW EXECUTE FUNCTION propagate_stock_update_to_inventory();