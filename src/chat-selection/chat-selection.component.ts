import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-chat-selection',
  templateUrl: './chat-selection.component.html',
  styleUrls: ['./chat-selection.component.scss'],
  
})
export class ChatSelectionComponent implements OnInit {
  @Input() page!: string;
  @Input() img!: string;
  @Input() title!: string;
  @Input() desc!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
