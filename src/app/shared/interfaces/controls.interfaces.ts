export type Value = number | string | boolean;

export type ButtonType = 'button' | 'submit';

export interface Icon {
    src: string;
    cssClass: string;
}

export interface ControlItem {
    value: Value;
    label: string;
    icon?: Icon;
}
