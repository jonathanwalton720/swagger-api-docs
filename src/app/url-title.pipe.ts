import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlTitle'
})
export class UrlTitlePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const titles = [];
    value.split('/').forEach(element => {
      if (element && element !== 'v1') {
        titles.push(element);
      }
    });
    return titles[0];
  }

}
