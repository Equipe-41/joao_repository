import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioBaseService } from '../base/usuario-base.service';
import { Usuario } from './../model/usuario.model';
import { Router } from '@angular/router';
import { ModalService } from '../service/modal.service';
import { TokenService } from '../service/token.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-usuario-login',
  templateUrl: './usuario-login.component.html',
  styleUrls: ['./usuario-login.component.css']
})
export class UsuarioLoginComponent implements OnInit {

  frm: FormGroup;

  constructor(
    private frmBuilder: FormBuilder,
    private _usuarioBaseService: UsuarioBaseService,
    private _router: Router,
    private _modal: ModalService,
    private _token: TokenService) { }

  ngOnInit() {

    this.frm = this.frmBuilder.group({
      email: ['', [Validators.required,
      Validators.pattern(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i),
      Validators.maxLength(100)]],
      senha: ['', [Validators.required,
      Validators.maxLength(10)]]
    });

  }

  onEntrar() {

    if (this.frm.valid) {
      var email = this.frm.get('email').value ? this.frm.get('email').value : '';
      var senha = this.frm.get('senha').value ? this.frm.get('senha').value : '';

      email = email.toLowerCase();

      this._usuarioBaseService.getAutenticar(email, senha)
        .pipe(take(1))
        .subscribe((consultas: Usuario[]) => {
          if (consultas && consultas.length > 0) {

            const usuario: Usuario = consultas[0];
            this.frm.reset();

            localStorage.setItem('id_usuario', usuario.ID_USUARIO);
            localStorage.setItem('nome', usuario.NOME);
            localStorage.setItem('tipo', usuario.TIPO);

            this._token.gerar();

            this._router.navigate(['/', 'cursoLista']);

          } else {
            this._modal.show('Usuário não cadastrado!')
          }
        }, result => {
          this._modal.show('Erro ao realizar login.')
        })

    } else {
      if (!this.frm.controls['email'].valid) {
        this._modal.show('Email inválido!');
      } else if (!this.frm.controls['senha'].valid) {
        this._modal.show('Senha inválida!')
      }
    }
  }
}