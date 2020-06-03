import { Component, OnInit, OnDestroy } from '@angular/core';
import { Curso } from '../model/curso.model';
import { ActivatedRoute, Route } from '@angular/router';
import { CursoBaseService } from '../base/curso-base.service';
import { TokenService } from '../service/token.service';
import { ModalService } from '../service/modal.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Matricula } from '../model/matricula.model';
import { MatriculaBaseService } from '../base/matricula-base.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-curso-comprar',
  templateUrl: './curso-comprar.component.html',
  styleUrls: ['./curso-comprar.component.css']
})
export class CursoComprarComponent implements OnInit, OnDestroy {

  public id_curso: string;
  curso: Curso = {
    ID_CURSO: "",
    ID_USUARIOINSTRUTOR: "",
    DESCRICAO: "",
    GRATUITO: "",
    NOME: "",
    SITUACAO: "",
    URLIMAGEM: "",
    VALOR: 0,
    LIBRAS1PLANO: "Não",
    LIBRAS2PLANO: "Não",
    LEGENDA: "Não",
    VIDEOSEMFALA: "Não",
    ENQUADRAMENTOPARALEITURALABIAL: "Não",
    ACESSIBILIDADE: ""
  };
  sub: Subscription;

  public frm: FormGroup;

  constructor(
    private frmBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _cursoBaseService: CursoBaseService,
    private _matriculaBaseService: MatriculaBaseService,
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

    this.frm = this.frmBuilder.group({
      bandeira: ['', [Validators.required, Validators.maxLength(30)]],
      nome: ['', [Validators.required, Validators.maxLength(100)]],
      numerocartao: ['', [Validators.required, Validators.maxLength(30)]],
      validadeMes: ['', [Validators.required, Validators.maxLength(2)]],
      validadeAno: ['', [Validators.required, Validators.maxLength(2)]],
      csv: ['', [Validators.required, Validators.maxLength(3)]],
    });

  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  criticar(): boolean {
    if (!this.frm.controls['bandeira'].valid) {
      this._modal.show('Bandeira do cartão inválida!');
      return false;
    }
    if (!this.frm.controls['nome'].valid) {
      this._modal.show('Nome do titular inválido!');
      return false;
    }
    if (!this.frm.controls['numerocartao'].valid) {
      this._modal.show('Número do cartão inválido!');
      return false;
    }
    if (!this.frm.controls['validadeMes'].valid) {
      this._modal.show('Mês da validade inválido!');
      return false;
    }
    if (!this.frm.controls['validadeAno'].valid) {
      this._modal.show('Ano da validade inválido!');
      return false;
    }
    if (!this.frm.controls['csv'].valid) {
      this._modal.show('CSV inválido!');
      return false;
    }

    if (!this.frm.valid) {
      this._modal.show('Dados incorretos!');
      return false;
    }

    return true;
  }

  onComprar() {
    if (this.criticar()) {
      this._modal.confirm('Comprar curso e adicionar a minha lista?')
        .subscribe(result => {

          const matricula: Matricula = {
            ID_CURSO: this.id_curso,
            ID_USUARIOALUNO: localStorage.getItem('id_usuario')
          }
          this._matriculaBaseService.create(matricula)
            .then(result => {
              this._modal.show('Curso comprado e adicionado com sucesso!')
              this._router.navigate(['/', 'cursoLista', 'Sim']);
            })
            .catch(result => {
              this._modal.show('Erro ao comprar e adicionar curso!')
            });
        })
    }
  }

}
