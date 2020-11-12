import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cancion, CancionService } from 'src/app/services/cancion.service';
import { Modo } from '../formulario-cancion/formulario-cancion.component';

@Component({
  selector: 'app-consultar-cancion',
  templateUrl: './consultar-cancion.component.html',
  styleUrls: ['./consultar-cancion.component.css']
})
export class ConsultarCancionComponent implements OnInit {
    modo : Modo;
    cancion : Cancion;

    constructor(
        private activatedRoute : ActivatedRoute,
        private servicio : CancionService) {}

    ngOnInit(): void {
        const cancionId = parseInt(this.activatedRoute.snapshot.paramMap.get("id"));
            
        if (cancionId != null) {
            this.servicio.buscarPorId(cancionId).subscribe(respuesta => {
                this.cancion = respuesta;
                this.modo = Modo.CONSULTAR;
            });
        }
    }
}
