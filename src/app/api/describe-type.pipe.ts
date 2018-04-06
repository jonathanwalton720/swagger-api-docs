import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'describeType'
})
export class DescribeTypePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) {
      return ''
    }
    if (value.$ref) {
        return 'See ' + this.parse$Ref(value.$ref);
    } else if (value.type === 'object') {
      return value;
    } else if (value.enum) {
      return value.enum.join(', ')
    } else if (value.type === 'array') {
      if (value.items.$ref) {
        return 'See ' + this.parse$Ref(value.items.$ref);
      } else if (value.items.type) {
        return 'Array of ' + value.items.type;
      } else {
        return JSON.stringify(value);
      }
    } else if (value.type === 'string') {
      if (value.format) {
        return value.format;
      }
      return 'string';
    } else if (value.type === 'integer') {
      return 'integer';
    } else if (value.type === 'uuid') {
      return 'uuid';
    } else if (value.type === 'boolean') {
      return 'boolean';
    } else  if (value.schema && value.schema.$ref) {
      return 'See ' + this.parse$Ref(value.schema.$ref);
    } else if (value.schema && value.schema.type === 'array') {
      if (value.schema.items.format === 'uuid') {
        return 'Array of uuid';
      }
      return value;
    } else {
      return value;
    }
  }

  private parse$Ref($ref) {
    return $ref.split('/')[$ref.split('/').length - 1]
  }
}
