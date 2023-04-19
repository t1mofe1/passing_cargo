import {
  generateRandomDecimalNumberInRange,
  generateRandomNumberInRange,
  generateRandomNumericString,
} from '@/utils/generate';

export enum PackageStatus {
  Waiting,
  Delivering,
  Delivered,
  Confirmed,
}
export const PackageStatusIcon = {
  [PackageStatus.Waiting]: 'box',
  [PackageStatus.Delivering]: 'truck',
  [PackageStatus.Delivered]: 'truck-loading',
  [PackageStatus.Confirmed]: 'clipboard-check',
} as const;
export const PackageStatusMessage = {
  [PackageStatus.Waiting]: 'Waiting',
  [PackageStatus.Delivering]: 'Delivering',
  [PackageStatus.Delivered]: 'Delivered',
  [PackageStatus.Confirmed]: 'Confirmed',
} as const;
export const PackageStatusColor = {
  [PackageStatus.Waiting]: 'gray',
  [PackageStatus.Delivering]: '#03bebe',
  [PackageStatus.Delivered]: '#20d420',
  [PackageStatus.Confirmed]: '#f0f004',
} as const;

export type Package = {
  id: string;

  category: string;
  item: string;

  count: number;
  weight: number;
  height: number;
  width: number;

  additional_notes?: string;

  status: PackageStatus;

  registered_at: Date;
  picked_up_at?: Date;
  delivered_at?: Date;
  delivery_confirmed_at?: Date;
};

const packageItems = {
  Electronics: ['Laptop', 'Smartphone', 'Camera', 'Headphones', 'Speakers'],
  Food: ['Fruits', 'Vegetables', 'Meat', 'Fish', 'Eggs', 'Milk', 'Bread'],
  Clothes: ['Shirt', 'Pants', 'Shoes', 'Hat', 'Socks', 'Underwear'],
  Books: ['Novel', 'Comics', 'Manga', 'Textbook', 'Magazine', 'Dictionary'],
  Furniture: ['Chair', 'Table', 'Sofa', 'Bed', 'Desk', 'Bookshelf'],
};
const generateRandomPackageCategory = () => {
  const categories = Object.keys(packageItems) as (keyof typeof packageItems)[];
  return categories[Math.floor(Math.random() * categories.length)];
};
const generateRandomPackageItem = (category: keyof typeof packageItems) =>
  packageItems[category][
    Math.floor(Math.random() * packageItems[category].length)
  ];
const generateRandomPackageStatus = () => {
  const statuses = Array(Object.keys(PackageStatus).length / 2)
    .fill(0)
    .map((_, i) => i);

  return statuses[Math.floor(Math.random() * statuses.length)];
};
const generateRandomPackageAdditionalNotes = () => {
  const notes = [
    'Some additional notes',
    'Some other additional notes',
    'Some other other additional notes',
  ];
  return Math.random() > 0.5
    ? notes[Math.floor(Math.random() * notes.length)]
    : undefined;
};

const generateRandomPastDate = (since?: number) => {
  const date = new Date(since || Date.now());
  date.setDate(date.getDate() - Math.floor(Math.random() * 10));
  return date;
};
function generateRandomDateInRange(since: number, until: number) {
  const dateRange = until - since;

  const randomDate = new Date(since + Math.random() * dateRange);

  return randomDate;
}

const generateRandomWeight = () => generateRandomDecimalNumberInRange(0.1, 20);
const generateRandomHeight = () => generateRandomDecimalNumberInRange(0.1, 2.5);
const generateRandomWidth = () => generateRandomDecimalNumberInRange(0.1, 2.5);
const generateRandomCount = () => generateRandomNumberInRange(1, 5);

export async function generateFakePackage() {
  const category = generateRandomPackageCategory();

  const packageStatus = generateRandomPackageStatus();

  const registeredAt = generateRandomPastDate();
  const pickedUpAt =
    packageStatus < PackageStatus.Delivering
      ? undefined
      : generateRandomDateInRange(registeredAt.getTime(), Date.now());
  const deliveredAt =
    packageStatus < PackageStatus.Delivered
      ? undefined
      : generateRandomDateInRange(pickedUpAt!.getTime(), Date.now());
  const deliveryConfirmedAt =
    packageStatus < PackageStatus.Confirmed
      ? undefined
      : generateRandomDateInRange(deliveredAt!.getTime(), Date.now());

  const packageItem: Package = {
    id: generateRandomNumericString(10),

    category,
    item: generateRandomPackageItem(category),

    count: generateRandomCount(),
    weight: generateRandomWeight(),
    height: generateRandomHeight(),
    width: generateRandomWidth(),

    additional_notes: generateRandomPackageAdditionalNotes(),

    status: packageStatus,

    registered_at: registeredAt,
    picked_up_at: pickedUpAt,
    delivered_at: deliveredAt,
    delivery_confirmed_at: deliveryConfirmedAt,
  };

  return packageItem;
}
