import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customJson'
})
export class CustomJsonPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let jsonString = JSON.stringify(value, null, 2);
    const jsonArray = jsonString.split('[');
    for (let index = 0; index < jsonArray.length; index++) {
      if (index !== 0) {
        const arrayArray = jsonArray[index].split(']');
        arrayArray[0] = arrayArray[0].replace(/\s\s+/g, ' ');
        jsonArray[index] = arrayArray.join(']');
      }
    }
    jsonString = jsonArray.join('[');
    return jsonString;
  }
}
