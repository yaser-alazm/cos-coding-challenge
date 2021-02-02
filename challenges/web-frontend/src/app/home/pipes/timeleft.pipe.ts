import { Pipe, PipeTransform } from '@angular/core';
import differenceInSeconds from 'date-fns/differenceInSeconds';
import addSeconds from 'date-fns/addSeconds';

@Pipe({
  name: 'timeleft'
})
export class TimeleftPipe implements PipeTransform {

  transform(value: string, args?: any): Date {
    const leftInSeconds = differenceInSeconds(new Date(value), new Date());

    return addSeconds(new Date(0), leftInSeconds);
  }

}
