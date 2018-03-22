import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  authenticated: boolean;

  constructor(private data: DataService, public router: Router) {}

  ngOnInit() {
    this.data.authenticated.subscribe(authenticated => this.authenticated = authenticated);
  }

}
