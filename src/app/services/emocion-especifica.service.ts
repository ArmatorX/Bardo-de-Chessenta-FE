import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmocionEspecificaService {

  constructor() { }
}

export interface EmocionEspecifica {
    id? : number;
    nombre : string;
}