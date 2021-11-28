import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  email: string = '';
  password: string = '';
  constructor() { }

  ngOnInit(): void {
  }
  getFormValues(event: any) {
    this.email =  event.email
    this.password = event.password
  }
}
