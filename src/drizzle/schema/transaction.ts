import { relations } from 'drizzle-orm';
import {
  foreignKey,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { inventory } from './inventory';
import { refItem } from './ref_item';

export const transactionType = pgEnum('TransactionType', [
  'DEPOSIT',
  'WITHDRAW',
  'TRANSFER',
  'PRODUCTION',
  'LOSS',
]);
export const transaction = pgTable(
  'Transaction',
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    type: transactionType().notNull(),
    quantity: integer().notNull(),
    note: text(),
    itemId: uuid().notNull(),
    fromInventoryId: uuid(),
    toInventoryId: uuid(),
    createdById: uuid().notNull(),
    createdAt: timestamp({ precision: 3, mode: 'string' })
      .defaultNow()
      .notNull(),
  },
  table => [
    foreignKey({
      columns: [table.itemId],
      foreignColumns: [refItem.id],
      name: 'Transaction_itemId_fkey',
    })
      .onUpdate('cascade')
      .onDelete('restrict'),

    foreignKey({
      columns: [table.fromInventoryId],
      foreignColumns: [inventory.id],
      name: 'Transaction_fromInventoryId_fkey',
    })
      .onUpdate('cascade')
      .onDelete('set null'),

    foreignKey({
      columns: [table.toInventoryId],
      foreignColumns: [inventory.id],
      name: 'Transaction_toInventoryId_fkey',
    })
      .onUpdate('cascade')
      .onDelete('set null'),
  ],
);

export const TransactionRelations = relations(transaction, ({ one }) => ({
  refItem: one(refItem, {
    fields: [transaction.itemId],
    references: [refItem.id],
  }),
  inventory_fromInventoryId: one(inventory, {
    fields: [transaction.fromInventoryId],
    references: [inventory.id],
    relationName: 'transaction_fromInventoryId_inventory_id',
  }),
  inventory_toInventoryId: one(inventory, {
    fields: [transaction.toInventoryId],
    references: [inventory.id],
    relationName: 'transaction_toInventoryId_inventory_id',
  }),
}));
