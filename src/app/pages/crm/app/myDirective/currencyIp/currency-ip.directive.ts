import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCurrencyIp]'
})
export class CurrencyIpDirective {

  constructor(private _elementRef: ElementRef) { }
  @HostListener('input', ['$event']) onKeyUp(event) {
    let num = this._elementRef.nativeElement.value;
      num += '';
      num = num.replace(/,/g, '');
      let x = num.split('.');
      let x1 = x[0];
      let x2 = x.length > 1 ? '.' + x[1] : '';
      let rgx = /(\d)((\d)(\d{2}?)+)$/;
      while (rgx.test(x1))
          x1 = x1.replace(rgx, '$1' + ',' + '$2');
          return this._elementRef.nativeElement.value = x1 + x2;

  }
}
