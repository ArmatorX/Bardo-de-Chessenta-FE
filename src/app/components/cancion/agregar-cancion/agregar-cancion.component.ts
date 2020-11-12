import { Component, OnInit } from '@angular/core';
import { Modo } from '../formulario-cancion/formulario-cancion.component';

@Component({
  selector: 'app-agregar-cancion',
  templateUrl: './agregar-cancion.component.html',
  styleUrls: ['./agregar-cancion.component.css']
})
export class AgregarCancionComponent implements OnInit {
    modo : Modo;

    constructor() {}

    ngOnInit() {
        this.modo = Modo.CREAR;
    }
}
