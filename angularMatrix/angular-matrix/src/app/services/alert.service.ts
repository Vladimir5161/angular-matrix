import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertMessage = new Subject<any>();
  private error = new Subject<any>();

  setAlert(state: string) {
    this.alertMessage.next(state);
  }
  setErrorBoolean(state: boolean) {
    this.alertMessage.next(state);
  }

  getAlertMessage(): Subject<string> {
    return this.alertMessage;
  }
  getErrorBoolean(): Subject<boolean> {
    return this.error;
  }
  constructor() { }
  showAlert(text: string, error?: boolean) {
    this.setAlert(text)
    if(error) {
      this.setErrorBoolean(error)
    }
  }
  closeModal() {
    this.setAlert('')
    this.setErrorBoolean(false)
  }
}
