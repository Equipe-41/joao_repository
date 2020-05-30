import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../service/modal.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuario-esqueci',
  templateUrl: './usuario-esqueci.component.html',
  styleUrls: ['./usuario-esqueci.component.css']
})
export class UsuarioEsqueciComponent implements OnInit {

  public frm: FormGroup;

  constructor(
    private frmBuilder: FormBuilder,
    private _router: Router,
    private _modal: ModalService) { }

  ngOnInit() {

    this.configMenuOff();

    this.frm = this.frmBuilder.group({
      email: ['', [Validators.required, Validators.maxLength(100)]]
    });

  }

  configMenuOff() {
    var menu = document.getElementsByClassName("opcaoMenu");
    menu[0].setAttribute("style", "display: none !important;");
    menu[1].setAttribute("style", "display: none !important;");
  }

  criticar(): boolean {
    if (!this.frm.controls['email'].valid) {
      this._modal.show('Email inválido!');
      return false;
    }
    if (!this.frm.valid) {
      this._modal.show('Dados incorretos!');
      return false;
    }

    return true;
  }

  onSalvar() {
    if (this.criticar()) {
      this._modal.show("Enviamos um email para redefinir senha.");
      this._router.navigate(['/', 'usuarioLogin']);
    }
  }

  onCancelar() {
    this._router.navigate(['/', 'usuarioLogin']);
  }

}
