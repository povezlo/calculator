export interface ICalculateDate {
  amount: string;
  checkbox: boolean;
  currency: ICurrency[];
  period: string;
}

export interface ICurrency {
  name: string;
  apr: string;
}
