import { relations } from 'drizzle-orm';
import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { stock } from './stock';
import { transaction } from './transaction';
export const refItem = pgTable('ref_item', {
  id: uuid().defaultRandom().primaryKey().notNull(),
});

export const refItemRelations = relations(refItem, ({ many }) => ({
  transactions: many(transaction),
  stocks: many(stock),
}));
