import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDigitsLimit]'
})
export class DigitsLimitDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: any) {
    const initialValue = this.el.nativeElement.value;
    const cleanValue = initialValue.replace(/[^0-9,.]/g, '');
    const lastChar = cleanValue.charAt(cleanValue.length - 1);

    if (lastChar === ',' && cleanValue.indexOf(',') !== cleanValue.lastIndexOf(',')) {
      this.el.nativeElement.value = `$${cleanValue.slice(0, -1)}`;
    } else {
      this.el.nativeElement.value = `$${cleanValue}`;
    }
    if (initialValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
        const minValue = 1000;
    const maxValue = 1000000;
    let number = 0;

    if (typeof cleanValue === 'string'  && /^[$,\d]+$/.test(cleanValue)) {
      number = parseFloat(String(cleanValue).replace(/[^0-9.]/g, ''));
    }


    const formattedValue = Math.min(Math.max(minValue, number), maxValue).toLocaleString('en-US', { minimumFractionDigits: 0 });
this.el.nativeElement.value =  `$${formattedValue}`;

  }
}
