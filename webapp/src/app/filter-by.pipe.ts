import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {

  transform(objs: Array<any>, prop: string, value: any): any {
    return objs.filter(obj => value === null || obj[prop] === value);
  }

}
