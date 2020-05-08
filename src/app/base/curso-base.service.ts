import { Curso } from './../model/curso.model';
import { Injectable } from '@angular/core';

@Injectable()
export class CursoBaseService {

    private tabela: Curso[];

    constructor() {

        this.tabela = [
            { ID_CURSO: "1", DESCRICAO: "Ângular 1", NOME: "Ângular 1", GRATUITO: "SIM", VALOR: 0 }, 
            { ID_CURSO: "2", DESCRICAO: "Ângular 2", NOME: "Ângular 2", GRATUITO: "NAO", VALOR: 100 },
            { ID_CURSO: "3", DESCRICAO: "Ângular 3", NOME: "Ângular 3", GRATUITO: "NAO", VALOR: 100 },
            { ID_CURSO: "4", DESCRICAO: "Ângular 4", NOME: "Ângular 4", GRATUITO: "NAO", VALOR: 100 },
            { ID_CURSO: "5", DESCRICAO: "Ângular 5", NOME: "Ângular 5", GRATUITO: "NAO", VALOR: 100 },
            { ID_CURSO: "6", DESCRICAO: "Ângular 6", NOME: "Ângular 6", GRATUITO: "NAO", VALOR: 100 }
        ];

    }

    list(): Curso[] {
        return this.tabela;
    }

    get(id: string): Curso {
       return this.tabela.find(i => i.ID_CURSO == id);
    }

    create(entidade: Curso) {

    }

    update(entidade: Curso) {

    }

}
