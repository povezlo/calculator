export type Value = number | string | boolean;

export type ButtonType = 'button' | 'submit';

export type PropagateFn<T> = (fn: T) => void;
