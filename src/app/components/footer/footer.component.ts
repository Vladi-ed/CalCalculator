import { Component, VERSION } from '@angular/core';
import packageJson from 'package.json';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [
      'dialog { border: none; border-radius: 4px; padding: 24px; font-weight: 400; box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);}',
      'dialog::backdrop { background: rgba(0,0,0,.32) }',
      'footer { text-align: center;  border-top: 1px solid lightgray; padding: 10px; font-size: small}',
      '.footer-link { text-decoration: underline; cursor: pointer; user-select: none }',
      'h2 {text-align: center}'
  ]
})
export class FooterComponent {
    readonly appVersion = packageJson.version;
    readonly ngVersion = VERSION.full;
}
