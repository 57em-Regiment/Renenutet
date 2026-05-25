import { container } from "@/infrastructure/container";
import { ZodTypeProvider } from "@fastify/type-provider-zod";
import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { StockController } from "./stock.controller";
import {
  stockParamSchema,
  stockSchema,
  updateStockSchema,
} from "@57em-regiment/renenutet-api-contract/schemas/stock.schema";

const errorSchema = z.object({ message: z.string(), error: z.string() });

export async function inventoryRoutes(app: FastifyInstance) {
  const ctrl = container.resolve(StockController);
  const server = app.withTypeProvider<ZodTypeProvider>();

  server.get(
    "/",
    {
      schema: { response: { 200: z.array(stockSchema) } },
    },
    ctrl.getAll.bind(ctrl),
  );

  server.get(
    "/:id",
    {
      schema: {
        params: stockParamSchema,
        response: { 200: stockSchema, 404: errorSchema },
      },
    },
    ctrl.getById.bind(ctrl),
  );

  server.get(
    "/:inventoryId",
    {
      schema: {
        params: stockParamSchema,
        response: { 200: z.array(stockSchema), 404: errorSchema },
      },
    },
    ctrl.getByInventory.bind(ctrl),
  );

  server.get(
    "/:itemId",
    {
      schema: {
        params: stockParamSchema,
        response: { 200: z.array(stockSchema), 404: errorSchema },
      },
    },
    ctrl.getByItem.bind(ctrl),
  );

  server.get(
    "/:id/:inventoryId",
    {
      schema: {
        params: stockParamSchema,
        response: { 200: stockSchema, 404: errorSchema },
      },
    },
    ctrl.getStock.bind(ctrl),
  );

  server.put(
    "/:id",
    {
      schema: {
        params: stockParamSchema,
        body: updateStockSchema,
        response: { 200: stockSchema, 404: errorSchema },
      },
    },
    ctrl.update.bind(ctrl),
  );
}
