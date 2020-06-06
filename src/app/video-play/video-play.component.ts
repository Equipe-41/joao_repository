import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Video } from '../model/video.model';
import { VideoBaseService } from '../base/video-base.service';
import { TokenService } from '../service/token.service';
import { ModalService } from '../service/modal.service';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video-play',
  templateUrl: './video-play.component.html',
  styleUrls: ['./video-play.component.css']
})
export class VideoPlayComponent implements OnInit {

  public id_video: string;
  video: Video = {
    ID_VIDEO: "",
    ID_CURSO: "",
    NOME: "",
    DESCRICAO: "",
    SITUACAO: "",
    URLIMAGEM: "",
    URLVIDEO: ""
  };
  sub: Subscription;

  constructor(private _activatedRoute: ActivatedRoute,
    private _videoBaseService: VideoBaseService,
    private _token: TokenService,
    private _modal: ModalService,
    private _router: Router,
    private sanitizer: DomSanitizer) {

    this._activatedRoute.params.subscribe(params => this.id_video = params['id']);

    localStorage.setItem('id_video', this.id_video);

    this.sub = this._videoBaseService.getPesquisaCampo('ID_VIDEO', this.id_video)
      .subscribe((consultas: Video[]) => {

        if (consultas && consultas.length > 0) {
          this.video = consultas[0];
          var frameList = document.getElementsByClassName("frameVideo");
          var frame = <HTMLElement>frameList[0];
          frame.setAttribute("src", this.video.URLVIDEO);
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
