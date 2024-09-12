import { Component, VERSION } from '@angular/core';
import { version } from 'package.json';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.css',
    standalone: true
})
export class FooterComponent {
    readonly appVersion = version;
    readonly ngVersion = VERSION.full;
    protected readonly alert = alert;

    ngOnInit() {
        // @ts-ignore TODO: fix adding more that one button
        window.PayPal?.Donation.Button({
            env:'production',
            hosted_button_id:'EBY6KWECQY2D8',
            image: {
                src:'https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif',
                alt:'Donate with PayPal button',
                title:'Support my work',
            }
        }).render('#donate-button');
    }
}




