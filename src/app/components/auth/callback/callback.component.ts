import { Component, OnInit } from '@angular/core';
import { Auth0ClientService } from '../../../domains/auth/auth0-client.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(private auth: Auth0ClientService) { }

  ngOnInit() {
    this.auth.handleAuthCallback();
  }

}
