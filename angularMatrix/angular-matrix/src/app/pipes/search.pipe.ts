import { Pipe, PipeTransform } from '@angular/core';
import {Post} from "../types/posts.types";

@Pipe({
  name: 'searchPipe'
})
export class SearchPipe implements PipeTransform {
  transform(array: Post[], searchStr: string): Post[] {
    if(!searchStr.trim()) {
      return array
    }
    return array.filter(i => {
      return i.content.includes(searchStr) || i.title.includes(searchStr)
    })
  }

}
