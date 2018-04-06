import { Component, OnInit } from '@angular/core';
import { SwaggerService } from './swagger.service';
import { Router } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SwaggerService]
})
export class AppComponent implements OnInit {

  swagger = null;
  tags = [];

  constructor(private service: SwaggerService, private router: Router) {}

  ngOnInit() {
    this.service.swagger.then(data => {
      this.swagger = data;
      this.tags = this.swagger.tags;
    });
  }
}
