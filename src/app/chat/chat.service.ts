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

          if (res.result.action === 'veto_name') {
              console.log(firebase.auth().currentUser);
              this.user = firebase.auth().currentUser;
              // insere en bdd nom veto
          }
          if (res.result.action === 'veto_adresse') {
              console.log(firebase.auth().currentUser);
              this.user = firebase.auth().currentUser;
              // insere en bdd adresse veto
          }
          if (res.result.action === 'veto_telephone') {
              console.log(firebase.auth().currentUser);
              this.user = firebase.auth().currentUser;
              // insere en bdd telephone veto
          }
          if (res.result.action === 'veto_mail') {
              console.log(firebase.auth().currentUser);
              this.user = firebase.auth().currentUser;
              // insere en bdd mail veto
          }
          if (res.result.action === 'profilAnimal_type') {
              console.log(firebase.auth().currentUser);
              this.user = firebase.auth().currentUser;
              // insere en bdd animal type
          }
          if (res.result.action === 'profilAnimal_name') {
              console.log(firebase.auth().currentUser);
              this.user = firebase.auth().currentUser;
              // insere en bdd animal name
          }
          if (res.result.action === 'profilAnimal_poids') {
              console.log(firebase.auth().currentUser);
              this.user = firebase.auth().currentUser;
              // insere en bdd animal poids
          }
          if (res.result.action === 'profilAnimal_date') {
              console.log(firebase.auth().currentUser);
              this.user = firebase.auth().currentUser;
              // insere en bdd animal date
          }
          if (res.result.action === 'profilAnimal_vaccin') {
              console.log(firebase.auth().currentUser);
              this.user = firebase.auth().currentUser;
              // insere en bdd animal vaccin
          }
          if (res.result.action === 'command_croquette') {
              console.log(firebase.auth().currentUser);
              this.user = firebase.auth().currentUser;
              let croquette = res.result.parameters.marque;
              croquette = croquette.replace(/ /g, "+");
              let href = "https://www.animalis.com/catalogsearch/result/index/?q="+croquette;
              addHtml = `
            <a target="_blank" href=${href}><img src="../../assets/images/croquette.jpg"></a>
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
