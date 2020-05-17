import { Component, OnInit, OnDestroy } from '@angular/core';
import { Curso } from '../model/curso.model';
import { ActivatedRoute, Route } from '@angular/router';
import { CursoBaseService } from '../base/curso-base.service';
import { TokenService } from '../service/token.service';
import { ModalService } from '../service/modal.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-curso-comprar',
  templateUrl: './curso-comprar.component.html',
  styleUrls: ['./curso-comprar.component.css']
})
export class CursoComprarComponent implements OnInit, OnDestroy {

  public id_curso: string;
  curso: Curso;
  sub: Subscription;

  constructor(private _activatedRoute: ActivatedRoute,
    private _cursoBaseService: CursoBaseService,
    private _token: TokenService,
    private _modal: ModalService,
    private _router: Router) {
    this._activatedRoute.params.subscribe(params => this.id_curso = params['id']);

    this.sub = this._cursoBaseService.getPesquisaCampo('ID_CURSO', this.id_curso)
      .subscribe((consultas: Curso[]) => {

        if (consultas && consultas.length > 0) {
          this.curso = consultas[0];
        }
      });
  }

  ngOnInit() {

    this._token.autenticar(this._modal, this._router, true)

  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
