import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from './chat.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { FormsModule } from '@angular/forms';
import {environment} from '../../environments/environment';

import { ChatDialogComponent } from './chat-dialog/chat-dialog.component';
import {DataService} from '../data.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  declarations: [ChatDialogComponent],
  exports: [ChatDialogComponent],
  providers: [ChatService, DataService]
})
export class ChatModule { }
