import { Component, OnInit } from '@angular/core';
import { CursoBaseService } from '../base/curso-base.service';
import { VideoBaseService } from '../base/video-base.service';
import { Curso } from './../model/curso.model';
import { TokenService } from '../service/token.service';
import { ModalService } from '../service/modal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Video } from '../model/video.model';

@Component({
  selector: 'app-video-lista',
  templateUrl: './video-lista.component.html',
  styleUrls: ['./video-lista.component.css']
})
export class VideoListaComponent implements OnInit {

  tipoUsuario: string = localStorage.getItem('tipo');
  id_curso: string;
  curso: Curso = {
    DESCRICAO: "",
    ID_CURSO: "",
    URLIMAGEM: "",
    NOME: "",
    ID_USUARIOINSTRUTOR: "",
    GRATUITO: "",
    VALOR: 0,
    SITUACAO: "",
    LIBRAS1PLANO: "Não",
    LIBRAS2PLANO: "Não",
    LEGENDA: "Não",
    VIDEOSEMFALA: "Não",
    ENQUADRAMENTOPARALEITURALABIAL: "Não",
    ACESSIBILIDADE: ""
  };
  
  sub: Subscription;
  subCurso: Subscription;
  listaVideo: Video[];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _cursoBaseService: CursoBaseService,
    private _videoBaseService: VideoBaseService,
    private _token: TokenService,
    private _modal: ModalService,
    private _router: Router) {

      this._activatedRoute.params.subscribe(params => this.id_curso = params['id']);

  }

  ngOnInit() {

    this._token.autenticar(this._modal, this._router, true)

    this.subCurso = this._cursoBaseService.getPesquisaCampo('ID_CURSO', this.id_curso)
      .subscribe((consultas: Curso[]) => {
        if (consultas && consultas.length > 0) {
          this.curso = consultas[0];
        }
      });

    this.sub = this._videoBaseService.getPesquisaCampo('ID_CURSO', this.id_curso)
      .subscribe((consultas: Video[]) => {

        this.listaVideo = [];
        if (consultas && consultas.length > 0) {
          this.listaVideo = consultas;
        }
      });

  }

  ngOnDestroy() {
    if (this.subCurso) {
      this.subCurso.unsubscribe();
    }
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onExcluir(id) {
    const video = this.listaVideo.find(i => i.ID_VIDEO == id);
    if (video != null) {
      this._modal.confirm('Confirma a exclusão do vídeo?')
        .subscribe(result => {
          video.SITUACAO = 'Inativo';
          this._videoBaseService.update(video)
            .then(result => {
              this._modal.show('Vídeo excluído com sucesso!')
            })
            .catch(result => {
              this._modal.show('Erro ao excluir video');
            })
        })
    }
  }

}
