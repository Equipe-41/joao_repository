import { Matricula } from './../model/matricula.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Guid } from "guid-typescript";
import { map } from 'rxjs/operators';

@Injectable()
export class MatriculaBaseService {

    private tabela: string = 'matricula';

    constructor(private db: AngularFirestore) {
    }

    create(entidade: Matricula) {
        entidade.ID_MATRICULA = Guid.create().toString();
        return this.db.collection(this.tabela).doc(entidade.ID_MATRICULA).set(entidade);
    }

    getPesquisaCampo(campo: string, conteudo: string) {
        if (campo != '' && conteudo != '') {
            return this.db.collection(this.tabela, ref => ref.where(campo, '==', conteudo))
            .snapshotChanges().pipe(
                map(changes => {
                    return changes.map(p => ({ id: p.payload.doc.id, ...p.payload.doc.data() as Matricula }));
                })
            );
        } else {
            return this.db.collection(this.tabela)
            .snapshotChanges().pipe(
                map(changes => {
                    return changes.map(p => ({ id: p.payload.doc.id, ...p.payload.doc.data() as Matricula }));
                })
            );
        }

    }

}
