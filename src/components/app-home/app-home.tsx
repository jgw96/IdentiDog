import { Component, Element, Prop, State, h } from '@stencil/core';

import { identify, doSearch } from '../../services/vision';

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
      min-height: 315px;
      margin: 2em;
    }
    
    #intro p {
      max-width: 28em;
    }
    
    #darkModeButton {
      z-index: 9999;
      position: fixed;
      top: 12px;
    }

    @media(prefers-color-scheme: dark) {
      #darkModeButton {
        display: none;
      }
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

    #stopStreamButton {
      position: fixed;
      bottom: 16px;
      right: 16px;
      z-index: 9999;
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

    @media(max-width: 380px) {
      #dogSpotted {
        left: 4em;
        right: 4em;
      }
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

        this.dogToast = await this.toastCtrl.create({
          message: "Point at a dog and tap the screen",
          showCloseButton: true
        });
        await this.dogToast.present();
      }
    }, 500);
  }

  pauseStream() {
    const mediaStreamTrack = this.stream.getVideoTracks()[0];
    mediaStreamTrack.stop();
    this.streaming = false;
    this.stream = null;
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

  async showPred(pred) {
    if (this.dogToast) {
      this.dogToast.dismiss();
    };

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
        <ion-fab-button onClick={() => this.switchTheme()} size="small" id="darkModeButton">
          <ion-icon size="small" name="moon"></ion-icon>
        </ion-fab-button>

        {(navigator as any).share && this.streaming ? <ion-fab-button onClick={() => this.share()} id="shareButton" size="small">
          <ion-icon size="small" name="share"></ion-icon>
        </ion-fab-button> : null}

        {
          this.streaming ?
            <main>

              <div>
                <video width={window.innerWidth} height={window.innerHeight} autoplay id="mainVideo"></video>
              </div>

              <div>
                <ion-button id="stopStreamButton" onClick={() => this.pauseStream()}>Stop</ion-button>
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

        {
          this.takingPhoto ? <ion-progress-bar id="loadingBar" type="indeterminate"></ion-progress-bar> : null
        }

      </ion-content>
    ];
  }
}
