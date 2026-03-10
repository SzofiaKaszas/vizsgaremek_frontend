export const Property= [
  "house",
  "flat",
  "skyscraper",
] as const;

export type PropertyType = typeof Property[keyof typeof Property];

export const Heating= [
  "radiator",
  "airconditioner",
  "convector",
  "floor",
] as const;

export type HeatingType = typeof Heating[keyof typeof Heating];

export const Furnishing= [
  "none",
  "partial",
  "full",
] as const;

export type FurnishingType = typeof Furnishing[keyof typeof Furnishing];

export const KitchenFurnishing= [
  "none",
  "partial",
  "full",
] as const;

export type KitchenFurnishingType = typeof KitchenFurnishing[keyof typeof KitchenFurnishing];