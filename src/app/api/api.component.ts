import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { SwaggerService } from '../swagger.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {

  swagger = null;
  tag = {
    name: ''
  };
  paths = [];
  baseUrl = null;

  constructor(
    private service: SwaggerService,
    private router: Router,
    private route: ActivatedRoute)  { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.baseUrl = environment.baseUrl;
    this.tag = {
      name: ''
    };

    this.router.events.subscribe(next => {
      if (next instanceof NavigationEnd && next.url.split('/')[1] === 'v1') {
        this.resetData();
      }
    });

    this.service.swagger.then(data => {
      this.swagger = data;
      this.resetData();
    });
  }

  resetData() {
    const tagName = this.getTagNameFromUrl(decodeURI(this.router.url));
    this.tag = this.swagger.tags ?  this.swagger.tags.find(tag => tag.name === tagName) : null;
    this.paths = this.getPathsByTagName(this.swagger, tagName);
  }

  getTagNameFromUrl(value: string): any {
    const titles = [];
    value.split('/').forEach(element => {
      if (element && element !== 'v1') {
        titles.push(element);
      }
    });
    return titles[0];
  }

  getPathsByTagName(data, tagName) {
    const paths = [];
    Object.keys(data.paths).forEach(pathKey => {

      const path = data.paths[pathKey];
      Object.keys(path).forEach(methodKey => {
        const method = path[methodKey];
        if (method.tags && method.tags.includes(tagName)) {
          paths.push({
            url: pathKey,
            method: methodKey,
            value: data.paths[pathKey][methodKey]
          });
        }
      })
    });
    return paths;
  }

  getRequestParameters(parameters) {
    // NOTE: we assume that there is only one parent object for the body
    const parameter = parameters.filter(m => m.in === 'body')[0];
    if (parameter && parameter.schema && parameter.schema.$ref) {
      const mockObj = this.getExampleObject(parameter.schema.$ref);
      return this.getMockObjectProperties(mockObj);
    }
    return null;
  }

  getResponseParameters(responses) {
    // NOTE: we only care about 200 responses
    const response = responses[200];
    if (!response) {
      return null;
    }
    if (response.schema && response.schema.$ref) {
      const mockObj = this.getExampleObject(response.schema.$ref);
      return this.getMockObjectProperties(mockObj);
    }
    if (response.schema && response.schema.type === 'array') {
      const mockObj = this.getExampleObject(response.schema.items.$ref);
      return this.getMockObjectProperties(mockObj);
    }
    // NOTE: all responses should be a strongly typed object or no content
    return null;
  }

  getMockObjectProperties(mockObj) {
    if (!mockObj || !mockObj.properties) {
      return null;
    }
    this.decorateMockObject(mockObj);
    return mockObj.properties;
  }

  // NOTE: this is slightly different than the one in definitions component
  decorateMockObject(mockObj) {
    Object.keys(mockObj.properties).filter(m => mockObj.properties[m].$ref).forEach(m => {
      mockObj.properties[m] = this.getExampleObject(mockObj.properties[m].$ref);
      mockObj.$ref = mockObj.properties[m].$ref;
    });
  }

   // NOTE: this is the same as the one in definitions
  getExampleObject($ref: string) {
    const a = $ref.split('/');
    const objName = a[a.length - 1];
    return this.swagger.definitions[objName];
  }

  getReferenceTitle($ref: string) {
    const a = $ref.split('/');
    return a[a.length - 1];
  }
}
