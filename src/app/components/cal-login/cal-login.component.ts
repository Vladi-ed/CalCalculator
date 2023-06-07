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
import {validateTz} from "../../functions/validate-tz";
import {MatIconModule} from "@angular/material/icon";
import {MatRippleModule} from "@angular/material/core";

@Component({
  selector: 'app-cal-login',
  standalone: true,
  imports: [NgIf, MatInputModule, FormsModule, MatIconModule, MatRippleModule],
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
  #errorMessage?: string;

  @ViewChild('loginDialog')
  private loginDialog?: ElementRef;

  @Output()
  dataEvent = new EventEmitter<ICalRecord[]>();

  constructor(private calService: CalService) {}

  ngAfterViewInit(): void {
    this.showModal();
  }

  showModal() {
    this.loginDialog?.nativeElement.showModal();
  }

  async getCalToken(event: Event) {
    event.preventDefault();

    if (!validateTz(this.loginForm.tz)) {
      this.error = 'Wrong ID. Please try again.'
      return;
    }

    try {
      this.isLoading = true;
      this.showPinField = !!(await this.calService.getCalToken(this.loginForm.tz, this.loginForm.last4Digits));
    }
    catch (e) {
      this.error = e;
    }
    this.isLoading = false;
  }

  async download() {
    if (this.loginForm.pin.length !== 6) return;

    this.isLoading = true;

    try {
      const data= await this.calService.getData(this.loginForm.tz, this.loginForm.pin);
      this.dataEvent.emit(data);
      this.loginDialog?.nativeElement.close();
    }
    catch (e) {
      this.error = e;
    }

    this.isLoading = false;
  }

  set error(message: any) {
    this.#errorMessage = String(message).startsWith('SyntaxError: ') ? 'API Connection error' : String(message);
    setTimeout(() => this.#errorMessage = undefined, 3000);
  }
  get error() {
    return this.#errorMessage;
  }

}
