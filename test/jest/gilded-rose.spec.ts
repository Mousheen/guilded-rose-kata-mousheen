import { Item } from '@/models/item';
import { ItemName } from '@/models/itemName';

import { GildedRose } from '@/gilded-rose';


describe('Gilded Rose', () => {

  it('should decrease the quality and sellIn values for normal items', () => {
    const normalItem = new Item(ItemName.NormalItem, 10, 20);
    const gildedRose = new GildedRose([normalItem]);

    gildedRose.updateQuality();

    expect(normalItem.sellIn).toBe(9);
    expect(normalItem.quality).toBe(19);
  });

  it('should not decrease quality of normal items below 0', () => {
    const normalItem = new Item(ItemName.NormalItem, 10, 0);
    const gildedRose = new GildedRose([normalItem]);

    gildedRose.updateQuality();

    expect(normalItem.quality).toBe(0);
  });

  it('should degrade quality of normal and Conjured items correctly', () => {
    const normalItem = new Item(ItemName.NormalItem, 10, 20);
    const conjuredItem = new Item(ItemName.ConjuredManaCake, 10, 20);
    const gildedRose = new GildedRose([normalItem, conjuredItem]);

    gildedRose.updateQuality();

    expect(normalItem.quality).toBe(19); // Normal items degrade by 1
    expect(conjuredItem.quality).toBe(18); // Conjured items degrade by 2
  });

  it('should degrade quality of Conjured items twice as fast after the sell by date', () => {
    const conjuredItem = new Item(ItemName.ConjuredManaCake, 0, 20);
    const gildedRose = new GildedRose([conjuredItem]);

    gildedRose.updateQuality();

    expect(conjuredItem.quality).toBe(16); // Conjured items degrade by 4 after expiry date
  });

  // Test for quality increase by 3 when there are 5 days or less
  it('should increase the quality of Backstage Passes by 3 when there are 5 days or less', () => {
    const backstagePass = new Item(ItemName.BackstagePasses, 5, 20);
    const gildedRose = new GildedRose([backstagePass]);

    gildedRose.updateQuality();

    expect(backstagePass.quality).toBe(23);
  });

  // Test for quality increase by 2 when there are 10 days or less
  it('should increase the quality of Backstage Passes by 2 when there are 10 days or less', () => {
    const backstagePass = new Item(ItemName.BackstagePasses, 10, 20);
    const gildedRose = new GildedRose([backstagePass]);

    gildedRose.updateQuality();

    expect(backstagePass.quality).toBe(22);
  });

  it('should drop the quality of Backstage Passes to 0 after the concert', () => {
    const backstagePass = new Item(ItemName.BackstagePasses, 0, 20);
    const gildedRose = new GildedRose([backstagePass]);

    gildedRose.updateQuality();

    expect(backstagePass.quality).toBe(0);
  });

  it('should increase the quality of Backstage Passes as the concert date approaches', () => {
    const backstagePass = new Item(ItemName.BackstagePasses, 11, 20);
    const gildedRose = new GildedRose([backstagePass]);

    gildedRose.updateQuality();

    expect(backstagePass.quality).toBe(21);
  });


  it('should not decrease the quality and sellIn of Sulfuras', () => {
    const sulfuras = new Item(ItemName.Sulfuras, 10, 80);
    const gildedRose = new GildedRose([sulfuras]);

    gildedRose.updateQuality();

    expect(sulfuras.sellIn).toBe(10);
    expect(sulfuras.quality).toBe(80);
  });

  it('should increase the quality of Aged Brie as it gets older', () => {
    const agedBrie = new Item(ItemName.AgedBrie, 10, 20);
    const gildedRose = new GildedRose([agedBrie]);

    gildedRose.updateQuality();

    expect(agedBrie.quality).toBe(21);
  });

  it('should never increase the quality of an item above 50', () => {
    const agedBrie = new Item(ItemName.AgedBrie, 10, 50);
    const gildedRose = new GildedRose([agedBrie]);

    gildedRose.updateQuality();

    expect(agedBrie.quality).toBe(50);
  });
});
