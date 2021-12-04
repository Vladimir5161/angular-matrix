import { Component, OnInit } from '@angular/core';
import {AlertService} from "../../services/alert.service";
import {filter} from "rxjs/operators";

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
    this.AlertService.getAlertMessage()
      .pipe(filter((message) => typeof message === 'string'))
      .subscribe((message: string) => {
        console.log(message)
        this.alertMessage = message
    })
    this.AlertService.getErrorBoolean().subscribe(error => {
      this.error = error
    })
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
