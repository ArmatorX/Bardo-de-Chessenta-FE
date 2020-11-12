import { Component, enableProdMode, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import $ from 'jquery';
import 'bootstrap';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    title = "Bardo de Chessenta";
    
    constructor () { }

    ngOnInit() { 
        //enableProdMode();
    }

    ngAfterViewChecked() {
        $('[data-toggle="tooltip"]').tooltip();
        Feather.replace(); 
    }
}
