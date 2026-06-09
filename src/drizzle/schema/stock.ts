import { relations } from 'drizzle-orm';
import {
  foreignKey,
  integer,
  pgTable,
  primaryKey,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { inventory } from './inventory';
import { productionRequest } from './productionRequest';
import { refItem } from './ref_item';

export const stock = pgTable(
  'Stock',
  {
    itemId: uuid().notNull(),
    inventoryId: uuid().notNull(),

    quantity: integer().default(0).notNull(),
    minimumQuantity: integer(),

    updatedAt: timestamp({ precision: 3, mode: 'date' }).defaultNow().notNull(), //La maj auto de ce champ est géré via une function et un trigger en DB. Lors de la maj d'un champ de la ligne
  },
  table => [
    primaryKey({
      columns: [table.itemId, table.inventoryId],
      name: 'Stock_pkey',
    }),
    foreignKey({
      columns: [table.itemId],
      foreignColumns: [refItem.id],
      name: 'Stock_itemId_fkey',
    })
      .onUpdate('cascade')
      .onDelete('restrict'),
    foreignKey({
      columns: [table.inventoryId],
      foreignColumns: [inventory.id],
      name: 'Stock_inventoryId_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
  ],
);

export const stockRelations = relations(stock, ({ one, many }) => ({
  productionRequests: many(productionRequest),
  refItem: one(refItem, {
    fields: [stock.itemId],
    references: [refItem.id],
  }),
  inventory: one(inventory, {
    fields: [stock.inventoryId],
    references: [inventory.id],
  }),
}));
