import {Pipe, PipeTransform} from "@angular/core";
import * as moment from "moment";

@Pipe({
  name: 'moment',
  pure: false,
})
export class MomentPipe implements PipeTransform {
  transform(value: string, format: string = 'lll'): string {
    const m = moment(value)
    return m.format(format)
  }
}
