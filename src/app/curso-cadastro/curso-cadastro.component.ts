import { Component, OnInit, OnDestroy } from '@angular/core';
import { Curso } from '../model/curso.model';
import { ActivatedRoute, Route } from '@angular/router';
import { CursoBaseService } from '../base/curso-base.service';
import { TokenService } from '../service/token.service';
import { ModalService } from '../service/modal.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { storage } from 'firebase';

@Component({
  selector: 'app-curso-cadastro',
  templateUrl: './curso-cadastro.component.html',
  styleUrls: ['./curso-cadastro.component.css']
})
export class CursoCadastroComponent implements OnInit, OnDestroy {

  public id_curso: string;
  public operacao: string;
  private curso: Curso;
  private sub: Subscription;
  private frm: FormGroup;

  constructor(
    private frmBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _cursoBaseService: CursoBaseService,
    private _token: TokenService,
    private _modal: ModalService,
    private _router: Router) {

    this._activatedRoute.params.subscribe(params => this.id_curso = params['id']);
    this._activatedRoute.params.subscribe(params => this.operacao = params['operacao']);

  }

  ngOnInit() {

    this._token.autenticar(this._modal, this._router, true)

    this.frm = this.frmBuilder.group({
      nome: ['', [Validators.required, Validators.maxLength(100)]],
      descricao: ['', [Validators.required, Validators.maxLength(100)]],
      gratuito: ['Não', [Validators.required]],
      valor: ['', [Validators.required]],
      video: ['', [Validators.required]],
    });

    if (this.operacao != 'Incluir') {
      this.sub = this._cursoBaseService.getPesquisaCampo('ID_CURSO', this.id_curso)
        .subscribe((consultas: Curso[]) => {

          if (consultas && consultas.length > 0) {
            this.curso = consultas[0];
            this.frm.controls['nome'].setValue(this.curso.NOME);
            this.frm.controls['descricao'].setValue(this.curso.DESCRICAO);
            this.frm.controls['gratuito'].setValue(this.curso.GRATUITO);
            this.frm.controls['valor'].setValue(this.curso.VALOR);
            this.frm.controls['video'].setValue(this.curso.VIDEO);
          }
        });
    }

  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onSalvar() {
    if (this.operacao == 'Incluir') {
      const curso: Curso = {
        ID_USUARIOINSTRUTOR: localStorage.getItem('id_usuario'),
        NOME: this.frm.get('nome').value,
        DESCRICAO: this.frm.get('descricao').value,
        GRATUITO: this.frm.get('gratuito').value,
        VALOR: this.frm.get('valor').value,
        VIDEO: this.frm.get('video').value,
        SITUACAO: 'Ativo'
      }
      this._cursoBaseService.create(curso)
        .then(result => {
          this._modal.show('Curso cadastrado com sucesso!')
          this._router.navigate(['/', 'cursoLista']);
        })
        .catch(result => {
          this._modal.show('Erro ao cadastrar curso!')
        });
    } else {
      this.curso.NOME = this.frm.get('nome').value;
      this.curso.DESCRICAO = this.frm.get('descricao').value;
      this.curso.GRATUITO = this.frm.get('gratuito').value;
      this.curso.VALOR = this.frm.get('valor').value;
      this.curso.VIDEO = this.frm.get('video').value;
      this._cursoBaseService.update(this.curso)
        .then(result => {
          this._modal.show('Curso alterado com sucesso!')
          this._router.navigate(['/', 'cursoLista']);
        })
        .catch(result => {
          this._modal.show('Erro ao alterar curso!')
        });
    }
  }

  onCancelar() {
    this._router.navigate(['/', 'cursoLista']);
  }
}
