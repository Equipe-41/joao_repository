import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {

  title = 'EAD Inclusivo';

  constructor() { }

  ngOnInit() {
  }

 // ngAfterViewInit(): void {
    // , AfterViewInit
    //setTimeout( function() {
    //  var elem = document.querySelector('.sidenav');
    //  var instance = M.Sidenav.init(elem, options);
    //}, 0)
  //}
}
