import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cancion, CancionService } from 'src/app/services/cancion.service';

@Component({
  selector: 'app-buscar-cancion',
  templateUrl: './buscar-cancion.component.html',
  styleUrls: ['./buscar-cancion.component.css']
})
export class BuscarCancionComponent implements OnInit {
    
    canciones : Cancion[] = [];

    constructor (
        private servicio : CancionService,
        private router : Router,
        private route: ActivatedRoute) { }

    ngOnInit(): void { 
        this.getCanciones(0).subscribe(respuesta => {
            this.canciones = respuesta.content;
        });
    }

    getCanciones(nroPagina : number) : Observable<any> {
        let params = new HttpParams();

        params = params.append('page', nroPagina.toString());
        
        return this.servicio.getCanciones(params);
    }

    reproducir(cancionId : number) {
        this.servicio.reproducir(cancionId).subscribe();
    }

}
