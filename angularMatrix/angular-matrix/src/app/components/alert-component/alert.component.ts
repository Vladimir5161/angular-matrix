import { Component, OnInit } from '@angular/core';
import {AlertService} from "../../services/alert.service";
import {filter} from "rxjs/operators";
import {Alert} from "../../types/alert.types";
import {expireAlertTime} from "../../../constants";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  alertMessage: string = '';
  error: boolean = false
  closing: boolean =  false;
  constructor(public AlertService: AlertService) {
  }

  ngOnInit(): void {
    this.AlertService.getAlert()
      .pipe(filter((alert: Alert) => typeof alert.message === 'string'))
      .subscribe((alert: Alert) => {
        this.alertMessage = alert.message;
        this.error = alert.error
    })
    setTimeout(() => {
      if(!this.closing) {
        this.closeModal()
      }
    }, expireAlertTime)
  }
  closeModal() {
    this.closing = true;
    setTimeout(() => {
      this.alertMessage = ''
      this.error = false
      this.AlertService.closeModal()
      this.closing = false
    }, 900)
  }

}
