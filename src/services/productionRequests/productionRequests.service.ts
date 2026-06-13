import { ProductionRequestWithStock } from '@/drizzle/schema/zod';
import { krangApi } from '@/lib/api-client';
import { InventoryRepository } from '@/services/inventory/inventory.repository';
import { StockRepository } from '@/services/stock/stock.repository';
import { CONSTANTS } from '@/utils/constants';
import { AppError } from '@57eme-regiment/nabu-errors';
import {
  CreateProductionRequest,
  ProductionRequest,
  ProductionRequestDetail,
} from '@57eme-regiment/renenutet-api-contract';
import { injectable } from 'tsyringe';
import { ProductionRequestsRepository } from './productionRequests.repository';

@injectable()
export class ProductionRequestsService {
  constructor(
    private readonly productionRequestsRepo: ProductionRequestsRepository,
    private readonly stockRepo: StockRepository,
    private readonly inventoryRepo: InventoryRepository,
  ) {}

  async create(data: CreateProductionRequest): Promise<ProductionRequest> {
    const prs = await this.productionRequestsRepo.findByItem(data.itemId);

    if (data.inventoryId) {
      if (prs.filter(pr => pr.inventoryId == data.inventoryId).length)
        throw new AppError(
          'Production Request for this item/location allready exist',
        );

      await this.inventoryRepo.findByIdOrThrow(data.inventoryId);

      const existing = await this.stockRepo.findByKey(
        data.itemId,
        data.inventoryId,
      );
      if (!existing)
        await this.stockRepo.create({
          itemId: data.itemId,
          inventoryId: data.inventoryId,
          quantity: 0,
        });
    }
    if (prs.filter(pr => pr.inventoryId != null).length)
      throw new AppError(
        'Global Production Request for this item allready exist',
      );

    return this.productionRequestsRepo.create(data);
  }

  async updateQuantity(
    id: string,
    quantity: number,
  ): Promise<ProductionRequest> {
    const pr = await this.productionRequestsRepo.findFirstByIdOrThrow(id);
    const fullPr = (await this.enrichWithItems([pr]))[0];
    const maxQuantity =
      (fullPr.item?.maxQuantity || CONSTANTS.DEFAULT_MAX_CAP) *
      (fullPr.stocks?.length ?? 1);

    if (quantity > maxQuantity)
      throw new AppError(
        'You cannot make a request exceeding the total stock capacity',
        400,
      );

    return this.productionRequestsRepo.updateQuantity(id, quantity);
  }

  async delete(id: string): Promise<void> {
    return this.productionRequestsRepo.delete(id);
  }

  async getAll(): Promise<ProductionRequestDetail[]> {
    const pr = await this.productionRequestsRepo.findAll();
    return this.enrichWithItems(pr);
  }

  private async enrichWithItems(
    requests: ProductionRequestWithStock[],
  ): Promise<ProductionRequestDetail[]> {
    const [itemResponse, locationResponse] = await Promise.all([
      krangApi.item.getAll(),
      krangApi.location.getAllNames({}),
    ]);

    if (itemResponse.status !== 200)
      throw new AppError('Failed to fetch items', 400, 'ITEMS_FETCH_FAILED');
    if (locationResponse.status !== 200)
      throw new AppError(
        'Failed to fetch locations',
        400,
        'LOCATIONS_FETCH_FAILED',
      );

    const itemsById = new Map(itemResponse.body.map(i => [i.id, i]));
    const locationsById = new Map(locationResponse.body.map(l => [l.id, l]));

    const inventoryIds = [
      ...new Set(requests.flatMap(pr => pr.stocks.map(s => s.inventoryId))),
    ];
    const inventories = await this.inventoryRepo.findByIds(inventoryIds);
    const inventoryFullNameById = new Map(
      inventories.map(inv => {
        const loc = locationsById.get(inv.locationId);
        const fullName = [inv.name, loc?.type, loc?.town.name, loc?.region.name]
          .filter(Boolean)
          .join(' - ');
        return [inv.id, fullName];
      }),
    );

    return requests.map(pr => ({
      ...pr,
      item: { ...itemsById.get(pr.itemId) },
      stocks: pr.stocks.map(s => ({
        ...s,
        inventoryFullName:
          inventoryFullNameById.get(s.inventoryId) ?? s.inventoryId,
      })),
    }));
  }
}
