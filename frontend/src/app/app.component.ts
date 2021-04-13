
import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './socketio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Websocket Angular client ';
  userName?: string;
  message?: string;
  output: any[] = [];
  feedback?: string;

  constructor(private webSocketService: WebSocketService) { }
  ngOnInit(): void {
    this.webSocketService.listen('typing').subscribe((data:any) => this.updateFeedback(data));
    this.webSocketService.listen('chat').subscribe((data:any) => this.updateMessage(data));
  }

  messageTyping(): void {
    this.webSocketService.emit('typing', this.userName);    
  }

  sendMessage(): void {
    this.webSocketService.emit('chat', {
      message: this.message,
      handle: this.userName
    });
    this.message = "";    
  }

  updateMessage(data:any) {
    this.feedback = '';
    if(!!!data) return;
    console.log(`${data.handle} : ${data.message}`);
    this.output.push(data);
  }

  updateFeedback(data: any){
    this.feedback = `${data} is typing a message`;
  }

}