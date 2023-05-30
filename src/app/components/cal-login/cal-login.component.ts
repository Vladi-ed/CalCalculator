import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {CalService} from "../../services/cal.service";
import {ICalRecord} from "../../interfaces/ICalRecord";

@Component({
  selector: 'app-cal-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './cal-login.component.html',
  styleUrls: ['./cal-login.component.scss']
})
export class CalLoginComponent implements AfterViewInit{
  isLoading = false;
  private calToken?: string;
  showPinField = false;

  @ViewChild('loginDialog')
  private loginDialog?: ElementRef;

  @Output()
  sendDataEvent = new EventEmitter<ICalRecord[]>();

  constructor(private calService: CalService) {  }

  ngAfterViewInit(): void {
    this.loginDialog!.nativeElement.showModal();
  }



  loginForm = new FormGroup({
    tz: new FormControl<string|null>(null),
    last4Digits: new FormControl<string|null>(null)
  });

  pin = new FormControl<string|null>(null);


  async getCalToken() {
    this.loginForm.markAsTouched();
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.calToken = await this.calService.getCalToken(this.loginForm.value.tz!, this.loginForm.value.last4Digits!);
    this.isLoading = false;
    if (this.calToken) this.showPinField = true;
  }

  async download(loginDialog: HTMLDialogElement) {
    if (this.pin.invalid) return;

    console.time('File processing');
    this.isLoading = true;

    const [transactions, processJsonData] = await Promise.all([
      this.calService.downloadMonth(this.loginForm.value.tz!, this.pin.value!),
      import('../../functions/process-json-data').then(m => m.processJsonData)
    ]);

    // console.log(processJsonData(transactions));
    this.sendDataEvent.emit(processJsonData(transactions));
    this.isLoading = true;
    loginDialog.close();
  }





}
