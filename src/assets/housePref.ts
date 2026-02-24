export const PropertyType= [
  "house",
  "flat",
  "skyscraper",
] as const;

export type PropertyType = typeof PropertyType[keyof typeof PropertyType];

export const HeatingType= [
  "radiator",
  "airconditioner",
  "convector",
  "floor",
] as const;

export type HeatingType = typeof HeatingType[keyof typeof HeatingType];

export const Furnishing= [
  "none",
  "partial",
  "full",
] as const;

export type Furnishing = typeof Furnishing[keyof typeof Furnishing];

export const KitchenFurnishing= [
  "none",
  "partial",
  "full",
] as const;

export type KitchenFurnishing = typeof KitchenFurnishing[keyof typeof KitchenFurnishing];