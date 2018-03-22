import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  users: any[];
  homescreen: any;
  headerDisplay = 'block';

  constructor() {
    this.homescreen = document.querySelector('.homescreen');
    console.log(this.homescreen);
    if (this.homescreen) {
      this.headerDisplay = 'none';
    }
  }
}
