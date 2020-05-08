import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Curso } from 'app/model/curso.model';
import { CursoBaseService } from 'app/base/curso-base.service';

@Component({
  selector: 'app-curso-detalhe',
  templateUrl: './curso-detalhe.component.html',
  styleUrls: ['./curso-detalhe.component.css']
})
export class CursoDetalheComponent implements OnInit {

  public id_curso : string;
  curso: Curso;

  constructor(private route: ActivatedRoute,
    private _cursoBaseService: CursoBaseService) {
    this.route.params.subscribe(params => this.id_curso = params['id']);

    this.curso = _cursoBaseService.get(this.id_curso);

   }

  ngOnInit() {
  }

}
