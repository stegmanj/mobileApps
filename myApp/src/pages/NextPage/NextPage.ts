import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { document } from "@angular/platform-browser/src/facade/browser";
import { Base64ToGallery } from 'ionic-native';
import { SocialSharing } from 'ionic-native';
import { ToastController } from 'ionic-angular';

@Component({
  templateUrl: 'NextPage.html'
})
export class NextPage {

  public base64Image: string;
  public base64String: string;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public toastCtrl: ToastController) {

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

  callCamera(options) {
    Camera.getPicture(options)
      .then((imageData) => {
        // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
        this.base64String = imageData;
        document.getElementById("picture").src = this.base64Image;
      }, (err) => {
        console.log(err);
      });
  }

  getPicture() {
    let options = {
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      quality: 100,
      targetWidth: 500,
      targetHeight: 500
    };

    this.callCamera(options);
  }

  takePicture() {
    let options = {
      destinationType: Camera.DestinationType.DATA_URL,
      //saveToPhotoAlbum: true,
      allowEdit: true,
      quality: 100,
      targetWidth: 500,
      targetHeight: 500
    };

    this.callCamera(options);
  } 

  saveToGalery() {
    Base64ToGallery.base64ToGallery(this.base64String, 'img_').then(
      res => {this.presentToast("Foto gespeichert!"); console.log(this)},
      err => this.showAlert(err),
    );
  }

  share() {
    SocialSharing.share(null, null, this.base64Image, null).then(() => {
    }).catch((err) => {
      alert(err)
    });
  }

  remove() {
    this.base64Image = "";
    this.base64String = "";
    document.getElementById("picture").src = "//:0";
  }

}
