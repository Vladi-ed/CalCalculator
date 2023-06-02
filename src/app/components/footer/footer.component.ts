import { Component, VERSION } from '@angular/core';
import packageJson from 'package.json';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
    readonly appVersion = packageJson.version;
    readonly ngVersion = VERSION.full;
}
