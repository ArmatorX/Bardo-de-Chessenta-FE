import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Feather from 'feather-icons';
import { Cancion, CancionService } from './services/cancion.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    canciones : Cancion[] = [];
    title = 'Bardo de Chessenta';

    constructor (private servicio : CancionService, private router : Router, private route: ActivatedRoute) { }

    ngOnInit(): void { 
        this.getCanciones(0);
    }

    ngAfterViewChecked() {
        Feather.replace();
    }

    getCanciones(nroPagina : number) {
        let params = new HttpParams();

        params = params.append('page', nroPagina.toString());
        
        this.servicio.get(params).subscribe(respuesta => {
            this.canciones = respuesta.content;
        });
    }

    reproducir(cancionId : number) {
        this.servicio.reproducir(cancionId).subscribe();
    }
}
