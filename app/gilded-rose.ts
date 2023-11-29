export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

// Seperate hardcoded values into enums, better readability, easier to refactor & error prevention.
// Should be in a seperate file.
enum ItemName {
  AgedBrie = 'Aged Brie',
  Sulfuras = 'Sulfuras, Hand of Ragnaros',
  BackstagePasses = 'Backstage passes to a TAFKAL80ETC concert',
}

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
    if (item.name ===  ItemName.Sulfuras) {
      return; // Sulfurus does not change
    }

    this.adjustQualityForItem(item);

    item.sellIn--;

    if (item.sellIn < 0) {
      this.adjustQualityForExpiredItem(item);
    }
  }

  adjustQualityForItem(item: Item) {
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
}
