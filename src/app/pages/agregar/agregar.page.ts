import { Component, OnInit } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { ListaItem } from '../../models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista;
  itemName: string;
  constructor(
    public deseosService: DeseosService,
    private _activatedRoute: ActivatedRoute
  ) {
    const id = this._activatedRoute.snapshot.paramMap.get('id');
    this.lista = this.deseosService.getList(id);
    console.log(this.lista);
  }

  ngOnInit() {
  }

  addItem() {
    if (this.itemName.length === 0) return;
    const itemNew = new ListaItem(this.itemName);
    this.lista.items.push(itemNew);
    this.itemName = '';
    this.deseosService.saveStorage();
  }

  changeCheck(item: ListaItem) {
    const pending = this.lista.items.filter(itemData => !itemData.completado).length;
    console.log({ pending });
    if (pending === 0) {
      this.lista.finish = true;
      this.lista.finished_at =  new Date();
    } else {
      this.lista.finish = false;
      this.lista.finished_at = null;
    }
    this.deseosService.saveStorage();
  }

  delete(position: number) {
    this.lista.items.splice(position, 1);
    this.deseosService.saveStorage();
  }
}
