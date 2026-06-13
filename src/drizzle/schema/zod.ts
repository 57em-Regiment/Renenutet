import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from 'drizzle-zod';
import { inventory } from './inventory';
import { productionRequest } from './productionRequest';
import { refItem } from './ref_item';
import { refLocation } from './ref_location';
import { stock } from './stock';
import { transaction } from './transaction';

// Zod schemas — pour la validation runtime
export const inventorySelectSchema = createSelectSchema(inventory);
export const inventoryInsertSchema = createInsertSchema(inventory);
export const inventoryUpdateSchema = createUpdateSchema(inventory);

export const stockSelectSchema = createSelectSchema(stock);
export const stockInsertSchema = createInsertSchema(stock);
export const stockUpdateSchema = createUpdateSchema(stock);

export const transactionSelectSchema = createSelectSchema(transaction);
export const transactionInsertSchema = createInsertSchema(transaction);
export const transactionUpdateSchema = createUpdateSchema(transaction);

export const refItemSelectSchema = createSelectSchema(refItem);
export const refItemInsertSchema = createInsertSchema(refItem);

export const refLocationSelectSchema = createSelectSchema(refLocation);
export const refLocationInsertSchema = createInsertSchema(refLocation);

export const productionRequestSelectSchema =
  createSelectSchema(productionRequest);
export const productionRequestInsertSchema =
  createInsertSchema(productionRequest);
export const productionRequestUpdateSchema =
  createUpdateSchema(productionRequest);

// Types TypeScript — inférés directement depuis Drizzle (sans branding Zod v4)
export type InventorySelect = typeof inventory.$inferSelect;
export type InventoryInsert = typeof inventory.$inferInsert;
export type InventoryUpdate = Partial<InventoryInsert>;

export type StockSelect = typeof stock.$inferSelect;
export type StockInsert = typeof stock.$inferInsert;
export type StockUpdate = Partial<StockInsert>;
export type StockWithProductionRequests = StockSelect & {
  productionRequests: ProductionRequestSelect[];
};

export type TransactionSelect = typeof transaction.$inferSelect;
export type TransactionInsert = typeof transaction.$inferInsert;
export type TransactionUpdate = Partial<TransactionInsert>;

export type RefItemSelect = typeof refItem.$inferSelect;
export type RefItemInsert = typeof refItem.$inferInsert;

export type RefLocationSelect = typeof refLocation.$inferSelect;
export type RefLocationInsert = typeof refLocation.$inferInsert;

export type ProductionRequestSelect = typeof productionRequest.$inferSelect;
export type ProductionRequestInsert = typeof productionRequest.$inferInsert;
export type ProductionRequestUpdate = Partial<ProductionRequestInsert>;
export type ProductionRequestWithStock = ProductionRequestSelect & {
  stocks: StockSelect[];
};
