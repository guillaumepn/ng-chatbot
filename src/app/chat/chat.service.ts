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
  result: any;
  ref = firebase.app().database().ref();
  usersRef: any;
  authenticated: boolean;
  conversation = new BehaviorSubject<Message[]>([]);
  veto_name = '';
  veto_adresse = '';
  veto_telephone = '';
  veto_mail = '';
  dataToSave: any;

  constructor(public af: AngularFireAuth, private router: Router, private data: DataService) {
    this.usersRef = this.ref.child('users');
    console.log(this.usersRef);
  }

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

        console.log(firebase.auth().currentUser);
        this.user = firebase.auth().currentUser;

          let speech = res.result.fulfillment.speech;
        let addHtml = '';
        this.result = res.result;

        if (res.result.action === 'user.profile') {
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

            this.dataToSave.email = this.user.email;
            this.veto_name = this.result.parameters.nom;
            this.dataToSave.veto_name = this.veto_name;
        }
        if (res.result.action === 'veto_adresse') {
            this.veto_adresse = this.result.parameters.adresse;
            this.dataToSave.veto_adresse = this.veto_adresse;
        }
        if (res.result.action === 'veto_telephone') {
            this.veto_telephone = this.result.parameters.telephone;
            this.dataToSave.veto_telephone = this.veto_telephone;
        }
        if (res.result.action === 'veto_mail') {
            this.veto_mail = this.result.parameters.mail;
            this.dataToSave.veto_mail = this.veto_mail;
            let dataJson = JSON.stringify(this.dataToSave);

            const userRef = this.usersRef.update({
                veto: dataJson
            });
        }
        if (res.result.action === 'veto_call') {
          // insere en bdd mail veto
          window.open('tel:+33682760863');
        }
        if (res.result.action === 'profilAnimal_type') {
          // insere en bdd animal type
        }
        if (res.result.action === 'profilAnimal_name') {
          // insere en bdd animal name
        }
        if (res.result.action === 'profilAnimal_poids') {
          // insere en bdd animal poids
        }
        if (res.result.action === 'profilAnimal_date') {
          // insere en bdd animal date
        }
        if (res.result.action === 'profilAnimal_vaccin') {
          // insere en bdd animal vaccin
        }
          if (res.result.action === 'found_animal') {
              console.log(firebase.auth().currentUser);
              this.user = firebase.auth().currentUser;
              addHtml =`
                <img src="https://maps.googleapis.com/maps/api/staticmap?center=48.8488288,2.2814991&zoom=16&markers=red%7Clabel:A%7C48.8488288,2.2814991&size=400x400&maptype=terrain&key=AIzaSyAXV6EXF3AcfOzifiykh5Z4tYGGT6GxcEU">
              `;

          }
        if (res.result.action === 'command_croquette') {
          let croquette = this.result.parameters.marque;
          croquette = croquette.replace(/ /g, '+');
          const href = 'https://www.animalis.com/catalogsearch/result/index/?q=' + croquette;
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
