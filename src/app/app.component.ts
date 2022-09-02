import { Component, OnInit } from '@angular/core';
import { LoginStatusService } from './auth/services/login-status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'trans-invest-pars-test';

  constructor(private loginStatus: LoginStatusService) {}

  ngOnInit(): void {
    this.loginStatus.verifyCurrentUser();
  }
}
