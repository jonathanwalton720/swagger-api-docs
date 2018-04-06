import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwaggerService } from '../swagger.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  swagger = null;
  apiEndpoint = environment.baseUrl;
  httpRegExp = new RegExp(/http(s)?:\/\//);
  private fragment: string;

  constructor(private service: SwaggerService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.fragment.subscribe(fragment => {
      this.fragment = fragment;
      const element = document.getElementById('#' + fragment);
      if (element) {
        element.scrollIntoView();
      }
    });
  }

  ngAfterViewInit() {
    try {
      document.querySelector('#' + this.fragment).scrollIntoView();
    } catch (e) { }
  }
}
