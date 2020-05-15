import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TokenService } from 'app/service/token.service';
import { ModalService } from 'app/service/modal.service';
import { Router, Route } from '@angular/router';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {

  title = 'EAD Inclusivo';

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  onLogout() {
    localStorage.setItem('id_usuario', '');
    localStorage.setItem('nome', '');
    localStorage.setItem('tipo', '');
    localStorage.setItem('token', '');

    this._router.navigate(['/', 'usuarioLogin']);

  }

}
