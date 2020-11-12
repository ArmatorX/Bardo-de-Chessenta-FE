import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlService } from './api/url.service';

@Injectable({
  providedIn: 'root'
})
export class LugarService {
    private lugares : Lugar[] = [];

    constructor(private _http : HttpClient, private _url : UrlService) { }
    
    getLugares() : Observable<Lugar[]> {
        return this._http.get<Lugar[]>(this._url.getUrlBaseLugar());
    }
}

export interface Lugar {
    id? : number;
    nombre : string;
}

export const LUGAR_VACIO : Lugar = {
    id : -1,
    nombre : ''
}