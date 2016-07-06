import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';
import { MdToolbar } from '@angular2-material/toolbar';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { View, views } from './app.routes';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
    MD_SIDENAV_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    MdIcon,
    MdToolbar,
    MD_BUTTON_DIRECTIVES
  ],
  providers: [
    MdIconRegistry
  ]
})
export class AppComponent {
  title:string = 'TODO List';
  views:View[] = views;
}