import { Component, NgZone } from '@angular/core'
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { NextPage } from '../NextPage/NextPage';
import { Kontakte } from '../Contacts/contacts';
import { document } from "@angular/platform-browser/src/facade/browser";
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  batterystatus: string;
  winOrientation: string;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public zone: NgZone, public toastCtrl: ToastController) {
    this.batterystatus = "unbekannt";
    this.winOrientation = "unbekannt";
    zone.runOutsideAngular(() => {
      window.addEventListener("batterystatus", (status) => {
        let laden = "";
        if (status["isPlugged"] === true) {
          laden = "Wird geladen.";
        } else {
          laden = "Wird nicht geladen.";
        }
        this.batterystatus = status["level"] + "% " + laden;
      }, false);
    });
    zone.runOutsideAngular(() => {
      window.addEventListener('orientationchange', (doOnOrientationChange) =>  {
        let screenOrientation = screen["orientation"];
        if (screenOrientation.type === 'landscape-primary') {
          this.winOrientation = "Landscape";
        } else {
          this.winOrientation = "Portrait";
        }
        this.presentToast(this.winOrientation);
      });
    });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  showAlert(msg) {
    let alert = this.alertCtrl.create({
      title: msg,
      //subTitle: '',
      buttons: ['OK']
    });
    alert.present();
  }

  navToPage(page) {
    if (page === "NextPage") this.navCtrl.push(NextPage);
    if (page === "Kontakte") this.navCtrl.push(Kontakte);
  }

}
