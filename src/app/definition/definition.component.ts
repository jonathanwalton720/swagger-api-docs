import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SwaggerService } from '../swagger.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-definition',
  templateUrl: './definition.component.html',
  styleUrls: ['./definition.component.css']
})
export class DefinitionComponent implements OnInit {

  swagger = null;
  definition = null;
  definitionName = '';

  constructor(
    private service: SwaggerService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.activatedRoute.params.subscribe((params: Params) => {
      this.definitionName = params['definitionName'];
      this.service.swagger.then(data => {
        this.swagger = data;
        this.definition = this.decorateMockObject(this.swagger.definitions[this.definitionName]);
      });
    });
  }

  // NOTE: this is slightly different than the one in api component
  decorateMockObject(mockObj) {
    Object.keys(mockObj.properties).filter(m => mockObj.properties[m].$ref).forEach(m => {
      const $ref = mockObj.properties[m].$ref;
      mockObj.properties[m] = this.getExampleObject(mockObj.properties[m].$ref);
      mockObj.properties[m].$ref = $ref;
    });
    Object.keys(mockObj.properties).filter(m => mockObj.properties[m].items && mockObj.properties[m].items.$ref).forEach(m => {
      const $ref = mockObj.properties[m].items.$ref;
      mockObj.properties[m].items.object = this.getExampleObject(mockObj.properties[m].items.$ref);
      mockObj.properties[m].items.$ref = $ref;
    });
    return mockObj;
  }

  // NOTE: this is the same as the one in api component
  getExampleObject($ref: string) {
    const a = $ref.split('/');
    const objName = a[a.length - 1];
    return this.swagger.definitions[objName];
  }
}
