import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from '../model/curso.model';
import { CursoBaseService } from '../base/curso-base.service';
import { TokenService } from '../service/token.service';
import { ModalService } from '../service/modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-curso-detalhe',
  templateUrl: './curso-detalhe.component.html',
  styleUrls: ['./curso-detalhe.component.css']
})
export class CursoDetalheComponent implements OnInit {

  public id_curso : string;
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
