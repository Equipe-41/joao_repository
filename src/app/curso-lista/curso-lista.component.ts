import { Component, OnInit } from '@angular/core';
import { CursoBaseService } from '../base/curso-base.service';
import { Curso } from './../model/curso.model';
import { TokenService } from '../service/token.service';
import { ModalService } from '../service/modal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatriculaBaseService } from '../base/matricula-base.service';
import { Matricula } from '../model/matricula.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  public frm: FormGroup;

  constructor(
    private frmBuilder: FormBuilder,
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

    this.frm = this.frmBuilder.group({
      descricao: ['', [Validators.maxLength(100)]],
      libras1Plano: [false],
      libras2Plano: [false],
      legenda: [false],
      videoSemFala: [false],
      enquadramentoParaLeituraLabial: [false],
    });

    this.consulta("", "", "", "", "", "");

  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }

  consulta(descricao, libras1Plano, libras2Plano, legenda, videoSemFala, enquadramentoParaLeituraLabial) {
    var campo = "";
    var conteudo = "";

    if (localStorage.getItem('tipo') == 'Instrutor') {
      campo = 'ID_USUARIOINSTRUTOR';
      conteudo = localStorage.getItem('id_usuario');
    }

    if (localStorage.getItem('tipo') != 'Instrutor') {
      this.sub = this._matriculaBaseService.getPesquisaCampo('ID_USUARIO', localStorage.getItem('id_usuario'))
        .subscribe((consultas: Matricula[]) => {
          this.listaMatricula = [];
          this.listaMatricula = consultas;

          this.sub2 = this._cursoBaseService.getPesquisa(campo, conteudo, descricao, libras1Plano, libras2Plano, legenda, videoSemFala, enquadramentoParaLeituraLabial)
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
      this.sub = this._cursoBaseService.getPesquisa(campo, conteudo, descricao, libras1Plano, libras2Plano, legenda, videoSemFala, enquadramentoParaLeituraLabial)
        .subscribe((consultas: Curso[]) => {
          this.listaCurso = [];
          if (consultas && consultas.length > 0) {
            this.listaCurso = consultas;
          }
        });
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
            ID_USUARIO: localStorage.getItem('id_usuario'),
            ID_TIPO: localStorage.getItem('tipo'),
            NOME: localStorage.getItem('nome')
          }
          this._matriculaBaseService.create(matricula)
            .then(result => {
              this._modal.show('Curso adicionado com sucesso!')
              this._router.navigate(['/', 'cursoLista', 'Sim']);
            })
            .catch(result => {
              this._modal.show('Erro ao adicionar curso!')
            });
        })
    }
  }

  onArrowDown() {
    var arrow_down = document.getElementById("arrow_down");
    arrow_down.setAttribute("style", "display: none !important;");
    var arrow_up = document.getElementById("arrow_up");
    arrow_up.setAttribute("style", "display: block !important;");
    var search = document.getElementById("search");
    search.setAttribute("style", "display: block !important;");
  }

  onArrowUp() {
    var arrow_down = document.getElementById("arrow_down");
    arrow_down.setAttribute("style", "display: block !important;");
    var arrow_up = document.getElementById("arrow_up");
    arrow_up.setAttribute("style", "display: none !important;");
    var search = document.getElementById("search");
    search.setAttribute("style", "display: none !important;");
    this.consulta("", "", "", "", "", "");
  }

  onPesquisar() {
    var descricao = ""; //this.frm.get('descricao').value;
    var libras1Plano = this.frm.get('libras1Plano').value ? "Sim" : "Não";
    var libras2Plano = this.frm.get('libras2Plano').value ? "Sim" : "Não";
    var legenda = this.frm.get('legenda').value ? "Sim" : "Não";
    var videoSemFala = this.frm.get('videoSemFala').value ? "Sim" : "Não";
    var enquadramentoParaLeituraLabial = this.frm.get('enquadramentoParaLeituraLabial').value ? "Sim" : "Não";
    this.consulta(descricao, libras1Plano, libras2Plano, legenda, videoSemFala, enquadramentoParaLeituraLabial);
  }

}
