import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'beautifyNumber'
})
export class BeautifyNumberPipe implements PipeTransform {

  transform(value: number): string {
    const sign: string = value < 0 ? '-' : '';
    value = Math.abs(value);
    if (value < 1000) {
      return sign + value.toString();
    } else {
      let scaledValue: number = value;
      let scaleAbbreviation: string;
      const scaleAbbreviations: string[] = ['K', 'M', 'B'];
      for (scaleAbbreviation of scaleAbbreviations) {
        scaledValue /= 1000;
        if (scaledValue < 1000) {
          break;
        }
      }
      let roundedValue: string;
      if (scaledValue < 10) {
        roundedValue = (Math.floor(10 * scaledValue) / 10).toString();
      } else {
        roundedValue = Math.floor(scaledValue).toString();
      }
      return sign + roundedValue + scaleAbbreviation;
    }
  }

}
