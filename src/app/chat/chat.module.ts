import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from './chat.service';
import { ChatDialogComponent } from './chat-dialog/chat-dialog.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';

import { FormsModule } from '@angular/forms';
import {environment} from '../../environments/environment';
import { ChatLoginComponent } from './chat-login/chat-login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  declarations: [ChatDialogComponent, ChatLoginComponent],
  exports: [ChatDialogComponent],
  providers: [ChatService]
})
export class ChatModule { }
