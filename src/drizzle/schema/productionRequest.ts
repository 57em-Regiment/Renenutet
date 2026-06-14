import { relations } from 'drizzle-orm';
import {
  foreignKey,
  integer,
  pgTable,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { stock } from './stock';

export const productionRequest = pgTable(
  'ProductionRequest',
  {
    id: uuid().defaultRandom().primaryKey().notNull(),

    itemId: uuid().notNull(),
    inventoryId: uuid(),
    quantity: integer().notNull(),

    createdAt: timestamp({ precision: 3, mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp({ precision: 3, mode: 'date' }).defaultNow().notNull(), //La maj auto de ce champ est géré via une function et un trigger en DB. Lors de la maj d'un champ de la ligne
  },
  table => [
    foreignKey({
      columns: [table.itemId, table.inventoryId],
      foreignColumns: [stock.itemId, stock.inventoryId],
      name: 'ProductionRequest_itemId_inventoryId_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
  ],
);

export const productionRequestRelations = relations(
  productionRequest,
  ({ one }) => ({
    stock: one(stock, {
      fields: [productionRequest.itemId],
      references: [stock.itemId],
    }),
  }),
);
