import { Component } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    public deseosService: DeseosService,
    private _alertController: AlertController,
    private _router: Router
  ) { }

  async newList() {
    // this._router.navigateByUrl('/tabs/tab1/agregar');
    const alert = await this._alertController .create({
      header: 'Nueva Lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => console.log('cancelar')
        },
        {
          text: 'Agregar',
          handler: data => {
            if (data['titulo'].length === 0) return;
            const list = this.deseosService.setList(data['titulo']);
            this._router.navigateByUrl(`/tabs/tab1/agregar/${ list.id }`);
          },
        }
      ]
    });

    await alert.present();
  }
}
