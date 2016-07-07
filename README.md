#Previously
In the previous step we could see our application running.

#Installing vendor dependencies
We are going to use [material2](https://material.angular.io/) for our project.
So we are going to follow [this steps](https://github.com/angular/angular-cli/wiki/3rd-party-libs#adding-material2-to-your-project) in order to achieve so.

##Navigate to the project folder
    cd webapp

##Install material2 core
    npm i @angular2-material/core --save

##Install material2 packages
    npm i @angular2-material/<%= package %> --save

Current available packages are:

- button
- card
- checkbox
- icon
- input
- list
- progress-bar
- progress-circle
- radio
- sidenav
- toolbar

In our application we are going to use all of them but the progress-bar 
so you can *copy&paste* in your terminal the following snippet.

    npm i @angular2-material/button @angular2-material/card @angular2-material/checkbox @angular2-material/icon @angular2-material/input @angular2-material/list @angular2-material/progress-circle @angular2-material/radio @angular2-material/sidenav @angular2-material/toolbar --save

You might find some peer dependency errors and warnings. We are going to ignore them for now.

##Include material2 into angular-cli-build.js
We are going to include our material2 dependencies in  `angular-cli-build.js` to let the 
browser compiler know about them.

```javascript
var Angular2App = require('angular-cli/lib/broccoli/angular2-app');

module.exports = function(defaults) {
  return new Angular2App(defaults, {
    vendorNpmFiles: [
      'systemjs/dist/system-polyfills.js',
      'systemjs/dist/system.src.js',
      'zone.js/dist/**/*.+(js|js.map)',
      'es6-shim/es6-shim.js',
      'reflect-metadata/**/*.+(ts|js|js.map)',
      'rxjs/**/*.+(js|js.map)',
      '@angular/**/*.+(js|js.map)',
      // material2
      '@angular2-material/**/*'
    ]
  });
};
```

##Set up the SystemJS configuration
Now we are going to modify our `src/system-config.ts` to add the new packages.

```javascript
/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  '@angular2-material': 'vendor/@angular2-material'
};

/** User packages configuration. */
const packages: any = {};

// put the names of any of your Material components here
const materialPkgs:string[] = [
  'core',
  'button',
  'card',
  'checkbox',
  'icon',
  'input',
  'list',
  'progress-circle',
  'radio',
  'sidenav',
  'toolbar'
];

materialPkgs.forEach((pkg) => {
  packages[`@angular2-material/${pkg}`] = {main: `${pkg}.js`};
});
```

##Example of use
Lets add a sample `md-button` to check if everything is OK.

We are going to import the button in our main `src/app/app.component.ts`.
```javascript
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
```
And add an `md-button` to `src/app/app.component.html`.

```html
<button md-raised-button>{{title}}</button>
```

##Serve de application
    ng serve

*Voilá!*

#Next step
Navigate to the root of this project and then go to the next step

    cd ..
    git checkout step4
