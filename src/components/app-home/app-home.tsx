import { Component, Element, Prop, State } from '@stencil/core';

import { identify, doSearch } from '../../services/vision';

import * as cocoSsd from '@tensorflow-models/coco-ssd';

declare var ImageCapture: any;

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {

  videoEl: HTMLVideoElement;
  canvasElement: HTMLCanvasElement;
  stream: MediaStream;
  imageCapture: any;
  context: CanvasRenderingContext2D;

  startLoop: number;

  @Element() el: HTMLElement;

  @Prop({ connect: 'ion-toast-controller' }) toastCtrl: HTMLIonToastControllerElement | null = null;
  @Prop({ connect: 'ion-loading-controller' }) loadingCtrl: HTMLIonLoadingControllerElement | null = null;
  @Prop({ connect: 'ion-modal-controller' }) modalCtrl: HTMLIonModalControllerElement | null = null;

  @State() streaming: boolean = false;
  @State() model: cocoSsd.ObjectDetection;

  componentWillLoad() {
    const darkTheme = localStorage.getItem("theme");

    if (darkTheme) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }

  async componentDidLoad() {
    console.log(this.videoEl);

    if ((navigator as any).permissions) {
      const status = await (navigator as any).permissions.query({ name: 'camera' });
      console.log(status.state);

      if (status.state === 'granted') {
        await this.doStream();
      }
    }
    else {
      await this.doStream();
    }
  }

  doStream() {
    this.streaming = true;

    setTimeout(async () => {
      this.videoEl = this.el.querySelector('video');

      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { width: window.innerWidth, height: window.innerHeight, facingMode: { exact: "environment" } }
      });

      if (this.stream && this.videoEl) {
        this.videoEl.srcObject = this.stream;

        if ((window as any).ExperimentalBadge) {
          (window as any).ExperimentalBadge.set()
        }

        console.log('connected stream to video element');
        this.setUpCamera();

        this.model = await cocoSsd.load();

        console.log(this.model);

        this.canvasElement = this.el.querySelector("#mainCanvas");
        console.log(this.canvasElement);

        (window as any).requestIdleCallback(() => {
          console.log('starting');

          this.start();
        })
      }
    }, 500);
  }

  setUpCamera() {
    const mediaStreamTrack = this.stream.getVideoTracks()[0];
    this.imageCapture = new ImageCapture(mediaStreamTrack);
  }

  async takePhoto() {
    console.log('taking a photo');

    if (this.imageCapture) {
      const loading = await this.loadingCtrl.create({
        message: 'Thinking...'
      });
      await loading.present();

      const imageBlob = await this.imageCapture.takePhoto();

      const pred = await identify(imageBlob);
      console.log(pred);

      await loading.dismiss();

      await this.showPred(pred.predictions[0])
    }
  }

  start = async () => {
    this.context = this.canvasElement.getContext('2d');
    // Classify the image.
    const predictions = await this.model.detect(this.videoEl);
    console.log(predictions);

    if (this.context) {
      this.context.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    }

    if (predictions && this.canvasElement) {
      predictions.forEach((prediction: any) => {

        if (this.context) {
          const font = "16px sans-serif";
          this.context.font = font;

          const x = prediction.bbox[0];
          const y = prediction.bbox[1];
          const width = prediction.bbox[2];
          const height = prediction.bbox[3];
          // Draw the bounding box.
          this.context.strokeStyle = "#8e2e8e";
          this.context.lineWidth = 4;
          this.context.strokeRect(x, y, width, height);
          // Draw the label background.
          this.context.fillStyle = "#8e2e8e";
          const textWidth = this.context.measureText(prediction.class).width + 25;
          const textHeight = parseInt(font, 16); // base 10
          this.context.fillRect(x, y, textWidth, textHeight);
        }
      })

      predictions.forEach((prediction: any) => {
        const x = prediction.bbox[0];
        const y = prediction.bbox[1];
        // Draw the text last to ensure it's on top.

        if (this.context) {
          this.context.fillStyle = "white";
          this.context.fillText(prediction.class, x + 10, y + 14);
        }
      })
    }

    this.startLoop = requestAnimationFrame(this.start)
  }

  async showPred(pred) {
    const data = await doSearch(pred.tagName);
    console.log(data);

    const modal = await this.modalCtrl.create(({
      component: 'pred-detail',
      componentProps: {
        data: data.entities.value[0]
      }
    } as any));
    await modal.present();

    await modal.onDidDismiss();
  }

  async switchTheme() {
    const darkTheme = localStorage.getItem("theme");

    if (darkTheme) {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.removeItem("theme");

      const toast = await this.toastCtrl.create({
        message: "Light theme enabled",
        duration: 1500
      });
      await toast.present();
    }
    else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem("theme", "dark");

      const toast = await this.toastCtrl.create({
        message: "Dark theme enabled",
        duration: 1500
      });
      await toast.present();
    }
  }

  render() {
    return [
      <ion-content>
        <app-login></app-login>

        <ion-button onClick={() => this.switchTheme()} fill="clear" id="darkModeButton">
          <ion-icon name="moon"></ion-icon>
        </ion-button>

        {
          this.streaming ?
            <main>
              <div>
                <video width={window.innerWidth} height={window.innerHeight} autoplay id="mainVideo"></video>
              </div>

              <canvas onClick={() => this.takePhoto()} id="mainCanvas" height={window.innerHeight} width={window.innerWidth} />
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

        {/*this.streaming ? <ion-fab vertical="bottom" horizontal="center" slot="fixed">
          <ion-fab-button onClick={() => this.takePhoto()}>
            <ion-icon name="eye"></ion-icon>
          </ion-fab-button>
      </ion-fab> : null*/}

      </ion-content>
    ];
  }
}
