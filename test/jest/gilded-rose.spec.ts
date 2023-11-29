import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {

  it('should decrease the quality and sellIn values for naormal items', () => {
    const gildedRose = new GildedRose([new Item('normal item', 10, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(19);
  });

  it('should not decrease quality below 0', () => {
    const gildedRose = new GildedRose([new Item('normal item', 10, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

});
