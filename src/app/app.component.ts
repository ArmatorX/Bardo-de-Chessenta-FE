import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Feather from 'feather-icons';
import { Cancion, CancionService } from './services/cancion.service';
import * as $ from 'jquery';
import 'bootstrap';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    title = "Bardo de Chessenta";
    
    constructor () { }

    ngOnInit() { }

    ngAfterViewChecked() {
        (<any> $('[data-toggle="tooltip"]')).tooltip();
        Feather.replace();
    }
}
