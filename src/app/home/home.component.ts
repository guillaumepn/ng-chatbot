import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  authenticated: boolean;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.authenticated.subscribe(authenticated => this.authenticated = authenticated);
  }

}
