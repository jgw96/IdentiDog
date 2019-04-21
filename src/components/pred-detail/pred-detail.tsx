import { Component, Element, Prop } from '@stencil/core';

import { createActivity } from '../../services/graph';

@Component({
  tag: 'pred-detail',
  styleUrl: 'pred-detail.css'
})
export class PredDetail {

  @Prop() data: any;
  @Prop({ connect: 'ion-action-sheet-controller' }) actionSheetCtrl: HTMLIonActionSheetControllerElement;
  @Prop({ connect: "ion-toast-controller"}) toastCtrl: HTMLIonToastControllerElement;

  @Element() el: HTMLElement;

  componentDidLoad() {
    console.log('data', this.data);
  }

  async dismiss() {
    (this.el.closest('ion-modal') as any).dismiss();
  }

  async share() {
    const token = sessionStorage.getItem("token");

    const actionSheet = await this.actionSheetCtrl.create({
      header: "Share",
      buttons: [
        {
          text: "Share",
          icon: "Share",
          handler: () => {
            if ((navigator as any).share) {
              (navigator as any).share({
                title: 'IdentiDog',
                text: 'Check out this dog I just saw',
                url: this.data.webSearchUrl,
              })
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
            }
          }
        },
        {
          text: "Share to Windows Timeilne",
          icon: "logo-windows",
          handler: async () => {
            const activity = {
              "appActivityId": this.data.bingId,
              "activitySourceHost": "https://identidog-app.firebaseapp.com",
              "userTimezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
              "appDisplayName": "Identidog",
              "activationUrl": this.data.webSearchUrl,
              "contentUrl": this.data.webSearchUrl,
              "fallbackUrl": "https://identidog-app.firebaseapp.com",
              "contentInfo": {
                "@context": "https://schema.org",
                "@type": "text/plain",
                "title": this.data.name
              },
              "visualElements": {
                "attribution": {
                  "iconUrl": "/assets/icon/512.png",
                  "alternateText": "Identidog",
                  "addImageQuery": false,
                },
                "description": `You saw a ${this.data.name} earlier!`,
                "backgroundColor": "#ff0000",
                "displayText": `You saw a ${this.data.name} earlier!`,
                "content": {
                  "$schema": "https://adaptivecards.io/schemas/adaptive-card.json",
                  "type": "AdaptiveCard",
                  "body":
                    [{
                      "type": "TextBlock",
                      "text": "Identidog"
                    }]
                }
              },
              "historyItems": [
                {
                  "userTimezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
                  "startedDateTime": new Date().toISOString(),
                  "lastActiveDateTime": new Date().toISOString(),
                }
              ]
            }

            if (token) {
              const data = await createActivity(token, activity, this.data.bingId);
              console.log(data);

              if (this.toastCtrl) {
                const toast = await this.toastCtrl.create({
                  message: 'Succesfully posted to your Windows Timeline',
                  duration: 2500,
                  showCloseButton: true,
                  closeButtonText: 'ok'
                });
                await toast.present();
              }
            }
          }
        }
      ]
    });

    await actionSheet.present();
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-button onClick={() => this.dismiss()}>
              <ion-icon name="close"></ion-icon>
            </ion-button>
          </ion-buttons>

          <ion-title>{this.data.name}</ion-title>

          <ion-buttons slot="end">
            <ion-button onClick={() => this.share()}>
              <ion-icon name="share"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,

      <ion-content padding>
        <dv id="imageBlock">
          <img height={this.data.image.sourceHeight} src={this.data.image.hostPageUrl.replace('http', 'https')} alt={this.data.image.name}></img>
          <a href={this.data.image.provider[0].url}>Source</a>
        </dv>

        <div id="infoBlock">
          <p>{this.data.description}</p>
        </div>

        <ion-button shape="round" expand="block" href={this.data.webSearchUrl}>More Info</ion-button>

        {/*<amp-ad width="100vw" height="320"
          type="adsense"
          data-ad-client="ca-pub-7724672580435259"
          data-ad-slot="3649297059"
          data-auto-format="rspv"
          data-full-width>
            <span>Loading...</span>
    </amp-ad>*/}
      </ion-content>
    ];
  }
}
