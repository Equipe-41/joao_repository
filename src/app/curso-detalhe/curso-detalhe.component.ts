import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from 'app/model/curso.model';
import { CursoBaseService } from 'app/base/curso-base.service';
import { TokenService } from 'app/service/token.service';
import { ModalService } from 'app/service/modal.service';

@Component({
  selector: 'app-curso-detalhe',
  templateUrl: './curso-detalhe.component.html',
  styleUrls: ['./curso-detalhe.component.css']
})
export class CursoDetalheComponent implements OnInit {

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
