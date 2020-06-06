import { Component, OnInit, Inject, ViewChild, OnDestroy } from '@angular/core';
import { Chat } from './../model/chat.model';
import { Router } from '@angular/router';
import { ChatBaseService } from '../base/chat-base.service';
import { formatDate } from '@angular/common';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { TokenService } from '../service/token.service';
import { ModalService } from '../service/modal.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit, OnDestroy {

  chatList: Chat[];
  router: Router;

  public id_usuario: string;

  mensagem: string;

  sub: Subscription;

  constructor(router: Router,
    private readonly _chatService: ChatBaseService,
    private _token: TokenService,
    private _modal: ModalService,
    private _router: Router) {
    this.router = router;

  }

  ngOnInit() {

    this.id_usuario = localStorage.getItem('id_usuario');

    this.sub = this._chatService.get(localStorage.getItem('id_video'))
      .subscribe((consultas: Chat[]) => {
        this.chatList = (!!consultas) ? consultas : [];

        this.chatList.sort((a, b) => {
          if (a.DATACADASTRO > b.DATACADASTRO) {
            return 1;
          } else if (a.DATACADASTRO < b.DATACADASTRO) {
            return -1;
          } else {
            return 0;
          }
        });
        
      });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  enviar(): void {
    if (this.mensagem !== "") {

      const chat: Chat = {
        ID_VIDEO: localStorage.getItem('id_video'),
        ID_USUARIO: localStorage.getItem('id_usuario'),
        TIPO: localStorage.getItem('tipo'),
        NOME: localStorage.getItem('nome'),
        MENSAGEM: this.mensagem,
        DATACADASTRO: formatDate(new Date(), 'yyyy/MM/dd hh:mm:ss', 'en')
      };

      this._chatService.create(chat);

      this.mensagem = "";

    }

  }

}
