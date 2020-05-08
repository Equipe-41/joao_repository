import { Component, OnInit } from '@angular/core';
import { Curso } from 'app/model/curso.model';
import { ActivatedRoute } from '@angular/router';
import { CursoBaseService } from 'app/base/curso-base.service';

@Component({
  selector: 'app-curso-comprar',
  templateUrl: './curso-comprar.component.html',
  styleUrls: ['./curso-comprar.component.css']
})
export class CursoComprarComponent implements OnInit {

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
