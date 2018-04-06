import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { HighlightJsModule, HighlightJsService } from 'angular2-highlight-js';

import { AppComponent } from './app.component';
import { KeysPipe } from './keys.pipe';
import { UrlTitlePipe } from './url-title.pipe';

import { ApiComponent } from './api/api.component';
import { MockObjectPipe } from './api/mock-object.pipe';
import { ExampleUrlPipe } from './api/example-url.pipe';
import { CustomJsonPipe } from './api/custom-json.pipe';
import { DescribeTypePipe } from './api/describe-type.pipe';

import { HomeComponent } from './home/home.component';
import { DefinitionComponent } from './definition/definition.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'v1/:tag', component: ApiComponent },
  { path: 'definitions/:definitionName', component: DefinitionComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    KeysPipe,
    HomeComponent,
    ApiComponent,
    MockObjectPipe,
    CustomJsonPipe,
    DescribeTypePipe,
    UrlTitlePipe,
    ExampleUrlPipe,
    DefinitionComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes),
    HighlightJsModule
  ],
  providers: [HighlightJsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
