import { Usuario } from './../model/usuario.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Guid } from "guid-typescript";
import { map } from 'rxjs/operators';

@Injectable()
export class UsuarioBaseService {

    private tabela: string = 'usuario';

    constructor(private db: AngularFirestore) {
    }

    create(entidade: Usuario) {
        entidade.ID_USUARIO = Guid.create().toString();
        return this.db.collection(this.tabela).doc(entidade.ID_USUARIO).set(entidade);
    }

    update(entidade: Usuario) {
        return this.db.doc(this.tabela + '/' + entidade.ID_USUARIO).update(entidade);
    }

    getPesquisaCampo(campo: string, conteudo: string) {
        if (campo != '' && conteudo != '') {
            return this.db.collection(this.tabela, ref => ref.where('SITUACAO', '==', 'Ativo').where(campo, '==', conteudo))
                .snapshotChanges().pipe(
                    map(changes => {
                        return changes.map(p => ({ id: p.payload.doc.id, ...p.payload.doc.data() as Usuario }));
                    })
                );
        } else {
            return this.db.collection(this.tabela, ref => ref.where('SITUACAO', '==', 'Ativo'))
                .snapshotChanges().pipe(
                    map(changes => {
                        return changes.map(p => ({ id: p.payload.doc.id, ...p.payload.doc.data() as Usuario }));
                    })
                );
        }
    }

    getAutenticar(email: string, senha: string) {
        return this.db.collection(this.tabela, ref => ref.where('SITUACAO', '==', 'Ativo').where('EMAIL', '==', email).where('SENHA', '==', senha))
            .snapshotChanges().pipe(
                map(changes => {
                    return changes.map(p => ({ id: p.payload.doc.id, ...p.payload.doc.data() as Usuario }));
                })
            );
    }

}
