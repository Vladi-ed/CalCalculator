import { Pipe, PipeTransform } from '@angular/core';
import {categories} from "../data-objects/categories";

@Pipe({ name: 'categoryIcon', standalone:true })
export class CategoryIconPipe implements PipeTransform {
  transform(value: string | undefined) {
    if (!value) return;
    return categories.find(item => item.translation == value)?.icon;
  }
}
