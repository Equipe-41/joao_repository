import { Component, OnInit } from '@angular/core';
import { TokenService } from 'app/service/token.service';
import { ModalService } from 'app/service/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private _token: TokenService,
    private _modal: ModalService,
    private _router: Router) { }

  ngOnInit() {

    this._token.autenticar(this._modal, this._router, true)

  }

}
