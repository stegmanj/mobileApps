import { Component, NgZone } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { document } from "@angular/platform-browser/src/facade/browser";
import { Base64ToGallery } from 'ionic-native';
import { SocialSharing } from 'ionic-native';
import { ToastController } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName } from 'ionic-native';

@Component({
    selector: 'page-contacts',
    templateUrl: 'contacts.html'
})
export class Kontakte {

    vorname: string;
    nachname: string;
    hnummer: string;

    constructor(public toastCtrl: ToastController) {
    }

    createContact() {
        let contact: Contact = Contacts.create();
        contact.name = new ContactName(null, this.nachname, this.vorname);
        contact.phoneNumbers = [new ContactField('mobile', this.hnummer)];
        contact.save().then(
            () => this.presentToast('Kontakt gespeichert.'),
            (error: any) => console.error('Error saving contact.', error)
        );
    }

    presentToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000
        });
        toast.present();
    }

}
