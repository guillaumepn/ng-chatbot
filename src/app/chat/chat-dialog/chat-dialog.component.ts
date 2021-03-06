import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from '../chat.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/scan';
import {DataService} from '../../data.service';

@Component({
  selector: 'chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})

export class ChatDialogComponent implements OnInit {
  authenticated: boolean;
  messages: Observable<Message[]>;
  formValue: string;
  users: any[];
  firstHTML: string;

  constructor(private chat: ChatService, db: AngularFireDatabase, af: AngularFireAuth, private data: DataService) {
    db.list('/users').valueChanges().subscribe(users => {
      this.users = users;
      console.log(this.users);
    });
  }

  ngOnInit() {
    this.firstHTML = `
    <a target="_blank" class="call-veto"><img src="assets/images/sante.png" class="welcome sante"></a> <a class="localiser-link"><img src="assets/images/localiser.png" class="welcome localiser"></a> <a target="_blank" href="https://www.animalis.com"><img src="assets/images/shopping.png" class="welcome shopping"></a>
    `;

    this.data.authenticated.subscribe(authenticated => this.authenticated = authenticated);
    console.log(this.authenticated);
    this.messages = this.chat.conversation.asObservable()
      .scan((acc, val) => acc.concat(val));

    // this.chat.talk();
  }

  sendMessage() {
    if (this.formValue && this.formValue.length > 0) {
      this.chat.converse(this.formValue);
    }
    this.formValue = '';
  }

  findAnimal() {
    console.log("test");
    let conversation = document.querySelector('.conversation');
    let msg = document.createElement('div');
    msg.innerHTML = `<strong>test</strong>`;
    conversation.appendChild(msg);
  }

}
