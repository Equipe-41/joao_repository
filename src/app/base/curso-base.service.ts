import { Curso } from './../model/curso.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Guid } from "guid-typescript";
import { map } from 'rxjs/operators';

@Injectable()
export class CursoBaseService {

    private tabela: string = 'curso';

    constructor(private db: AngularFirestore) {
    }

    create(entidade: Curso) {
        entidade.ID_CURSO = Guid.create().toString();
        return this.db.collection(this.tabela).doc(entidade.ID_CURSO).set(entidade);
    }

    update(entidade: Curso) {
        return this.db.doc(this.tabela + '/' + entidade.ID_CURSO).update(entidade);
    }

    getPesquisaCampo(campo: string, conteudo: string) {
        if (campo != '' && conteudo != '') {
            return this.db.collection(this.tabela, ref => ref.where('SITUACAO', '==', 'Ativo').where(campo, '==', conteudo))
            .snapshotChanges().pipe(
                map(changes => {
                    return changes.map(p => ({ id: p.payload.doc.id, ...p.payload.doc.data() as Curso }));
                })
            );
        } else {
            return this.db.collection(this.tabela, ref => ref.where('SITUACAO', '==', 'Ativo'))
            .snapshotChanges().pipe(
                map(changes => {
                    return changes.map(p => ({ id: p.payload.doc.id, ...p.payload.doc.data() as Curso }));
                })
            );
        }

    }

}
