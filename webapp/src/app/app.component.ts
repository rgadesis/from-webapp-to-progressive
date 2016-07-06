import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { MdToolbar } from '@angular2-material/toolbar';
import { MdButton } from '@angular2-material/button';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
    MdToolbar,
    MdButton
  ]
})
export class AppComponent {
  title = 'TODO List';
  constructor(
    private router: Router
  ) {}
  goToList() {
    this.router.navigate(['/list']);
  }
}
