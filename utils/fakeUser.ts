import { Package, generateFakePackage } from '@/utils/fakePackage';
import {
  generateRandomCreditCardNumber,
  generateRandomNumberInRange,
  generateRandomNumericString,
  generateRandomPhoneNumber,
} from '@/utils/generate';

const generateRandomFirstName = (gender: 'M' | 'W') => {
  const names = {
    M: [
      'John',
      'Paul',
      'George',
      'Ringo',
      'Peter',
      'Paul',
      'Andry',
      'Mike',
      'Alex',
      'Andrew',
      'Jack',
    ],
    W: [
      'Mary',
      'Paula',
      'Jane',
      'Rita',
      'Polly',
      'Paula',
      'Anna',
      'Laura',
      'Kate',
      'Emily',
      'Sarah',
    ],
  };

  return names[gender][Math.floor(Math.random() * names[gender].length)];
};
const generateRandomLastName = () => {
  const names = [
    'Doe',
    'Smith',
    'Johnson',
    'Williams',
    'Brown',
    'Jones',
    'Garcia',
    'Miller',
    'Davis',
    'Rodriguez',
    'Martinez',
    'Hernandez',
    'Lopez',
    'Gonzalez',
    'Wilson',
    'Anderson',
    'Thomas',
    'Taylor',
    'Moore',
    'Jackson',
    'Martin',
  ];

  return names[Math.floor(Math.random() * names.length)];
};
const generateRandomPictureLink = (gender: 'M' | 'W') =>
  `https://randomuser.me/api/portraits/${
    gender === 'M' ? 'men' : 'women'
  }/${generateRandomNumberInRange(1, 99)}.jpg`;
const generateRandomDateOfBirth = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - generateRandomNumberInRange(20, 50));
  date.setMonth(date.getMonth() - generateRandomNumberInRange(0, 11));
  date.setDate(date.getDate() - generateRandomNumberInRange(0, 30));
  return date;
};

const generateRandomCargos = async (length = 2) => {
  const cargos = await Promise.all(
    Array(length).fill(0).map(generateFakePackage),
  );

  return cargos;
};
const generateRandomDeliveries = async (length = 2) => {
  const deliveries = await Promise.all(
    Array(length).fill(0).map(generateFakePackage),
  );

  return deliveries;
};

export type FakeUser = {
  id: string;

  first_name: string;
  last_name: string;

  username: string;

  email: string;

  avatar: string;

  phone_number: string;

  date_of_birth: Date;

  credit_card_number: string;

  cargos?: Package[];
  deliveries?: Package[];
};

export async function fetchFakeUser() {
  const gender = Math.random() > 0.5 ? 'M' : 'W';

  const firstName = generateRandomFirstName(gender);
  const lastName = generateRandomLastName();

  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@random-mail.com`;

  const username = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;

  const profilePicture = generateRandomPictureLink(gender);

  const dateOfBirth = generateRandomDateOfBirth();

  const cargos = await generateRandomCargos();
  const deliveries = await generateRandomDeliveries();

  const formattedData: FakeUser = {
    id: generateRandomNumericString(10),
    first_name: firstName,
    last_name: lastName,
    username,
    email,
    avatar: profilePicture,
    phone_number: generateRandomPhoneNumber(),
    date_of_birth: dateOfBirth,
    credit_card_number: generateRandomCreditCardNumber(),

    cargos,
    deliveries,
  };

  return formattedData;
}
