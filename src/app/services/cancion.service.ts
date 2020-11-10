import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlService } from './api/url.service';
import { EmocionEspecifica, EmocionGeneral } from './emocion.service';
import { Lugar } from './lugar.service';

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

    buscarCancionSimple(txtBuscar? : string, emocionGeneral? : EmocionGeneral, emocionEspecifica? : EmocionEspecifica) : Observable<any> {
        let params = new HttpParams();
        if (txtBuscar != null) {
            params = params.append('busqueda', txtBuscar);
        }

        if (emocionEspecifica != null) {
            params = params.append('emocionEspecifica', emocionEspecifica.id.toString());
        } else {
            if (emocionGeneral != null) {
                params = params.append('emocionGeneral', emocionGeneral.id.toString());
            }
        }

        return this._http.get<Cancion[]>(this._url.getUrlBaseCancion(), {params : params});
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