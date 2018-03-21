import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: Observable<firebase.User>;
  authenticated = false;
  email: string;
  password: string;
  error: string[];

  constructor(public af: AngularFireAuth) {
    this.af.authState.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = af.authState;
          this.authenticated = true;
        }
      }
    );
  }

  ngOnInit() {
  }

  register() {
    this.error = [];
    if (this.email.length > 0 && this.password.length > 0) {
      this.af.auth.createUserWithEmailAndPassword(this.email, this.password).catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.code);
        if (error.code === 'auth/user-not-found') {
          // register();
        }
      });
    } else {
      this.error.push('Entrez un email et un mot de passe');
    }
  }

}
