import { Component } from '@angular/core';
import { APP_SHELL_DIRECTIVES } from '@angular/app-shell';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  template: `
  <h1>{{title}}</h1>
  <h2 *shellRender>APP SHELL RENDERING...</h2>
  <h2 *shellNoRender>APP SHELL RENDERED</h2>
  `,
  styles: [],
  directives: [APP_SHELL_DIRECTIVES]
})
export class AppComponent {
  title = 'app works!';
}
