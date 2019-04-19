import { Component, Element, Prop } from '@stencil/core';


@Component({
  tag: 'pred-detail',
  styleUrl: 'pred-detail.css'
})
export class PredDetail {

  @Prop() data: any;

  @Element() el: HTMLElement;

  componentDidLoad() {
    console.log(this.data);
  }

  async dismiss() {
    (this.el.closest('ion-modal') as any).dismiss();
  }

  share() {
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
          <img height={this.data.image.sourceHeight} src={this.data.image.hostPageUrl} alt={this.data.image.name}></img>
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
