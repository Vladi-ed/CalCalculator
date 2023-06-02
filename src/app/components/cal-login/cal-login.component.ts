import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild
} from '@angular/core';
import {NgIf} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {CalService} from "../../services/cal.service";
import {ICalRecord} from "../../interfaces/ICalRecord";

@Component({
  selector: 'app-cal-login',
  standalone: true,
  imports: [NgIf, MatInputModule, FormsModule],
  templateUrl: './cal-login.component.html',
  styleUrls: ['./cal-login.component.scss']
})
export class CalLoginComponent implements AfterViewInit {
  loginForm = {
    tz: '',
    last4Digits: '',
    pin: '',
  };

  isLoading = false;
  showPinField = false;

  @ViewChild('loginDialog')
  private loginDialog?: ElementRef;

  @Output()
  dataEvent = new EventEmitter<ICalRecord[]>();
  errorMessage?: string;

  constructor(private calService: CalService) {}

  ngAfterViewInit(): void {
    this.showModal();
  }

  showModal() {
    this.loginDialog?.nativeElement.showModal();
  }

  async getCalToken(event: Event) {
    event.preventDefault();
    console.log(event.target);

    this.isLoading = true;
    try {
      this.showPinField = !!(await this.calService.getCalToken(this.loginForm.tz, this.loginForm.last4Digits));
    }
    catch (e) {
      this.errorMessage = String(e).startsWith('SyntaxError: ') ? 'API Connection error' : String(e);
    }
    this.isLoading = false;

    setTimeout(() => this.errorMessage = undefined, 3000);
  }

  async download() {
    this.isLoading = true;

    try {
      const data= await this.calService.getData(this.loginForm.tz, this.loginForm.pin);
      this.dataEvent.emit(data);
      this.loginDialog?.nativeElement.close();
    }
    catch (e) {
      this.errorMessage = String(e);
    }

    this.isLoading = false;
  }

}
