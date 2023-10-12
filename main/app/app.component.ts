import {
  Component,
  ViewEncapsulation,
  ViewChild,
} from '@angular/core';
import {
  ChatbotComponent
} from '../../src/chatbot/chatbot.component';
import { ChatSelectionComponent } from 'src/chat-selection/chat-selection.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'aui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  public isDrawerOpen = false;
  // // start new random sessions every time
  // public session1: string = Math.random().toString(36).substring(7);
  // public showActionButton = false;
  // public actionFired = '';
  // public aria = {
  //   chatbot: 'The chatbot',
  //   close: 'Minimize chatbot',
  //   avatar: 'The chatbot:',
  //   user: 'You:',
  //   message: 'Message to send',
  //   send: 'Send message',
  //   toggle: 'Ask a question',
  // };

  // public performAction(event) {
  //   this.showActionButton = true;
  //   this.actionFired = event.action;
  // }

  // public completeAction() {
  //   const result = {
  //     action: this.actionFired,
  //     message: 'success',
  //   };
  //   this.showActionButton = false;
  //   this.myExampleChatbot.completeAction(result);
  // }

}
