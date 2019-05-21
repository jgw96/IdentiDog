import { Component, Element, Prop, State, h } from '@stencil/core';

import { identify, doSearch } from '../../services/vision';

// import * as cocoSsd from '@tensorflow-models/coco-ssd';

declare var ImageCapture: any;

@Component({
  tag: 'app-home',
  styles: `
    #mainVideo {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
    
    #intro {
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 1em;
      margin: 2em;
    }
    
    #intro img {
      margin-bottom: 2em;
      max-width: 26em;
    }
    
    #intro p {
      max-width: 28em;
    }
    
    #darkModeButton {
      z-index: 9999;
      position: fixed;
      top: 12px;
    }

    #shareButton {
      z-index: 9999;
      position: fixed;
      top: 12px;
      right: 0px;
    }

    #mainCanvas {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
    
    #dogSpotted {
      z-index: 9999;
      position: fixed;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 4em;
      left: 8em;
      right: 8em;
      height: 2em;
      background-color: rgba(244, 143, 177, 0.7);
      backdrop-filter: blur(10px);
      border-radius: 22px;
      font-weight: bold;
      box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    }
  `
})
export class AppHome {

  videoEl: HTMLVideoElement;
  canvasElement: HTMLCanvasElement;
  stream: MediaStream;
  imageCapture: any;
  context: CanvasRenderingContext2D;

  startLoop: number;

  dogToast: HTMLIonToastElement | null = null;

  @Element() el: HTMLElement;

  @Prop({ connect: 'ion-toast-controller' }) toastCtrl: HTMLIonToastControllerElement | null = null;
  @Prop({ connect: 'ion-loading-controller' }) loadingCtrl: HTMLIonLoadingControllerElement | null = null;
  @Prop({ connect: 'ion-modal-controller' }) modalCtrl: HTMLIonModalControllerElement | null = null;

  @State() streaming: boolean = false;
  @State() model: any;
  @State() takingPhoto: boolean = false;
  @State() seeingDog: boolean = false;

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
        video: { width: window.innerWidth, height: window.innerHeight, facingMode: "environment" }
      });

      if (this.stream && this.videoEl) {
        this.videoEl.srcObject = this.stream;

        if ((window as any).ExperimentalBadge) {
          (window as any).ExperimentalBadge.set()
        }

        console.log('connected stream to video element');
        this.setUpCamera();

        // If on a modern browser that supports the deviceMemory API
        // dont load the big Coco model unless this is a powerful device
        // which were assuming to be anything with atleast 4gb of RAM
        if ((navigator as any).deviceMemory && (navigator as any).deviceMemory >= 4) {
          await this.loadCocoModel();

          this.canvasElement = this.el.querySelector("#mainCanvas");
          console.log(this.canvasElement);

          (window as any).requestIdleCallback(() => {
            console.log('starting');

            this.start();
          })
        }
        else if (!(navigator as any).deviceMemory) {
          // deviceMemory API not supported so eff it and
          // just load the model
          await this.loadCocoModel();

          this.canvasElement = this.el.querySelector("#mainCanvas");
          console.log(this.canvasElement);

          (window as any).requestIdleCallback(() => {
            console.log('starting');

            this.start();
          })
        }

        this.dogToast = await this.toastCtrl.create({
          message: "Point at a dog and tap the screen",
          showCloseButton: true
        });
        await this.dogToast.present();
      }
    }, 500);
  }

  async loadCocoModel() {
    const modelLoading = await this.loadingCtrl.create({
      message: "Loading model..."
    });
    await modelLoading.present();

    const coco = await import('@tensorflow-models/coco-ssd');
    this.model = await coco.load();

    await modelLoading.dismiss();
  }

  setUpCamera() {
    const mediaStreamTrack = this.stream.getVideoTracks()[0];
    this.imageCapture = new ImageCapture(mediaStreamTrack);
  }

  async takePhoto() {
    console.log('taking a photo');
    this.takingPhoto = true;

    if (this.dogToast) {
      await this.dogToast.dismiss();
    }

    window.cancelAnimationFrame(this.startLoop);
    this.startLoop = null;

    if (this.imageCapture) {
      const imageBlob = await this.imageCapture.takePhoto();

      const pred = await identify(imageBlob);
      console.log(pred);


      this.takingPhoto = false;

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

        if (prediction.class === "dog") {
          this.seeingDog = true;

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
          }
        }
        else {
          this.seeingDog = false;
        }

      })
    }

    if (!this.takingPhoto) {
      this.startLoop = requestAnimationFrame(this.start);
    }
    // setInterval(this.start, 100);
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

    if (this.model) {
      (window as any).requestIdleCallback(() => {
        console.log('starting');

        this.start();
      })
    }
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

  async share() {
    console.log('here');
    this.takingPhoto = true;

    const imageBlob = await this.imageCapture.takePhoto();

    const imageFile = new File([imageBlob], "dog.jpg");
    console.log(imageFile);
    const shareData = { files: [imageFile] };

    if ((navigator as any).canShare && (navigator as any).canShare(shareData)) {
      (navigator as any).share({
        files: shareData.files,
        title: 'New dog identified',
        text: 'I identified a new dog with IdentiDog',
      })
        .then(() => {
          this.takingPhoto = false;
        })
        .catch((error) => console.log('Sharing failed', error));
    } else {
      console.log('Your system doesn\'t support sharing files.');
      this.takingPhoto = false;
    }
  }

  render() {
    return [
      <ion-content>
        <ion-button onClick={() => this.switchTheme()} fill="clear" id="darkModeButton">
          <ion-icon name="moon"></ion-icon>
        </ion-button>

        {(navigator as any).share && this.streaming ? <ion-button onClick={() => this.share()} id="shareButton" fill="clear">
          <ion-icon name="share"></ion-icon>
        </ion-button> : null}

        {
          this.streaming ?
            <main>

              <div id="dogSpotted">
                {
                  this.seeingDog ? <span>Dog spotted</span> : <span>No dog spotted</span>
                }
              </div>

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

        {
          this.takingPhoto ? <ion-progress-bar id="loadingBar" type="indeterminate"></ion-progress-bar> : null
        }

      </ion-content>
    ];
  }
}
