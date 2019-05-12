import { Component, Element, Prop, State } from '@stencil/core';

import { doSearch } from '../../services/vision';


@Component({
  tag: 'image-preview',
  styleUrl: 'image-preview.css'
})
export class ImagePreview {

  @Element() el: HTMLElement;

  @Prop() image: any;
  @Prop() pred: any;
  @Prop({ connect: 'ion-modal-controller' }) modalCtrl: HTMLIonModalControllerElement;
  @Prop({ connect: 'ion-alert-controller' }) alertCtrl: HTMLIonAlertControllerElement;

  @State() imageSrc: any;

  componentDidLoad() {
    this.imageSrc = URL.createObjectURL(this.image);
  }

  async showPred() {
    console.log(this.pred);
    console.log(this.pred.tagName);
    const data = await doSearch(this.pred.tagName);
    console.log(data);

    await (this.el.closest('ion-modal')).dismiss();

    const modal = await this.modalCtrl.create(({
      component: 'pred-detail',
      componentProps: {
        data: data.entities.value[0]
      }
    } as any));
    await modal.present();
  }

  base64ToBlob(base64, mime) {
    mime = mime || '';
    var sliceSize = 1024;
    var byteChars = window.atob(base64);
    var byteArrays = [];

    for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
      var slice = byteChars.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: mime });
  }

  async download() {
    const alert = await this.alertCtrl.create({
      header: 'Save Image',
      inputs: [
        {
          placeholder: 'dog.png',
          type: 'text',
          name: 'fileName'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel')
          }
        }, {
          text: 'Save',
          handler: async () => {

            var reader = new FileReader();

            reader.onloadend = async () => {

              console.log(reader.result);

              const response = await fetch('https://identidog-functions.azurewebsites.net/api/SaveImage', {
                method: "POST",
                body: reader.result
              });

              const res = await response.text();
              console.log(res);
            }

            reader.readAsDataURL(this.image);
          }
        }
      ]
    });

    await alert.present();
  }

  async dismiss() {
    await this.el.closest('ion-modal').dismiss();
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar no-border color="primary">
          <ion-buttons slot="start">
            <ion-button onClick={() => this.dismiss()}>
              <ion-icon name="close"></ion-icon>
            </ion-button>
          </ion-buttons>

          <ion-buttons slot="end">
            <ion-button onClick={() => this.download()}>
              <ion-icon name="save"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,
      <ion-content>
        <main id="imagePreviewMain">

          <img src={this.imageSrc} alt="your image"></img>

          <ion-button onClick={() => this.showPred()} fill="solid" expand="block">
            <ion-icon slot="start" name="search"></ion-icon>
            More Info
          </ion-button>
        </main>
      </ion-content>
    ];
  }
}
