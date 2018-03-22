import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiAiClient } from 'api-ai-javascript';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/scan';
import { DataService } from '../data.service';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';

export class Message {
  constructor(public content: string, public sentBy: string, public addHtml: string) {}
}

@Injectable()
export class ChatService {
  readonly token = environment.dialogflow.ngChatbot;
  readonly client = new ApiAiClient({ accessToken: this.token });

  user: any;
  authenticated: boolean;
  conversation = new BehaviorSubject<Message[]>([]);

  constructor(public af: AngularFireAuth, private router: Router, private data: DataService) { }

  // Ajoute le message à la conversation
  update(msg: Message) {
    this.conversation.next([msg]);
    const conversationBlock = document.querySelector('body');
    conversationBlock.scrollTop = conversationBlock.scrollHeight;
  }

  // Envoie et reçoit des messages via DialogFlow
  converse(msg: string) {
    const userMessage = new Message(msg, 'user', '');
    this.update(userMessage);

    // ICI on mettra le code qui GET en bdd, etc, et on complétera
    // le message de réponse du bot ci-dessous dans le return avec
    // les bonnes infos

    return this.client.textRequest(msg)
      .then(res => {
        console.log(res.result);

        let speech = res.result.fulfillment.speech;

        let addHtml = '';

        if (res.result.action === 'user.profile') {
          console.log(firebase.auth().currentUser);
          this.user = firebase.auth().currentUser;
          speech = `Votre profil est :`;
          addHtml = `
            <ul>
              <li>${this.user.email}</li>
              <li>${this.user.displayName == null ? 'Vous n\'avez pas indiqué votre nom' : this.user.displayName}</li>
              <li>${this.user.phoneNumber == null ? 'Vous n\'avez pas indiqué votre numéro de téléphone' : this.user.phoneNumber}</li>
            </ul>
          `;
        }

        const botMessage = new Message(speech, 'bot', addHtml);
        this.update(botMessage);
      });
  }


  talk() {
    this.client.textRequest('Coucou')
      .then(res => console.log(res));
  }

}
