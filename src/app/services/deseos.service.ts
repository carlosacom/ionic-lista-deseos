import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {
  listas: Lista[];
  constructor() {
    this.loadStorage();
  }

  setList(title: string) {
    const list = new Lista(title);
    this.listas.push(list);
    this.saveStorage();
    return list;
  }

  getList(id: string | number): Lista {
    id = Number(id);
    return this.listas.find( listaData => listaData.id === id);

  }

  deleteList(list: Lista) {
    this.listas = this.listas.filter(data => data.id !== list.id);
    this.saveStorage();
  }

  saveStorage = () =>  localStorage.setItem('lista', JSON.stringify(this.listas));

  loadStorage() {
    this.listas = JSON.parse(localStorage.getItem('lista'));
    if (!this.listas) this.listas = []; 
  }
}
