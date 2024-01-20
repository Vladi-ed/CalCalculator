import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'priceFormat', standalone:true })
export class PriceFormatPipe implements PipeTransform {
  transform(value: string) {

    const valueArr = value.split('.');

    const shekel = valueArr[0];
    const agora = valueArr[1]?.length == 1 ? valueArr[1] + '0' : valueArr[1] || '00';

    return shekel + '.<small class="text-gray">' + agora + '</small>'
  }
}

