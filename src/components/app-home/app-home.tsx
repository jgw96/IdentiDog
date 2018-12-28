import { Component, Prop, State } from '@stencil/core';

import { identify } from '../../services/vision';

declare var ImageCapture: any;

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {

  videoEl: HTMLVideoElement;
  stream: MediaStream;
  imageCapture: any;

  @Prop({ connect: 'ion-toast-controller' }) toastCtrl: HTMLIonToastControllerElement | null = null;
  @Prop({ connect: 'ion-loading-controller' }) loadingCtrl: HTMLIonLoadingControllerElement | null = null;

  @State() streaming: boolean = false;

  async componentDidLoad() {
    if ((navigator as any).permissions) {
      const status = await (navigator as any).permissions.query({ name: 'camera' });
      console.log(status.state);

      if (status.state === 'granted') {
        await this.doStream();
      }
    }
  }

  async doStream() {
    this.streaming = true;

    this.stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: 'environment'
      }
    });

    if (this.stream) {
      this.videoEl.srcObject = this.stream;
      this.setUpCamera();
    }
  }

  setUpCamera() {
    const mediaStreamTrack = this.stream.getVideoTracks()[0];
    this.imageCapture = new ImageCapture(mediaStreamTrack);
  }

  async takePhoto() {
    if (this.imageCapture) {
      const loading = await this.loadingCtrl.create({
        message: 'Thinking...'
      });
      await loading.present();

      const imageBlob = await this.imageCapture.takePhoto();
      const pred = await identify(imageBlob);

      await loading.dismiss();
      await this.showPred(pred.predictions[0])
    }
  }

  async showPred(pred) {
    const toast = await this.toastCtrl.create({
      message: `I am ${Math.round((pred.probability / 1) * 100)}% sure this is a ${pred.tagName}`,
      showCloseButton: true,
      closeButtonText: 'OK',
    });
    await toast.present();
  }

  render() {
    return [
      <ion-content>
        {
          this.streaming ?
            <main>
              <video id="mainVideo" autoplay ref={(el) => this.videoEl = el as HTMLVideoElement}></video>
            </main>
            :
            <div id='intro'>

              <img src='/assets/dog.svg' alt='dog header image'></img>
              
              <h1>IdentiDog</h1>

              <p>
                IdentiDog uses artificial intelligence to help you identify dog breeds.
                To do this we need access to the camera so that we can see what it is pointed at, click below
                to give IdentiDog access to your camera and get started!
              </p>

              <ion-button onClick={() => this.doStream()}>Get Started</ion-button>
            </div>
        }

        {this.streaming ? <ion-fab vertical="bottom" horizontal="center" slot="fixed">
          <ion-fab-button onClick={() => this.takePhoto()}>
            <ion-icon name="eye"></ion-icon>
          </ion-fab-button>
        </ion-fab> : null}

      </ion-content>
    ];
  }
}
