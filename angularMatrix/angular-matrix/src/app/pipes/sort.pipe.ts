import { Pipe, PipeTransform } from '@angular/core';
import {Post} from "../types/posts.types";
import * as moment from "moment";
import {defaultSortBy} from "../../constants";

@Pipe({
  name: 'sortPipe'
})
export class SortPipe implements PipeTransform {
  sort(a: Post,b: Post) {
    if(moment(a[defaultSortBy]) > moment(b[defaultSortBy])) {
      return 1
    } else return 0
  }
  transform(array: Post[] | null): Post[] {
    if (array) {
      return array.sort((a, b) => this.sort(a, b))
    }
    return [];
  }
}
