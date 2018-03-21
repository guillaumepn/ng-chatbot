import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: Observable<firebase.User>;
  authenticated: boolean;
  email: string;
  password: string;
  errors: string[];

  constructor(public af: AngularFireAuth, private router: Router, private data: DataService) {
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
    this.data.authenticated.subscribe(authenticated => this.authenticated = authenticated);
    console.log(this.authenticated);
  }

  login() {
    this.errors = [];
    const self = this;
    if (this.email && this.password && this.email.length > 0 && this.password.length > 0) {
      this.af.auth.signInWithEmailAndPassword(this.email, this.password)
        .then((success) => {
          this.data.changeAuth(true);
          this.router.navigate(['/chat']);
        })
        .catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.code);
        if (error.code === 'auth/user-not-found') {
          self.errors.push('L\'utilisateur n\'a pas été trouvé');
        }
        if (error.code === 'auth/wrong-password') {
          self.errors.push('Le mot de passe est incorrect');
        }
        if (error.code === 'auth/invalid-email') {
          self.errors.push('L\'email est incorrect');
        }
      });
    } else {
      this.errors.push('Entrez un email et un mot de passe');
    }
  }


}
