import { NUMBER_HAS_PREFIX_$_PATTERN, NUMERIC_PATTERN } from '../interfaces/constants';

export const transformUSDtoNumber = (currency: string): number => {
  let number = 0;

  if (typeof currency === 'string'  && NUMBER_HAS_PREFIX_$_PATTERN.test(currency)) {
    number = parseFloat(String(currency).replace(NUMERIC_PATTERN, ''));
  }

  return number;
}
