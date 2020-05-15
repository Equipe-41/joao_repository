import { Injectable } from '@angular/core';
import { ModalService } from '../service/modal.service';
import { Router } from '@angular/router';
//import { formatDate } from '@angular/common';

@Injectable()
export class TokenService {

  constructor() {

  }

  validar(dataAtual) {
    var token = localStorage.getItem('token') == 'undefined' ? '' : localStorage.getItem('token');
    if (token == '') {
      return false;
    }

    var token = localStorage.getItem('token') == 'undefined' ? '' : localStorage.getItem('token');
    if (token == '') {
      return false;
    }

    var now = new Date(dataAtual);
    var past = new Date(this.decripta(token));
    var minu = Math.abs(now.getTime() - past.getTime()) / 1000 / 60;
    if (minu > 20) {
      return false;
    }
    localStorage.setItem('token', this.encripta(dataAtual));
    return true;
  }

  autenticar(_modal: ModalService, _router: Router, tipoUsuario: boolean) {

    if (!tipoUsuario) {
      _modal.show('Usuário não autorizado!');
      _router.navigate(['/', 'usuarioLogin']);
    } else {
      var id_usuario = localStorage.getItem('id_usuario') == 'undefined' ? '' : localStorage.getItem('id_usuario');
      if (id_usuario == '') {
        _modal.show('Usuário não identificado!');
        _router.navigate(['/', 'usuarioLogin']);
      } else {

        var dataAtual = "2020/05/15 00:00:00"; //formatDate(new Date(), 'yyyy/MM/dd HH:mm:ss', 'en');
        if (!this.validar(dataAtual)) {
          _modal.show('Sua sessão expirou!');
          _router.navigate(['/', 'usuarioLogin']);
        }
      }
    }
  }

  public gerar() {
    var dataAtual = "2020/05/15 00:00:00"; //formatDate(new Date(), 'yyyy/MM/dd HH:mm:ss', 'en');
    localStorage.setItem('token', this.encripta(dataAtual));
  }

  encripta(data) {
    // https://stackoverflow.com/questions/46642143/rsa-encrypt-decrypt-in-typescript
    return data;
  }

  decripta(token) {
    return token;
  }

}