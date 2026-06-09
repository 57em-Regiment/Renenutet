import {
  foreignKey,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';
import { refLocation } from './ref_location';
import { stock } from './stock';
import { transaction } from './transaction';

export const inventory = pgTable(
  'Inventory',
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    name: text().notNull(),
    accessCode: varchar({ length: 6 }),
    locationId: uuid().notNull(),
    ownerId: text(),
    createdAt: timestamp({ precision: 3, mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp({ precision: 3, mode: 'date' }).defaultNow().notNull(), //La maj auto de ce champ est géré via une function et un trigger en DB. Lors de la maj d'un champ de la ligne + Lors d ela maj d'un stock lié
  },
  table => [
    foreignKey({
      columns: [table.locationId],
      foreignColumns: [refLocation.id],
      name: 'Inventory_locationId_fkey',
    })
      .onUpdate('cascade')
      .onDelete('restrict'),
  ],
);

export const inventoryRelations = relations(inventory, ({ one, many }) => ({
  refLocation: one(refLocation, {
    fields: [inventory.locationId],
    references: [refLocation.id],
  }),
  transactions_fromInventoryId: many(transaction, {
    relationName: 'transaction_fromInventoryId_inventory_id',
  }),
  transactions_toInventoryId: many(transaction, {
    relationName: 'transaction_toInventoryId_inventory_id',
  }),
  stocks: many(stock),
}));
