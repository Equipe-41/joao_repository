import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario-esqueci',
  templateUrl: './usuario-esqueci.component.html',
  styleUrls: ['./usuario-esqueci.component.css']
})
export class UsuarioEsqueciComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    this.configMenuOff();
    
  }

  configMenuOff() {
    var menu = document.getElementsByClassName("opcaoMenu");
    menu[0].setAttribute("style", "display: none !important;");
    menu[1].setAttribute("style", "display: none !important;");
  }

}
