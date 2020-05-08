import { Component, OnInit } from '@angular/core';
import { CursoBaseService } from 'app/base/curso-base.service';
import { Curso } from './../model/curso.model';

@Component({
  selector: 'app-curso-lista',
  templateUrl: './curso-lista.component.html',
  styleUrls: ['./curso-lista.component.css']
})
export class CursoListaComponent implements OnInit {

  listaCurso: Curso[];
  constructor(private _cursoBaseService: CursoBaseService) {


  }

  ngOnInit() {

    this.listaCurso = this._cursoBaseService.list();

  }

}
