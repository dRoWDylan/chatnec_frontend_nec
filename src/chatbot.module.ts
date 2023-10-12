import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { IconModule } from '@acpaas-ui/ngx-icon';

import { ChatbotComponent } from './chatbot/chatbot.component';
import { ChatbotService } from './chatbot/chatbot.service';
import { Components } from './components/root';
import { MatIconModule } from '@angular/material/icon'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {NgxTypedJsModule} from 'ngx-typed-js';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ChatSelectionComponent } from './chat-selection/chat-selection.component';
import { RouterModule } from '@angular/router';
import {
  MatSnackBarModule, MatTooltipModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    IconModule,
    MatIconModule,
    MatProgressSpinnerModule,
    NgxTypedJsModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTooltipModule,
    RouterModule
  ],
  exports: [
    ChatbotComponent,
    ...Components,
    ChatSelectionComponent
  ],
  declarations: [
    ChatbotComponent,
    ...Components,
    ChatSelectionComponent,
  ],
  providers: [
    ChatbotService,
  ],
})
export class ChatbotModule { }
