#Previously
In the previous step we installed material2 and configured our project so angular-cli and SystemJS know abuot them.
We alse check if material2 components were available in our project by importing `MdButton` and using it in our main component.

#Layout
FIrst of all we are going to create the main layout of our Web App. It is not going to be nothing fancy, just a toolbar.

##Import MdToolbar
In our `app.component.ts` file we are going to import the material2 `MdToolbar` directive so we are able to use it in our template.

```javascript
import { Component } from '@angular/core';
import { MdToolbar } from '@angular2-material/toolbar';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [
    MdToolbar
  ]
})
export class AppComponent {
  title: string = 'TODO List';
}

```

*We will change the `title` property of our `AppComponent` to fit the target of our Web App.*

And now we can finally use the `<md-toolbar>` element in `app.component.html`.

```html
<md-toolbar color="primary">{{title}}</md-toolbar>
```

#Next step
    cd ..
    git checkout step5
