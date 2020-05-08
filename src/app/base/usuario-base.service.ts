import { Usuario } from './../model/usuario.model';
import { Injectable } from '@angular/core';

@Injectable()
export class UsuarioBaseService {

    private tabela: Usuario[];

    constructor() {

        this.tabela = [
            { ID_USUARIO: "1", NOME: "JOAO", EMAIL: "JOAO@FICR.EDU.BR", SENHA: "123", TIPO: "ALUNO" },
            { ID_USUARIO: "2", NOME: "DANIEL", EMAIL: "DANIEL@FICR.EDU.BR", SENHA: "123", TIPO: "INSTRUTOR" },
            { ID_USUARIO: "3", NOME: "VICTOR", EMAIL: "VICTOR@FICR.EDU.BR", SENHA: "123", TIPO: "INTERPRETE" }
    ];

    }

    list(): Usuario[] {
        return this.tabela;
    }

    get(id: string): Usuario {
       return this.tabela.find(i => i.ID_USUARIO == id);
    }

    getAutenticar(email: string, senha: string): Usuario {
        return this.tabela.find(i => i.EMAIL == email && i.SENHA == senha);
     }
 
     create(entidade: Usuario) {

    }

    update(entidade: Usuario) {

    }

}
