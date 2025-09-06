import { Injectable } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {}

  //  Mostrar Toast
  async showToast(
    message: string,
    color: string = 'primary',
    duration: number = 3000
  ) {
    const toast = await this.toastCtrl.create({
      message,
      duration,
      position: 'bottom',
      color,
    });
    await toast.present();
  }

  //  Atajo para éxito
  success(message: string) {
    return this.showToast(message, 'success');
  }

  //  Atajo para error
  error(message: string) {
    return this.showToast(message, 'danger');
  }

  //  Atajo para advertencia
  warning(message: string) {
    return this.showToast(message, 'warning');
  }

  //  Mostrar Alert (para confirmaciones)
  async showAlert(header: string, message: string, buttons: any[] = ['OK']) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons,
    });
    await alert.present();
  }
}
