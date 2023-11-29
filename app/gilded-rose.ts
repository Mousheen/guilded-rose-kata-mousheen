import { Item } from "@/models/item";
import { ItemName } from "@/models/itemName";

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let item of this.items) {
      this.updateItemQuality(item);
    }
    return this.items;
  }

  updateItemQuality(item: Item) {
    if (item.name === ItemName.Sulfuras) {
      return; // Sulfuras does not change
    }

    if (item.name !== ItemName.Sulfuras) {
      if (item.sellIn <= 0) {
        this.adjustQualityForExpiredItem(item);
      } else {
        this.adjustQualityForItem(item);
      }
    }

    item.sellIn--;
  }

  adjustQualityForItem(item: Item) {
    // Conjured items degrade twice as fast after expiration
    if (this.isConjuredItem(item)) {
      this.decreaseQuality(item, 2);
      return;
    }

    switch (item.name) {
      case ItemName.AgedBrie:
        this.increaseQuality(item, 1);
        break;
      case ItemName.BackstagePasses:
        this.adjustBackstagePassQuality(item);
        break;
      default:
        this.decreaseQuality(item, 1);
        break;
    }
  }

  adjustQualityForExpiredItem(item: Item) {
    // Conjured items degrade twice as fast after expiration
    if (this.isConjuredItem(item)) {
      this.decreaseQuality(item, 4);
      return;
    }

    switch (item.name) {
      case ItemName.AgedBrie:
        this.increaseQuality(item, 1);
        break;
      case ItemName.BackstagePasses:
        item.quality = 0;
        break;
      default:
        this.decreaseQuality(item, 1);
        break;
    }
  }

  increaseQuality(item: Item, amount: number) {
    if (item.quality < 50) {
      item.quality += amount;
    }
  }

  decreaseQuality(item: Item, amount: number) {
    if (item.quality > 0) {
      item.quality -= amount;
    }
  }

  adjustBackstagePassQuality(item: Item) {
    this.increaseQuality(item, 1);

    if (item.sellIn < 11) {
      this.increaseQuality(item, 1);
    }

    if (item.sellIn < 6) {
      this.increaseQuality(item, 1);
    }
  }

  private isConjuredItem(item: Item): boolean {
    return item.name.startsWith('Conjured');
  }
}
