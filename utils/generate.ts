import { splitStringByLength } from '@/utils/stringHelpers';
import { customAlphabet } from 'nanoid/non-secure';

export function generateRandomValueFromElements<T>(...elements: T[]) {
  return elements[Math.floor(Math.random() * elements.length)];
}

export function generateRandomNumericString(length: number = 10) {
  return customAlphabet(`123456789`)(length);
}

export function generateRandomNumberInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
export function generateRandomDecimalNumberInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function generateRandomPhoneNumber() {
  const phoneNumber =
    generateRandomValueFromElements(5, 6) + generateRandomNumericString(7);

  return `+372 ${phoneNumber}`;
}

export function generateRandomCreditCardNumber() {
  return splitStringByLength(generateRandomNumericString(16), 4).join('-');
}
