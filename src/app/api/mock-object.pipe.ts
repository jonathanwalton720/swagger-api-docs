import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mockObject'
})
export class MockObjectPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return this.getMockObject(value);
  }

  private getMockObject(oldObject) {

    const mockObject = {};

    Object.keys(oldObject).forEach(propName => {
      const property = oldObject[propName];
      const mockValue = property.example !== undefined ? property.example : this.getMockValue(property);
      mockObject[propName] = mockValue;
    });
    return mockObject;
  }

  private getMockValue(property) {

      if (property.type === 'object' && property.properties) {;
        return this.getMockObject(property.properties);
      } else if (property.$ref) {
        return property.$ref.split('/')[2];
      } else if (property.enum) {
        return property.enum[0];
      } else if (property.type === 'array') {
        if (property.items.object) {
          return [this.getMockObject(property.items.object.properties)];
        } else if (property.items.type === 'integer') {
          return [0, 1, 2, 3];
        } else if (property.items.type === 'string') {
          return ['apple', 'banana', 'carrot', 'dog'];
        }
        // return JSON.stringify(value); // leaving this for now
      } else if (property.type === 'string') {
        if (property.format === 'uuid') {
          return 'b2e7ac1f-3efe-4a64-99db-14ebae93ae2b';
        } else if (property.format === 'date-time') {
          return '2012-03-19T07:22Z';
        } else {
          // return JSON.stringify(property); // leaving this for testing
          return 'Lorem ipsum dolor';
        }
      } else if (property.type === 'integer') {
        return 7;
      } else if (property.type === 'boolean') {
        return true;
      }  else {
        return property;
      }
  }

}
