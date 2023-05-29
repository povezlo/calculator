import {
  MAX_VALUE_ONE_MILLION,
  MIN_VALUE_ONE_THOUSAND,
} from '../interfaces/constants';

export const transformCurrency = (
  num: number,
  limit: {maxValue: boolean}
): string => {
  let filteredNumber = 0;

  if (limit.maxValue) {
    filteredNumber = Math.max(MIN_VALUE_ONE_THOUSAND, num);
  } else {
    filteredNumber = Math.min(MAX_VALUE_ONE_MILLION, num);
  }

  return filteredNumber.toLocaleString('en-US', {minimumFractionDigits: 0});
};
