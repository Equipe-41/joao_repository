import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ModalService {

  confirmResult: Subject<boolean>;
  
  constructor( ) {
    this.confirmResult = new Subject();
  }

  show(message: string) {
    let titleElem : HTMLElement = document.getElementById('titleModalAlert') as HTMLElement;
    titleElem.innerText = "Atenção";
    let messageElem: HTMLElement = document.getElementById('mensageModalAlert') as HTMLElement;
    messageElem.innerText = message;
    let elementBtn: HTMLElement = document.getElementById('btnModalAlert') as HTMLElement;
    elementBtn.click();
  }

  confirm(message: string, simTxt?: string, naoTxt?: string) {
    let titleElem : HTMLElement = document.getElementById('titleModalConfirm') as HTMLElement;
    titleElem.innerText = "Atenção";
    let messageElem: HTMLElement = document.getElementById('mensageModalConfirm') as HTMLElement;
    messageElem.innerText = message;

    if (simTxt) {
      let simElem: HTMLElement = document.getElementById('simModalConfirm') as HTMLElement;
      simElem.innerText = simTxt;
      }

    if (naoTxt) {
      let naoElem: HTMLElement = document.getElementById('naoModalConfirm') as HTMLElement;
      naoElem.innerText = naoTxt;
    }


    let elementBtn: HTMLElement = document.getElementById('btnModalConfirm') as HTMLElement;
    elementBtn.click();

    let elementSim: HTMLElement = document.getElementById('simModalConfirm') as HTMLElement;
    elementSim.addEventListener("click", (e:Event) => this.onConfirm());

    return this.confirmResult;
    
  }

  onConfirm() {
    this.confirmResult.next(true);
  }

}
