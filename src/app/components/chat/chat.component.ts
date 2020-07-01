import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  texto = '';
  inputMsgs: any[] = [];
  mensajesSubsription: Subscription;

  elemento: HTMLElement;

  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.elemento = document.getElementById('chat-mensajes');

    this.mensajesSubsription = this.chatService.getMessages().subscribe( msg => {

      this.inputMsgs.push( msg );

      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);
    });
  }

  ngOnDestroy(){
    this.mensajesSubsription.unsubscribe();
  }

  enviar(){

    if ( this.texto === '' ) {
      return false;
    }

    console.log( this.texto );
    this.chatService.sendMessage( this.texto );
    this.texto = '';
  }

}
