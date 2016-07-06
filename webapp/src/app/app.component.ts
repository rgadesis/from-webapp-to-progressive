import { Component } from '@angular/core';
import { MdButton } from '@angular2-material/button';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [MdButton]
})
export class AppComponent {
  title = 'app works!';
}
