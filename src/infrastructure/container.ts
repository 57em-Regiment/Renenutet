import { InventoryController } from '@/controller/inventory/inventory.controller';
import { StockController } from '@/controller/stock/stock.controller';
import { InventoryRepository } from '@/repository/inventory/inventory.repository';
import { IInventoryRepository } from '@/repository/inventory/inventory.repository.interface';
import { StockRepository } from '@/repository/stock/stock.repository';
import { IStockRepository } from '@/repository/stock/stock.repository.interface';
import { InventoryService } from '@/service/inventory/inventory.service';
import { IInventoryService } from '@/service/inventory/inventory.service.interface';
import { StockService } from '@/service/stock/stock.service';
import { IStockService } from '@/service/stock/stock.service.interface';
import 'reflect-metadata';
import { container } from 'tsyringe';
import { Database } from './database';

container.registerSingleton(Database);
container.registerSingleton<IInventoryRepository>(
  'IInventoryRepository',
  InventoryRepository,
);
container.registerSingleton<IInventoryService>(
  'IInventoryService',
  InventoryService,
);
container.registerSingleton(InventoryController);

container.registerSingleton<IStockRepository>(
  'IStockRepository',
  StockRepository,
);
container.registerSingleton<IStockService>('IStockService', StockService);
container.registerSingleton(StockController);

export { container };
