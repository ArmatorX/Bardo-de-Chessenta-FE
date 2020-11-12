import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlService } from './api/url.service';
import { EmocionEspecifica, EmocionGeneral, EMOCION_ESPECIFICA_VACIA } from './emocion.service';
import { Lugar, LUGAR_VACIO } from './lugar.service';

@Injectable({
  providedIn: 'root'
})
export class CancionService {
    private canciones : Cancion[] = [];

    constructor(private _http : HttpClient, private _url : UrlService) { }

    getCanciones(nroPagina : number) : Observable<any> {
        let params = new HttpParams();

        params = params.append('page', nroPagina.toString());
        params = params.append('size', '10');
        
        return this._http.get<Cancion[]>(this._url.getUrlBaseCancion(), {params : params});
    }

    reproducir(cancion : Cancion) : any {
        return this._http.get<any>(this._url.getUrlBaseReproductor() + cancion.id.toString());
    }
    
    guardarCancion(cancion : Cancion) : Observable<any> {
        return this._http.post<Cancion[]>(this._url.getUrlBaseCancion(), cancion);
    }

    borrarCancion(cancion : Cancion) : Observable<any> {
        return this._http.delete(this._url.getUrlBaseCancion() + cancion.id.toString())
    }

    getCancionById(id : number) : Observable<Cancion> {
        return this._http.get<Cancion>(this._url.getUrlBaseCancion() + id.toString());
    }

    buscarCancionSimple(nroPagina : number, txtBuscar? : string, emocionGeneral? : EmocionGeneral, emocionEspecifica? : EmocionEspecifica) : Observable<any> {
        let params = new HttpParams();

        params = params.append('page', nroPagina.toString());
        params = params.append('size', '10');

        if (txtBuscar != null) {
            params = params.append('busqueda', txtBuscar);
        }

        if (emocionEspecifica != null) {
            params = params.append('emocionEspecifica', emocionEspecifica.id.toString());
        } else if (emocionGeneral != null) {
            params = params.append('emocionGeneral', emocionGeneral.id.toString());
        }

        return this._http.get<Cancion[]>(this._url.getUrlBaseCancion(), {params : params});
    }

    verificarConexionBot() : Observable<boolean> {
        return this._http.get<boolean>(this._url.getUrlBaseCancion() + "estado-bot/")
    }
}

export interface Cancion {
    id? : number;
    nombre : string;
    link : string;
    origen : string;
    emocion : EmocionEspecifica;
    lugar : Lugar;
    extras : string;
}

export const CANCION_VACIA : Cancion = {
    id : -1,
    nombre : '',
    link : '',
    origen : '',
    emocion : EMOCION_ESPECIFICA_VACIA,
    lugar : LUGAR_VACIO,
    extras : ''
};