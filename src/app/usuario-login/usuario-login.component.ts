import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioBaseService } from 'app/base/usuario-base.service';
import { Usuario } from './../model/usuario.model';

@Component({
  selector: 'app-usuario-login',
  templateUrl: './usuario-login.component.html',
  styleUrls: ['./usuario-login.component.css']
})
export class UsuarioLoginComponent implements OnInit {

  constructorprivate () { }

  ngOnInit()   {


  }
}
