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
    if (item.name === 'Sulfurus, Hand of Ragnaros') {
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
      case 'Aged Brie':
        this.increaseQuality(item, 1);
        break;
      case 'Backstage passes to a TAFKAL80ETC concert':
        this.adjustBackstagePassQuality(item);
        break;
      default:
        this.decreaseQuality(item, 1);
        break;
    }
  }

  adjustQualityForExpiredItem(item: Item) {
    switch (item.name) {
      case 'Aged Brie': 
        this.increaseQuality(item, 1);
        break;
      case 'Backstage passes to a TAFKAL80ETC concert':
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

  // updateQuality() {
  //   for (let i = 0; i < this.items.length; i++) {
  //     if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
  //       if (this.items[i].quality > 0) {
  //         if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
  //           this.items[i].quality = this.items[i].quality - 1
  //         }
  //       }
  //     } else {
  //       if (this.items[i].quality < 50) {
  //         this.items[i].quality = this.items[i].quality + 1
  //         if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
  //           if (this.items[i].sellIn < 11) {
  //             if (this.items[i].quality < 50) {
  //               this.items[i].quality = this.items[i].quality + 1
  //             }
  //           }
  //           if (this.items[i].sellIn < 6) {
  //             if (this.items[i].quality < 50) {
  //               this.items[i].quality = this.items[i].quality + 1
  //             }
  //           }
  //         }
  //       }
  //     }
  //     if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
  //       this.items[i].sellIn = this.items[i].sellIn - 1;
  //     }
  //     if (this.items[i].sellIn < 0) {
  //       if (this.items[i].name != 'Aged Brie') {
  //         if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
  //           if (this.items[i].quality > 0) {
  //             if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
  //               this.items[i].quality = this.items[i].quality - 1
  //             }
  //           }
  //         } else {
  //           this.items[i].quality = this.items[i].quality - this.items[i].quality
  //         }
  //       } else {
  //         if (this.items[i].quality < 50) {
  //           this.items[i].quality = this.items[i].quality + 1
  //         }
  //       }
  //     }
  //   }

  //   return this.items;
  // }
}
