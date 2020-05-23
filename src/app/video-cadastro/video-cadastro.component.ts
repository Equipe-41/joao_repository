import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Video } from '../model/video.model';
import { ActivatedRoute, Route } from '@angular/router';
import { VideoBaseService } from '../base/video-base.service';
import { TokenService } from '../service/token.service';
import { ModalService } from '../service/modal.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { storage } from 'firebase';

@Component({
  selector: 'app-video-cadastro',
  templateUrl: './video-cadastro.component.html',
  styleUrls: ['./video-cadastro.component.css']
})
export class VideoCadastroComponent implements OnInit, OnDestroy {

  public id_curso: string;
  public id_video: string;
  public operacao: string;
  private video: Video;
  private sub: Subscription;
  public frm: FormGroup;

  @Input() urlImage: string = "";

  constructor(
    private frmBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _videoBaseService: VideoBaseService,
    private _token: TokenService,
    private _modal: ModalService,
    private _router: Router) {

    this._activatedRoute.params.subscribe(params => this.id_curso = params['id_curso']);
    this._activatedRoute.params.subscribe(params => this.id_video = params['id']);
    this._activatedRoute.params.subscribe(params => this.operacao = params['operacao']);

  }

  ngOnInit() {

    this._token.autenticar(this._modal, this._router, true)

    this.frm = this.frmBuilder.group({
      nome: ['', [Validators.required, Validators.maxLength(100)]],
      descricao: ['', [Validators.required, Validators.maxLength(100)]],
      interprete: ['Não', [Validators.required]],
      urlvideo: ['', [Validators.required]],
      urlimagem: ['', [Validators.required]],
    });

    if (this.operacao != 'Incluir') {
      this.sub = this._videoBaseService.getPesquisaCampo('ID_VIDEO', this.id_video)
        .subscribe((consultas: Video[]) => {

          if (consultas && consultas.length > 0) {
            this.video = consultas[0];
            this.frm.controls['nome'].setValue(this.video.NOME);
            this.frm.controls['descricao'].setValue(this.video.DESCRICAO);
            this.frm.controls['interprete'].setValue(this.video.ID_USUARIOINTERPRETE);
            this.frm.controls['urlvideo'].setValue(this.video.URLVIDEO);
            this.frm.controls['urlimagem'].setValue(this.video.URLIMAGEM);

            this.urlImage = this.video.URLIMAGEM;
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
    if (!this.frm.controls['interprete'].valid) {
      this._modal.show('Interprete inválido!');
      return false;
    }
    if (!this.frm.controls['urlvideo'].valid) {
      this._modal.show('Url vídeo inválido!');
      return false;
    }
    if (!this.frm.controls['urlimagem'].valid) {
      this._modal.show('Url imagem inválida!');
      return false;
    }

    if (!this.frm.valid) {
      console.log(this.frm.value)
      this._modal.show('Dados incorretos!');
      return false;
    }

    return true;
  }

  onSalvar() {
    if (this.criticar()) {
      if (this.operacao == 'Incluir') {
        const video: Video = {
          ID_CURSO: this.id_curso,
          NOME: this.frm.get('nome').value,
          DESCRICAO: this.frm.get('descricao').value,
          ID_USUARIOINTERPRETE: this.frm.get('interprete').value,
          URLVIDEO: this.frm.get('urlvideo').value,
          URLIMAGEM: this.frm.get('urlimagem').value,
          SITUACAO: 'Ativo'
        }
        this._videoBaseService.create(video)
          .then(result => {
            this._modal.show('Vídeo cadastrado com sucesso!')
            this._router.navigate(['/', 'videoLista', this.id_curso]);
          })
          .catch(result => {
            this._modal.show('Erro ao cadastrar curso!')
          });
      } else {
        this.video.NOME = this.frm.get('nome').value;
        this.video.DESCRICAO = this.frm.get('descricao').value;
        this.video.ID_USUARIOINTERPRETE = this.frm.get('interprete').value;
        this.video.URLVIDEO = this.frm.get('urlvideo').value;
        this.video.URLIMAGEM = this.frm.get('urlimagem').value;
        this._videoBaseService.update(this.video)
          .then(result => {
            this._modal.show('Vídeo alterado com sucesso!')
            this._router.navigate(['/', 'videoLista', this.id_curso]);
          })
          .catch(result => {
            this._modal.show('Erro ao alterar vídeo!')
          });
      }
    }
  }

  onCancelar() {
    this._router.navigate(['/', 'videoLista', this.id_curso]);
  }

  onBlur() {
    this.urlImage = this.frm.get('urlimagem').value;
  }
}
