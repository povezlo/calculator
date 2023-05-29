import {
  Directive,
  ElementRef,
  Input,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective {
  @Input('appTooltip') tooltipText = '';

  private tooltipElement: HTMLElement | null = null;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.showTooltip();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.hideTooltip();
  }

  private showTooltip() {
    // Создание элемента подсказки и добавление его в DOM
    this.tooltipElement = this.renderer.createElement('div');
    const text = this.renderer.createText(this.tooltipText);
    this.renderer.appendChild(this.tooltipElement, text);
    this.renderer.addClass(this.tooltipElement, 'tooltip');
    this.renderer.appendChild(
      this.elementRef.nativeElement,
      this.tooltipElement
    );
  }

  private hideTooltip() {
    if (this.tooltipElement) {
      this.renderer.removeChild(
        this.elementRef.nativeElement,
        this.tooltipElement
      );
      this.tooltipElement = null;
    }
  }
}
