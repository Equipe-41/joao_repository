import { Curso } from './../model/curso.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference } from '@angular/fire/firestore';
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
        return this.db.collection(this.tabela, ref => {
            let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
            query = query.where('SITUACAO', '==', 'Ativo')
            if (campo != '') { query = query.where(campo, '==', conteudo) };
            return query;
        })
            .snapshotChanges().pipe(
                map(changes => {
                    return changes.map(p => ({ id: p.payload.doc.id, ...p.payload.doc.data() as Curso }));
                })
            );
    }

    getPesquisa(campo: string, conteudo: string, descricao: string, libras1Plano: string, libras2Plano: string, legenda: string, videoSemFala: string, enquadramentoParaLeituraLabial: string) {
        return this.db.collection(this.tabela, ref => {
            let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
            query = query.where('SITUACAO', '==', 'Ativo')
            if (descricao != '') { query = query.where("DESCRICAO", '>=', descricao).where("DESCRICAO", '<=', descricao + '\uf8ff') };
            if (campo != '') { query = query.where(campo, '==', conteudo) };
            if (libras1Plano == 'Sim') { query = query.where('LIBRAS1PLANO', '==', libras1Plano) };
            if (libras2Plano == 'Sim') { query = query.where('LIBRAS2PLANO', '==', libras2Plano) };
            if (legenda == 'Sim') { query = query.where('LEGENDA', '==', legenda) };
            if (videoSemFala == 'Sim') { query = query.where('VIDEOSEMFALA', '==', videoSemFala) };
            if (enquadramentoParaLeituraLabial == 'Sim') { query = query.where('ENQUADRAMENTOPARALEITURALABIAL', '==', enquadramentoParaLeituraLabial) };
            return query;
        })
            .snapshotChanges().pipe(
                map(changes => {
                    return changes.map(p => ({ id: p.payload.doc.id, ...p.payload.doc.data() as Curso }));
                })
            );
    }

}
