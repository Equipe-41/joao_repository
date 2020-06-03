import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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
  public frm: FormGroup;

  @Input() urlImage: string = "";

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
      urlimagem: ['', [Validators.required]],
      libras1Plano: [false],
      libras2Plano: [false],
      legenda: [false],
      videoSemFala: [false],
      enquadramentoParaLeituraLabial: [false],
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
            this.frm.controls['urlimagem'].setValue(this.curso.URLIMAGEM);
            this.frm.controls['libras1Plano'].setValue(this.curso.LIBRAS1PLANO == 'Sim');
            this.frm.controls['libras2Plano'].setValue(this.curso.LIBRAS2PLANO == 'Sim');
            this.frm.controls['legenda'].setValue(this.curso.LEGENDA == 'Sim');
            this.frm.controls['videoSemFala'].setValue(this.curso.VIDEOSEMFALA == 'Sim');
            this.frm.controls['enquadramentoParaLeituraLabial'].setValue(this.curso.ENQUADRAMENTOPARALEITURALABIAL == 'Sim');

            this.urlImage = this.curso.URLIMAGEM;
          }
        });
    }

  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  criticar(): boolean {
    if (!this.frm.controls['nome'].valid) {
      this._modal.show('Nome inválido!');
      return false;
    }
    if (!this.frm.controls['descricao'].valid) {
      this._modal.show('Descrição inválida!');
      return false;
    }
    if (!this.frm.controls['gratuito'].valid) {
      this._modal.show('Gratuíto inválido!');
      return false;
    }
    if (!this.frm.controls['valor'].valid) {
      this._modal.show('Valor inválido!');
      return false;
    }
    if (!this.frm.controls['urlimagem'].valid) {
      this._modal.show('Url imagem inválida!');
      return false;
    }

    if (!this.frm.valid) {
      this._modal.show('Dados incorretos!');
      return false;
    }

    return true;
  }

  onSalvar() {
    if (this.criticar()) {
      if (this.operacao == 'Incluir') {
        const curso: Curso = {
          ID_USUARIOINSTRUTOR: localStorage.getItem('id_usuario'),
          NOME: this.frm.get('nome').value,
          DESCRICAO: this.frm.get('descricao').value,
          GRATUITO: this.frm.get('gratuito').value,
          VALOR: this.frm.get('valor').value,
          URLIMAGEM: this.frm.get('urlimagem').value,
          SITUACAO: 'Ativo',
          LIBRAS1PLANO: this.frm.get('libras1Plano').value ? "Sim" : "Não",
          LIBRAS2PLANO: this.frm.get('libras2Plano').value ? "Sim" : "Não",
          LEGENDA: this.frm.get('legenda').value ? "Sim" : "Não",
          VIDEOSEMFALA: this.frm.get('videoSemFala').value ? "Sim" : "Não",
          ENQUADRAMENTOPARALEITURALABIAL: this.frm.get('enquadramentoParaLeituraLabial').value ? "Sim" : "Não",
          ACESSIBILIDADE: this.acessibilidade(this.frm.get('libras1Plano').value ? "Sim" : "Não", 
          this.frm.get('libras2Plano').value ? "Sim" : "Não", 
          this.frm.get('legenda').value ? "Sim" : "Não", 
          this.frm.get('videoSemFala').value ? "Sim" : "Não", 
          this.frm.get('enquadramentoParaLeituraLabial').value ? "Sim" : "Não")
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
        this.curso.URLIMAGEM = this.frm.get('urlimagem').value;
        this.curso.LIBRAS1PLANO = this.frm.get('libras1Plano').value ? "Sim" : "Não";
        this.curso.LIBRAS2PLANO = this.frm.get('libras2Plano').value ? "Sim" : "Não";
        this.curso.LEGENDA = this.frm.get('legenda').value ? "Sim" : "Não";
        this.curso.VIDEOSEMFALA = this.frm.get('videoSemFala').value ? "Sim" : "Não";
        this.curso.ENQUADRAMENTOPARALEITURALABIAL = this.frm.get('enquadramentoParaLeituraLabial').value ? "Sim" : "Não";
        this.curso.ACESSIBILIDADE = this.acessibilidade(this.curso.LIBRAS1PLANO, this.curso.LIBRAS2PLANO, this.curso.LEGENDA, this.curso.VIDEOSEMFALA, this.curso.ENQUADRAMENTOPARALEITURALABIAL);
      this._cursoBaseService.update(this.curso)
          .then(result => {
            this._modal.show('Curso alterado com sucesso!')
            this._router.navigate(['/', 'cursoLista', 'Não']);
          })
          .catch(result => {
            this._modal.show('Erro ao alterar curso!' )
          });
      }
    }
  }

  onCancelar() {
    this._router.navigate(['/', 'cursoLista', 'Não']);
  }

  onBlur() {
    this.urlImage = this.frm.get('urlimagem').value;
  }

  acessibilidade(libras1Plano, libras2Plano, legenda, videoSemFala, enquadramentoParaLeituraLabial) {
    var str = "";

    if (libras1Plano && libras1Plano == "Sim") {
      str = "Libras em 1o. Plano";
    }

    if (libras2Plano && libras2Plano == "Sim") {
      if (str != "") {
        str = str + ', '
      }
      str = str + "Libras em 2o. Plano";
    }

    if (legenda && legenda == "Sim") {
      if (str != "") {
        str = str + ', '
      }
      str = str + "Legenda";
    }

    if (videoSemFala && videoSemFala == "Sim") {
      if (str != "") {
        str = str + ', '
      }
      str = str + "Vídeo sem fala";
    }

    if (enquadramentoParaLeituraLabial && enquadramentoParaLeituraLabial == "Sim") {
      if (str != "") {
        str = str + ', '
      }
      str = str + "Enquadramento para leitura labial";
    }
    
    return str;
  }

}
