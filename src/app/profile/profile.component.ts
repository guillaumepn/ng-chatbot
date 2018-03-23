import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireDatabase} from 'angularfire2/database';


@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  ref = firebase.app().database().ref();
  usersRef: any;
  user: any;
  animals: any;

  constructor(db: AngularFireDatabase) {
    this.usersRef = this.ref.child('users');
    this.user = firebase.auth().currentUser;
    this.usersRef.on('child_added', function (snap) {
      this.animals = snap.val(); // Keep the local user object synced with the Firebase userRef
    });
    console.log(this.animals);
  }

  ngOnInit() {
  }

}
