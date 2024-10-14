import { Component, VERSION } from '@angular/core';
import { version } from '../../../../package.json';
import { loadCustomScript } from "@paypal/paypal-js";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
    readonly appVersion = version;
    readonly ngVersion = VERSION.full;
    protected readonly alert = alert;

    async ngOnInit() {
        try {
            await loadCustomScript({ url: 'https://www.paypalobjects.com/donate/sdk/donate-sdk.js' });
        } catch (error) {
            console.error("failed to load the PayPal JS SDK script", error);
        }

        // @ts-ignore
        window.PayPal?.Donation.Button({
            env: 'production',
            hosted_button_id: 'EBY6KWECQY2D8',
            image: {
                src: 'assets/donate.png',
                alt: 'Donate',
                title: 'Support my work',
            }
        }).render('#donate-button');
    }
}
