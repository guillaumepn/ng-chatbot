import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from "../chat.service";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/scan';

@Component({
  selector: 'chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit {

  messages: Observable<Message[]>;
  formValue: string;
  users: any[];

  constructor(private chat: ChatService, db: AngularFireDatabase) {
    db.list('/users').valueChanges().subscribe(users => {
      this.users = users;
      console.log(this.users);
    });
  }

  ngOnInit() {
    this.messages = this.chat.conversation.asObservable()
      .scan((acc, val) => acc.concat(val));
    this.chat.talk();
  }

  sendMessage() {
    if (this.formValue && this.formValue.length > 0)
      this.chat.converse(this.formValue);
    this.formValue = '';
  }

}
