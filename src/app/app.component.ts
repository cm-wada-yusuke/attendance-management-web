import { Component, OnInit } from '@angular/core';
import { Auth0ClientService } from './domains/auth/auth0-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'attendance-management-web';

  constructor(private auth: Auth0ClientService) {
  }

  ngOnInit(): void {
    this.auth.localAuthSetup();
  }
}
