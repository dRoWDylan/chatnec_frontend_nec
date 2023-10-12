import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  ChatbotMessage,
  ChatbotMessageAction,
  ChatbotMessageAriaLabels,
} from '../../chatbot/chatbot.types';

import { CHATBOT_ARIA_DEFAULTS } from '../../chatbot/chatbot.aria-defaults';

@Component({
  selector: 'aui-chatbot-message',
  styleUrls:  ['./message.component.scss'],
  templateUrl: './message.component.html',
})

export class MessageComponent {
  @Input()
  set aria(obj: ChatbotMessageAriaLabels) {
    this._aria = {
      ...CHATBOT_ARIA_DEFAULTS,
      ...obj,
    };
  }

  get aria(): ChatbotMessageAriaLabels {
    return this._aria;
  }
  @Input() data: ChatbotMessage;
  // @Input() aria: ChatbotMessageAriaLabels;
  @Output() replyClicked = new EventEmitter<any>();
  @Output() actionStarted = new EventEmitter<any>();


  private _aria: ChatbotMessageAriaLabels = CHATBOT_ARIA_DEFAULTS;
  public sendReply(message: string): void {
    this.replyClicked.emit({ message });
    this.data.hide = true;
  }

  public performAction(message: ChatbotMessageAction): void {
    this.actionStarted.emit(message);
    this.data.disable = true;
  }

  public speaking(message: any): void{
    console.log("123",message)
    // var text = document.getElementById(`message${i}`).innerText;
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
//      for (var i = 0; i < voices.length; i++) {
//      console.log('Voice ' + i + ':');
//      console.log('  name: ' + voices[i].voiceName);
//      console.log('  lang: ' + voices[i].lang);
//      console.log('  extension id: ' + voices[i].extensionId);
//      console.log('  event types: ' + voices[i].eventTypes);
//      }
//      msg.voice = voices[141]; // Note: some voices don't support altering params
    msg.lang = 'en-GB'
    msg.rate = 1;
    msg.pitch = 1;
    msg.text = message;

    msg.onend = function(e) {
      console.log('Finished in ' + e.elapsedTime + ' seconds.');
    };
    console.log("123",msg)
    return speechSynthesis.speak(msg);
  }

  public currentIndex = 0;


  public displayNextCharacter(textToDisplay) {
    if (this.currentIndex < textToDisplay.length) {
      this.currentIndex++;
      setTimeout(() => {
        this.displayNextCharacter(textToDisplay);
      }, 100);
    }
  }
}
