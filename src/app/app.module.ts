import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatRippleModule} from "@angular/material/core";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserAnimationsModule, MatInputModule, MatTableModule, MatSortModule, MatRippleModule, NgxChartsModule, MatSlideToggleModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
