import { Component, Input, OnInit } from '@angular/core';
import { Auth0ClientService } from '../../domains/auth/auth0-client.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input()
  displayUserName: string;

  constructor(public auth: Auth0ClientService) {
  }

  ngOnInit() {
  }

}
