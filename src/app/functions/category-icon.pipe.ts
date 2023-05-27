import { Pipe, PipeTransform } from '@angular/core';
import {categories} from "../data-objects/categories";

@Pipe({ name: 'categoryIcon' })
export class CategoryIconPipe implements PipeTransform {
  transform(value: string) {
    return categories.find(item => item.translation == value)?.icon;
  }

}
