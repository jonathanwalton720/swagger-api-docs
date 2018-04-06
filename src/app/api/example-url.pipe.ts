import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'exampleUrl'
})
export class ExampleUrlPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let query;
    if (value.parameters) {
      query = value.parameters.filter(m => {
        return m.in === 'query'
      }).map(m => {
        return m.name + '=' + '[' + m.name + ']';
      });
    }
    let exampleUrl = null;
    if (query && query.length > 0) {
      exampleUrl = '?' + query.join('&');
    }
    return exampleUrl;
  }
}
