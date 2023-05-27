import { Pipe, PipeTransform } from '@angular/core';
import {comments} from "../data-objects/comments";

@Pipe({ name: 'commentsIcon' })
export class CommentsIconPipe implements PipeTransform {
  transform(value: string) {
    return comments.find(item => item.translation == value)?.icon;
  }
}
