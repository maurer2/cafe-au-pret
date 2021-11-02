export const drinks = [
  'Coffee',
  'Iced',
  'Tea',
  'Frappe',
  'Smoothie',
  'Other',
] as const;

export type Drinks = typeof drinks[number];

export enum DrinkType {
  COFFEE = 'Coffee',
  ICED = 'Iced',
  TEA = 'Tea',
  FRAPPE = 'Frappe',
  SMOOTHIE = 'Smoothie',
  OTHER = 'Other',
}
