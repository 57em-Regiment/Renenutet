import { container } from "@/infrastructure/container";
import {
  stockInventoryParamSchema,
  stockItemParamSchema,
  stockParamSchema,
  stockSchema,
  updateStockSchema,
} from "@57eme-regiment/renenutet-api-contract/schemas/stock.schema";
import { ZodTypeProvider } from "@fastify/type-provider-zod";
import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { StockController } from "./stock.controller";

const errorSchema = z.object({ message: z.string(), error: z.string() });

export async function stockRoutes(app: FastifyInstance) {
  const ctrl = container.resolve(StockController);
  const server = app.withTypeProvider<ZodTypeProvider>();

  server.get("/", {
    schema: { response: { 200: z.array(stockSchema) } },
  }, ctrl.getAll.bind(ctrl));

  server.get("/inventory/:inventoryId", {
    schema: {
      params: stockInventoryParamSchema,
      response: { 200: z.array(stockSchema), 404: errorSchema },
    },
  }, ctrl.getByInventory.bind(ctrl));

  server.get("/item/:itemId", {
    schema: {
      params: stockItemParamSchema,
      response: { 200: z.array(stockSchema), 404: errorSchema },
    },
  }, ctrl.getByItem.bind(ctrl));

  server.get("/:inventoryId/:itemId", {
    schema: {
      params: stockParamSchema,
      response: { 200: stockSchema, 404: errorSchema },
    },
  }, ctrl.getByKey.bind(ctrl));

  server.put("/:inventoryId/:itemId", {
    schema: {
      params: stockParamSchema,
      body: updateStockSchema,
      response: { 200: stockSchema, 404: errorSchema },
    },
  }, ctrl.update.bind(ctrl));
}
