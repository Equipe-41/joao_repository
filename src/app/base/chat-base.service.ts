import { Chat } from './../model/chat.model';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';

@Injectable()
export class ChatBaseService {

  constructor(private dbReal: AngularFireDatabase) { }

  get(id_video: string) {
    return this.dbReal.list('chat', ref => {
      return ref.orderByChild("ID_VIDEO").equalTo(id_video);
    })
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
  }

  create(entidade: Chat) {
    return this.dbReal.list('chat').push(entidade);
  }
}
