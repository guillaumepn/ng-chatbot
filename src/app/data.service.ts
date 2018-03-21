import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {

  private authSource = new BehaviorSubject<boolean>(false);
  authenticated = this.authSource.asObservable();

  constructor() { }

  changeAuth(auth: boolean) {
    this.authSource.next(auth);
  }

}
