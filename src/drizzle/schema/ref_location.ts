import { relations } from 'drizzle-orm';
import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { inventory } from './inventory';

export const refLocation = pgTable('ref_location', {
  id: uuid().defaultRandom().primaryKey().notNull(),
});

export const refLocationRelations = relations(refLocation, ({ many }) => ({
  inventories: many(inventory),
}));
