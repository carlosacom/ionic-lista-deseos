import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
  @Input() terminada = false;
  @ViewChild( IonList ) lista: IonList;
  constructor(
    public deseosService: DeseosService,
    private _router: Router,
    private _alertController: AlertController,
  ) { }

  ngOnInit() {}

  listaDetail(id: number) {
    const url = (this.terminada) ? `/tabs/tab2/agregar/${ id }` : `/tabs/tab1/agregar/${ id }` ;
    this._router.navigateByUrl(url);
  }

  async edit(lista: Lista) {
    console.log(lista);
    const alert = await this._alertController .create({
      header: 'Editar Lista',
      inputs: [
        {
          name: 'titulo',
          value: lista.title,
          type: 'text',
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => this.lista.closeSlidingItems()
        },
        {
          text: 'Editar',
          handler: data => {
            if (data['titulo'].length === 0) return;
            this.deseosService.listas.find(list => list.id === lista.id).title = data.titulo;
            this.deseosService.saveStorage();
            this.lista.closeSlidingItems();
          },
        }
      ]
    });
    await alert.present();
  }
  delete = list => this.deseosService.deleteList(list);
  
}
