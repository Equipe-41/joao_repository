import { Video } from './../model/video.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Guid } from "guid-typescript";
import { map } from 'rxjs/operators';

@Injectable()
export class VideoBaseService {

    private tabela: string = 'video';

    constructor(private db: AngularFirestore) {
    }

    create(entidade: Video) {
        entidade.ID_VIDEO = Guid.create().toString();
        return this.db.collection(this.tabela).doc(entidade.ID_VIDEO).set(entidade);
    }

    update(entidade: Video) {
        return this.db.doc(this.tabela + '/' + entidade.ID_VIDEO).update(entidade);
    }

    getPesquisaCampo(campo: string, conteudo: string) {
        if (campo != '' && conteudo != '') {
            return this.db.collection(this.tabela, ref => ref.where('SITUACAO', '==', 'Ativo').where(campo, '==', conteudo))
            .snapshotChanges().pipe(
                map(changes => {
                    return changes.map(p => ({ id: p.payload.doc.id, ...p.payload.doc.data() as Video }));
                })
            );
        } else {
            return this.db.collection(this.tabela, ref => ref.where('SITUACAO', '==', 'Ativo'))
            .snapshotChanges().pipe(
                map(changes => {
                    return changes.map(p => ({ id: p.payload.doc.id, ...p.payload.doc.data() as Video }));
                })
            );
        }

    }

}
