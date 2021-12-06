import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {Alert} from "../types/alert.types";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alert = new BehaviorSubject<Alert>({
    message: '',
    error:   false
  });

  setAlert(state: Alert) {
    this.alert.next(state);
  }
  getAlert(): Subject<Alert> {
    return this.alert;
  }
  constructor() { }
  showAlert(text: string, error: boolean) {
    this.setAlert({
      message: text,
      error: error
    })
  }
  closeModal() {
    this.setAlert({
      message: '',
      error: false
    })
  }
}
