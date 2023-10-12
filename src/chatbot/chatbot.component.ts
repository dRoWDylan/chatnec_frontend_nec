import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ChatbotService } from './chatbot.service';
import {
  ChatbotMessage,
  ChatbotMessageAction,
  ChatbotConversation,
  ChatbotMessageAriaLabels,
} from './chatbot.types';
import { CHATBOT_ARIA_DEFAULTS } from './chatbot.aria-defaults';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'aui-chatbot',
  styleUrls: ['./chatbot.component.scss'],
  templateUrl: './chatbot.component.html',
})


export class ChatbotComponent implements OnInit {
  @ViewChild('messageInput', { static: false }) messageInput: ElementRef;

  @Output() actionStarted = new EventEmitter<any>();

  // BFF URL
  @Input() url: string;

  // Mongo Documents
  @Input() project_id: string;

  // Required session ID to easily retrieve the chat history if necessary
  @Input() session: string;

  // Image link
  @Input() image: string;

  // Title above the chat window
  @Input() title = '';

  // Whether the chatbot is inline or pinned to the bottom of the application
  @Input() pinned = false;

  // Placeholder string in the chat input field
  @Input() placeholder = '';

  // Delay between multiple messages received from the chatbot engine
  @Input() delay = 400;

  // Height of the chatbot in pixels, only to use when the chatbot is not pinned
  @Input() height = window.innerHeight;

  // Width of the chatbot in pixels, only to use when the chatbot is pinned
  @Input() width = 288;

  // Avatar to display
  // @Input() avatar = 'https://s3.ap-east-1.amazonaws.com/about.drow.cloud.hk/logo-removebg-left.png';
  @Input() avatar = '../../assets/chatnec.svg'

  // Set ARIA labels
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

  public data: ChatbotConversation = [];
  public message: ChatbotMessage;
  public isLoading = false;
  public loadingIndex: number;
  public isOpen = false;
  public currentAction = '';
  public defaultMessage: ChatbotMessage = {
    message: "default message",
    type: "quickReply",
    send: true,
  }

  private _aria: ChatbotMessageAriaLabels = CHATBOT_ARIA_DEFAULTS;

  constructor(
    private chatbotService: ChatbotService,
    public snackBar: MatSnackBar,
  ) {}

  public ngOnInit(): void {
    let data = JSON.parse(sessionStorage.getItem("data"))
    console.log(data)
    if (data == null) {
      data = {}
    }

    if (data[this.session] == null) {
        data[this.session] = []
        sessionStorage.setItem("data", JSON.stringify(data))
    }
    this.data = data[this.session]
    for (const i in this.data) {
      if (this.data[i].type == 'quickReply') {
        this.data[i].type = 'oldReply'
      }
    }
    if (this.data.length < 1) {
      this.message = {
        session_id: this.session,
        message: 'default message',
        type: 'text',
        send: true,
        project_id: this.project_id
      };
      // Request opening message from chatbot
      // This can not be empty, so we trigger it by sending the special message 'STARTCOMMANDO'
      // this.addToChat(this.defaultMessage.message)
      this.sendMessage(true);
    }
    else {
      this.message = {
        session_id: this.session,
        message: '',
        type: 'text',
        send: true,
        project_id: this.project_id
      };
    }
    if (this.data.length > 2) {
      this.message.chatHistory = this.data[this.data.length - 2].chatHistory
    }
    console.log(this.message)
  }

  public sendMessage(hide = false): void {
    console.log(this.message)
    if (!this.message.message) { return; }

    // Start loader
    this.isLoading = true;

    // Add to data
    if (!hide) {
      // this.message.chatHistory = JSON.parse(sessionStorage.getItem("chatHistory"));
      if (!this.message.chatHistory || this.message.chatHistory.length <= 0) {
        this.message.chatHistory = [{ role: "user", content: this.message.message }]
      }
      else {
        this.message.chatHistory.push({ role: "user", content: this.message.message })
        // sessionStorage.setItem("chatHistory", JSON.stringify(this.message.chatHistory));
      }
      this.addToChat(this.message);
    }

    // Send new data
    this.chatbotService.sendMessage(this.url, this.message)
      .subscribe(
        (result: ChatbotConversation)=> {
          result.forEach((item: ChatbotMessage, index, res) => {
            this.loadingIndex = index;
            this.isLoading = true;
            setTimeout(() => {
              if (index === 0) {
                item.avatar = this.avatar;
              }
              this.addToChat(item);
              if (index === res.length - 1) {
                this.loadingIndex = null;
                this.isLoading = false;
              }
            }, index * this.delay);
            
            if (!!this.message && !!this.message.chatHistory) {
              this.message.chatHistory.push({ role: "assistant", content: item.message })
              //
              // Jank (Adjective)
              //
              // Definition: of extremely poor or unreliable quality.
              // Example: "this software is pretty janky"
              //
              // sessionStorage.setItem("chatHistory", JSON.stringify(this.message.chatHistory));
            }
          });
        },
        error => {
          if (Array.isArray(this.message.chatHistory)) {
            this.message.chatHistory.pop()
          }
          this.pushError(error);
          this.isLoading = false;
        }
      );

    // Clean
    this.message.message = '';

    // Focus
    if (this.messageInput && this.messageInput.nativeElement) {
      this.messageInput.nativeElement.focus();
    }
  }

  public sendReply(event: any): void {
    this.message.message = event.message;
    this.sendMessage();
  }

  public performAction(event: ChatbotMessageAction): void {
    this.currentAction = event.action;
    this.actionStarted.emit(event);
  }

  public completeAction(result: any): void {
    if (result.action === this.currentAction) {
      this.message = {
        session_id: this.session,
        message: result.message,
        type: 'text',
        send: true,
      };
      this.sendMessage(true);
      this.currentAction = '';
    }
  }

  public toggleChatbot(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      setTimeout(() => {
        this.messageInput.nativeElement.focus();
      }, 0);
    }
  }

  private addToChat(message): void {
    const newData = [
      ...this.data,
      Object.assign({}, message),
    ];
    this.data = newData;
    let data = JSON.parse(sessionStorage.getItem("data"))
    if (data == null) {
      data = {}
    }
    data[this.session] = this.data
    sessionStorage.setItem("data", JSON.stringify(data));
  }

  private pushError(error): void {
    let message = 'Error';
    if (typeof error !== 'undefined') {
      message = 'Error ' + error.status + ' - ' + error.message;
    }
    const errorMessage: ChatbotMessage = {
      message,
      type: 'error',
    };
    this.addToChat(errorMessage);
  }

  public removeChat(): void {
    this.snackBar.open('Clearing Chats...');
    sessionStorage.removeItem("data");
    sessionStorage.removeItem("chatHistory");
    location.reload()
  }
  
}
