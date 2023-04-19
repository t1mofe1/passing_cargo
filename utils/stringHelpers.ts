export function splitStringByLength(str: string, length: number): string[] {
  return str.match(new RegExp(`.{1,${length}}`, 'g')) as string[];
}
