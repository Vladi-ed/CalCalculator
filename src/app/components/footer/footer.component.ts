import { Component, VERSION } from '@angular/core';
import packageJson from 'package.json';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [
      'footer { text-align: center;  border-top: 1px solid lightgray; padding: 10px; font-size: small}',
      '.footer-link { text-decoration: underline; cursor: pointer; user-select: none }',
  ]
})
export class FooterComponent {
    readonly appVersion = packageJson.version;
    readonly ngVersion = VERSION.full;
}
