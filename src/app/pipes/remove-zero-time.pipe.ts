import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from "@angular/common";

@Pipe({ name: 'removeZeroTime', standalone:true })
export class RemoveZeroTimePipe extends DatePipe implements PipeTransform {

  override transform(value: any): any {
    const converted = super.transform(value, 'd MMM H:mm');
    const dateArr = converted?.split(' ') || [];

    if (dateArr[2] == '0:00') return dateArr.slice(0, -1).join(' ');
    else return converted;
  }
}