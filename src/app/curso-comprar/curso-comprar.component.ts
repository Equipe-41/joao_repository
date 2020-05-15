import { Component, OnInit } from '@angular/core';
import { Curso } from 'app/model/curso.model';
import { ActivatedRoute, Route } from '@angular/router';
import { CursoBaseService } from 'app/base/curso-base.service';
import { TokenService } from 'app/service/token.service';
import { ModalService } from 'app/service/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-curso-comprar',
  templateUrl: './curso-comprar.component.html',
  styleUrls: ['./curso-comprar.component.css']
})
export class CursoComprarComponent implements OnInit {

  public id_curso : string;
  curso: Curso;

  constructor(private _activatedRoute: ActivatedRoute,
    private _cursoBaseService: CursoBaseService,
    private _token: TokenService,
    private _modal: ModalService,
    private _router: Router) {
    this._activatedRoute.params.subscribe(params => this.id_curso = params['id']);

    this.curso = _cursoBaseService.get(this.id_curso);

   }

  ngOnInit() {

    this._token.autenticar(this._modal, this._router, true)

  }

}
