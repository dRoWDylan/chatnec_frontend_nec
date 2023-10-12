import {
  Component,
  ViewEncapsulation,
  ViewChild,
} from '@angular/core';
import {
  ChatbotComponent
} from '../../../src/chatbot/chatbot.component';

@Component({
  selector: 'aui-root',
  templateUrl: './nec3.component.html',
  styleUrls: ['./nec3.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class Nec3Component {
  @ViewChild('myExampleChatbot', { static: true }) myExampleChatbot: ChatbotComponent;
  public isDrawerOpen = false;
  // start new random sessions every time
  public session1: string;
  public showActionButton = false;
  public actionFired = '';
  public aria = {
    chatbot: 'The chatbot',
    close: 'Minimize chatbot',
    avatar: 'The chatbot:',
    user: 'You:',
    message: 'Message to send',
    send: 'Send message',
    toggle: 'Ask a question',
  };

  public performAction(event) {
    this.showActionButton = true;
    this.actionFired = event.action;
  }

  public completeAction() {
    const result = {
      action: this.actionFired,
      message: 'success',
    };
    this.showActionButton = false;
    this.myExampleChatbot.completeAction(result);
  }

  public ngOnInit(): void {
    let session = sessionStorage.getItem('nec3');
    if (session == null) {
      session = Math.random().toString(36).substring(7);
    }
    sessionStorage.setItem('nec3', session)
    this.session1 = session
  }
}
