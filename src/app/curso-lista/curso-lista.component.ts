import { Component, OnInit } from '@angular/core';
import { CursoBaseService } from '../base/curso-base.service';
import { Curso } from './../model/curso.model';
import { TokenService } from '../service/token.service';
import { ModalService } from '../service/modal.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-curso-lista',
  templateUrl: './curso-lista.component.html',
  styleUrls: ['./curso-lista.component.css']
})
export class CursoListaComponent implements OnInit {

  tipoUsuario: string = localStorage.getItem('tipo');
  sub: Subscription;

  listaCurso: Curso[];
  constructor(private _cursoBaseService: CursoBaseService,
    private _token: TokenService,
    private _modal: ModalService,
    private _router: Router) {

  }

  ngOnInit() {

    this._token.autenticar(this._modal, this._router, true)

    var campo = "";
    var conteudo = "";

    if (localStorage.getItem('tipo') == 'Instrutor') {
      campo = 'ID_USUARIOINSTRUTOR';
      conteudo = localStorage.getItem('id_usuario');
    }

    this.sub = this._cursoBaseService.getPesquisaCampo(campo, conteudo)
      .subscribe((consultas: Curso[]) => {

        this.listaCurso = [];
        if (consultas && consultas.length > 0) {
          this.listaCurso = consultas;
        }
      });

  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onExcluir(id) {
    const curso = this.listaCurso.find(i => i.ID_CURSO == id);
    if (curso != null) {
      this._modal.confirm('Confirma a exclusão do curso?')
        .subscribe(result => {
          curso.SITUACAO = 'Inativo';
          this._cursoBaseService.update(curso)
            .then(result => {
              this._modal.show('Curso excluído com sucesso!')
            })
            .catch(result => {
              this._modal.show('Erro ao excluir curso');
            })
        })
    }
  }

  onAdicionar(id) {
    const curso = this.listaCurso.find(i => i.ID_CURSO == id);
    if (curso != null) {
      this._modal.confirm('Adicionar curso a minha lista?')
        .subscribe(result => {
          this._modal.show('Curso adicionado com sucesso!')
        })
    }
  }

}
