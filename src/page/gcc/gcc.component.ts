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
  templateUrl: './gcc.component.html',
  styleUrls: ['./gcc.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GccComponent {
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
    let session = sessionStorage.getItem('gcc');
    if (session == null) {
      session = Math.random().toString(36).substring(7);
    }
    sessionStorage.setItem('gcc', session)
    this.session1 = session
  }

}
