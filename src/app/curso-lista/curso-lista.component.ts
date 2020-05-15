import { Component, OnInit } from '@angular/core';
import { CursoBaseService } from 'app/base/curso-base.service';
import { Curso } from './../model/curso.model';
import { TokenService } from 'app/service/token.service';
import { ModalService } from 'app/service/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-curso-lista',
  templateUrl: './curso-lista.component.html',
  styleUrls: ['./curso-lista.component.css']
})
export class CursoListaComponent implements OnInit {

  listaCurso: Curso[];
  constructor(private _cursoBaseService: CursoBaseService,
    private _token: TokenService,
    private _modal: ModalService,
    private _router: Router) {


  }

  ngOnInit() {

    this._token.autenticar(this._modal, this._router, true)

    this.listaCurso = this._cursoBaseService.list();

  }

}
