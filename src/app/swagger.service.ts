import { Injectable, OnInit } from '@angular/core';
import * as SwaggerParser from 'swagger-parser';

@Injectable()
export class SwaggerService implements OnInit {

  private _swagger: any = null;

  constructor() { }

  ngOnInit() { }

  get swagger(): Promise<object> {

    if (this._swagger === null) {
      SwaggerParser.validate('/assets/swagger.yaml', function(err, api) {
        if (err) {
          console.error(err);
        } else {
          console.log('API name: %s, Version: %s', api.info.title, api.info.version);
        }
      });
      this._swagger = SwaggerParser.parse('/assets/swagger.yaml').then(data => {
        if (!data.tags) {

          data.tags = [];
          Object.keys(data.paths).forEach(key => {
            const methods = Object.keys(data.paths[key]);

            if (methods.length > 0) {
              for (const methodKey of methods) {
                // debugger;
                const method = data.paths[key][methodKey];
                if (method.tags) {
                  method.tags.forEach(tagName => {
                    if (this.isUniqueTag(data.tags, tagName)) {
                      data.tags.push({
                        name : tagName,
                        description : null
                      });
                    }
                  });
                } else {
                  const tagName = method.summary ? method.summary : key
                  if (this.isUniqueTag(data.tags, tagName)) {
                    data.tags.push({
                      name: tagName,
                      description: method.description
                    });
                  }
                }
              }
            }
          });
        }
        data.tags.sort((a, b) => {
          a = a.name.toUpperCase();
          b = b.name.toUpperCase();
          return (a < b) ? -1 : (a > b) ? 1 : 0;
        });
        return data;

      });
    }

    return this._swagger;
  }

  isUniqueTag = function (tags, tagName: string) {
    for (let index = 0; index < tags.length; index++) {
      const element = tags[index];
      if (tagName === element.name) {
        return false;
      }
    }
    return true;
  }
}
