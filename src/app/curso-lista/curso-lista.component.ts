import { Component, OnInit } from '@angular/core';
import { CursoBaseService } from '../base/curso-base.service';
import { Curso } from './../model/curso.model';
import { TokenService } from '../service/token.service';
import { ModalService } from '../service/modal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatriculaBaseService } from '../base/matricula-base.service';
import { Matricula } from '../model/matricula.model';

@Component({
  selector: 'app-curso-lista',
  templateUrl: './curso-lista.component.html',
  styleUrls: ['./curso-lista.component.css']
})
export class CursoListaComponent implements OnInit {

  tipoUsuario: string = localStorage.getItem('tipo');
  sub: Subscription;
  sub2: Subscription;

  listaCurso: Curso[];
  listaMatricula: Matricula[];

  Matriculado: string;

  constructor(
    private _cursoBaseService: CursoBaseService,
    private _matriculaBaseService: MatriculaBaseService,
    private _activatedRoute: ActivatedRoute,
    private _token: TokenService,
    private _modal: ModalService,
    private _router: Router) {

    this._activatedRoute.params.subscribe(params => this.Matriculado = params['matriculado']);
    if (this.Matriculado == undefined) {
      this.Matriculado = 'Não';
    }
  }

  ngOnInit() {

    this._token.autenticar(this._modal, this._router, true)

    var campo = "";
    var conteudo = "";

    if (localStorage.getItem('tipo') == 'Instrutor') {
      campo = 'ID_USUARIOINSTRUTOR';
      conteudo = localStorage.getItem('id_usuario');
    }

    if (localStorage.getItem('tipo') == 'Aluno') {
      this.sub = this._matriculaBaseService.getPesquisaCampo('ID_USUARIOALUNO', localStorage.getItem('id_usuario'))
        .subscribe((consultas: Matricula[]) => {
          this.listaMatricula = [];
          this.listaMatricula = consultas;

          this.sub2 = this._cursoBaseService.getPesquisaCampo(campo, conteudo)
            .subscribe((consultas: Curso[]) => {
              this.listaCurso = [];
              if (consultas && consultas.length > 0) {

                consultas.forEach((item: Curso) => {
                  if (this.Matriculado == 'Sim') {
                    if (this.listaMatricula.find(i => i.ID_CURSO == item.ID_CURSO) != null) {
                      this.listaCurso.push(item);
                    }
                  } else {
                    if (this.listaMatricula.find(i => i.ID_CURSO == item.ID_CURSO) == null) {
                      this.listaCurso.push(item);
                    }
                  }
                })
              }
            });
        });
    } else {
      this.sub = this._cursoBaseService.getPesquisaCampo(campo, conteudo)
        .subscribe((consultas: Curso[]) => {
          this.listaCurso = [];
          if (consultas && consultas.length > 0) {
            this.listaCurso = consultas;
          }
        });
    }

  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
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

          const matricula: Matricula = {
            ID_CURSO: id,
            ID_USUARIOALUNO: localStorage.getItem('id_usuario')
          }
          this._matriculaBaseService.create(matricula)
            .then(result => {
              this._modal.show('Curso adicionado com sucesso!')
            })
            .catch(result => {
              this._modal.show('Erro ao adicionar curso!')
            });
        })
    }
  }

}
