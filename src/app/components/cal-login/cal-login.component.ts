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
  sendDataEvent = new EventEmitter<ICalRecord[]>();
  errorMessage?: string;

  constructor(private calService: CalService) {  }

  ngAfterViewInit(): void {
    this.loginDialog!.nativeElement.showModal();
  }

  async getCalToken() {
    this.isLoading = true;
    try {
      this.showPinField = !!(await this.calService.getCalToken(this.loginForm.tz, this.loginForm.last4Digits));
    }
    catch (e) {
      this.errorMessage = String(e).includes('<!DOCTYPE') ? 'API Connection error' : String(e);
    }
    this.isLoading = false;

    setTimeout(() => this.errorMessage = undefined, 3000);
  }

  async download(loginDialog: HTMLDialogElement) {
    console.time('File processing');
    this.isLoading = true;

    // TODO: add try/catch, move to the cal service?
    const [transactions, processJsonData] = await Promise.all([
      this.calService.downloadMonth(this.loginForm.tz, this.loginForm.pin),
      import('../../functions/process-json-data').then(m => m.processJsonData)
    ]);

    if (transactions) this.sendDataEvent.emit(processJsonData(transactions));
    else this.errorMessage = 'Cannot parse the transaction report';

    this.isLoading = false;
    loginDialog.close();
  }

}
