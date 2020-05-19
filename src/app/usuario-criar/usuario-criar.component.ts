import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioBaseService } from '../base/usuario-base.service';
import { Usuario } from './../model/usuario.model';
import { Router } from '@angular/router';
import { ModalService } from '../service/modal.service';
import { TokenService } from '../service/token.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-usuario-criar',
  templateUrl: './usuario-criar.component.html',
  styleUrls: ['./usuario-criar.component.css']
})
export class UsuarioCriarComponent implements OnInit {

  frm: FormGroup;

  constructor(
    private frmBuilder: FormBuilder,
    private _usuarioBaseService: UsuarioBaseService,
    private _router: Router,
    private _modal: ModalService,
    private _token: TokenService) { }

  ngOnInit() {

    this.frm = this.frmBuilder.group({
      tipo: ['', [Validators.required]],
      nome: ['', [Validators.required,
      Validators.maxLength(100)]],
      email: ['', [Validators.required,
      Validators.pattern(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i),
      Validators.maxLength(100)]],
      senha: ['', [Validators.required,
      Validators.maxLength(10)]],
      confirmarSenha: ['', [Validators.required,
      Validators.maxLength(10)]]
    });

  }

  criticar(): boolean {

    this.frm.controls['tipo'].setValue('Aluno');
    if (!this.frm.controls['tipo'].valid) {
      console.log(this.frm.controls['tipo']);
      this._modal.show('Tipo inválido!');
      return false;
    }
    if (!this.frm.controls['nome'].valid) {
      this._modal.show('Nome inválido!');
      return false;
    }
    if (!this.frm.controls['email'].valid) {
      this._modal.show('Email inválido!');
      return false;
    }
    if (!this.frm.controls['senha'].valid) {
      this._modal.show('Senha inválida!');
      return false;
    }
    if (!this.frm.controls['confirmarSenha'].valid) {
      this._modal.show('Confirmação de senha inválida!');
      return false;
    }
    if (this.frm.controls['confirmarSenha'].value != this.frm.controls['senha'].value) {
      this._modal.show('Senha não confirmada!');
      return false;
    }

    if (!this.frm.valid) {
      console.log(this.frm.value)
      this._modal.show('Dados incorretos!');
      return false;
    }

    return true;
  }

  onSalvar() {

    if (this.criticar()) {

      var tipo = this.frm.get('tipo').value ? this.frm.get('tipo').value : '';
      var nome = this.frm.get('nome').value ? this.frm.get('nome').value : '';
      var email = this.frm.get('email').value ? this.frm.get('email').value : '';
      var senha = this.frm.get('senha').value ? this.frm.get('senha').value : '';

      const usuario: Usuario = {
        TIPO: tipo,
        ID_USUARIO: '',
        NOME: nome,
        EMAIL: email,
        SENHA: senha,
        SITUACAO: 'Ativo'
      }

      this._usuarioBaseService.create(usuario)
        .then(result => {
          this._modal.show('Usuário cadastrado com sucesso!')
          this._router.navigate(['/', 'usuarioLogin']);
        })
        .catch(result => {
          this._modal.show('Erro ao cadastrar usuário!')
        })
    }
  }

  onCancelar() {
    this._router.navigate(['/', 'usuarioLogin']);
  }
}