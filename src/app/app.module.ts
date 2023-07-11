import {isDevMode, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatRippleModule} from "@angular/material/core";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {ServiceWorkerModule} from '@angular/service-worker';
import {FooterComponent} from './components/footer/footer.component';
import {MatIconModule} from "@angular/material/icon";
import { CategoryIconPipe } from './pipes/category-icon.pipe';
import { CommentsIconPipe } from './pipes/comments-icon.pipe';
import {TableComponent} from "./components/table/table.component";

@NgModule({
    declarations: [AppComponent, FooterComponent],
    imports: [
        BrowserAnimationsModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: !isDevMode(),
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        }),
        NgxChartsModule,
        MatIconModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        MatRippleModule,
        MatSlideToggleModule,
        TableComponent,
        CategoryIconPipe, CommentsIconPipe
    ],

    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
