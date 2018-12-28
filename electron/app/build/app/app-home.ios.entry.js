const h = window.App.h;

import { a as GESTURE_CONTROLLER } from './chunk-647a6bad.js';
import { a as now } from './chunk-252e5815.js';
import { a as createColorClasses, b as hostContext, c as openURL, d as getClassMap } from './chunk-0f8926dc.js';
import { a as BACKDROP, b as dismiss, c as eventMethod, d as present, e as createOverlay, f as dismissOverlay, g as getOverlay } from './chunk-ce5bf207.js';

async function identify(blob) {
    const response = await fetch('https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/216d2186-e826-4d9e-9ab4-b42b34ed65d4/image?iterationId=778e2d68-a120-45c1-bbeb-e18fc243d970', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/octet-stream',
            'Prediction-Key': '2a58718ea5834c3bab8f64e0f5ce67e3'
        },
        body: blob
    });
    const data = await response.json();
    console.log(data);
    return data;
}

class AppHome {
    constructor() {
        this.toastCtrl = null;
        this.loadingCtrl = null;
        this.streaming = false;
    }
    async componentDidLoad() {
        if (navigator.permissions) {
            const status = await navigator.permissions.query({ name: 'camera' });
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
            this.videoEl.onloadedmetadata = async () => {
                try {
                    await this.videoEl.play();
                }
                catch (err) {
                    console.log(err);
                }
            };
            console.log('connected stream to video element');
            // this.setUpCamera();
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
            await this.showPred(pred.predictions[0]);
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
            h("ion-content", null,
                this.streaming ?
                    h("main", null,
                        h("video", { id: "mainVideo", ref: (el) => this.videoEl = el }))
                    :
                        h("div", { id: 'intro' },
                            h("img", { src: '/assets/dog.svg', alt: 'dog header image' }),
                            h("h1", null, "IdentiDog"),
                            h("p", null, "IdentiDog uses artificial intelligence to help you identify dog breeds. To do this we need access to the camera so that we can see what it is pointed at, click below to give IdentiDog access to your camera and get started!"),
                            h("ion-button", { onClick: () => this.doStream() }, "Get Started")),
                this.streaming ? h("ion-fab", { vertical: "bottom", horizontal: "center", slot: "fixed" },
                    h("ion-fab-button", { onClick: () => this.takePhoto() },
                        h("ion-icon", { name: "eye" }))) : null)
        ];
    }
    static get is() { return "app-home"; }
    static get properties() { return {
        "loadingCtrl": {
            "connect": "ion-loading-controller"
        },
        "streaming": {
            "state": true
        },
        "toastCtrl": {
            "connect": "ion-toast-controller"
        }
    }; }
    static get style() { return "#mainVideo {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  -o-object-fit: cover;\n  object-fit: cover;\n  height: 100%;\n  width: 100%;\n}\n\n#intro {\n  border-radius: 10px;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -ms-flex-align: center;\n  align-items: center;\n  text-align: center;\n  color: black;\n  padding: 1em;\n  margin: 2em;\n}\n\n#intro img {\n  margin-bottom: 2em;\n}"; }
}

class Backdrop {
    constructor() {
        this.lastClick = -10000;
        this.blocker = GESTURE_CONTROLLER.createBlocker({
            disableScroll: true
        });
        this.visible = true;
        this.tappable = true;
        this.stopPropagation = true;
    }
    componentDidLoad() {
        if (this.stopPropagation) {
            this.blocker.block();
        }
    }
    componentDidUnload() {
        this.blocker.destroy();
    }
    onTouchStart(ev) {
        this.lastClick = now(ev);
        this.emitTap(ev);
    }
    onMouseDown(ev) {
        if (this.lastClick < now(ev) - 2500) {
            this.emitTap(ev);
        }
    }
    emitTap(ev) {
        if (this.stopPropagation) {
            ev.preventDefault();
            ev.stopPropagation();
        }
        if (this.tappable) {
            this.ionBackdropTap.emit();
        }
    }
    hostData() {
        return {
            tabindex: "-1",
            class: {
                "backdrop-hide": !this.visible,
                "backdrop-no-tappable": !this.tappable,
            }
        };
    }
    static get is() { return "ion-backdrop"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "doc": {
                "context": "document"
            },
            "stopPropagation": {
                "type": Boolean,
                "attr": "stop-propagation"
            },
            "tappable": {
                "type": Boolean,
                "attr": "tappable"
            },
            "visible": {
                "type": Boolean,
                "attr": "visible"
            }
        };
    }
    static get events() {
        return [{
                "name": "ionBackdropTap",
                "method": "ionBackdropTap",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }];
    }
    static get listeners() {
        return [{
                "name": "touchstart",
                "method": "onTouchStart",
                "capture": true
            }, {
                "name": "click",
                "method": "onMouseDown",
                "capture": true
            }, {
                "name": "mousedown",
                "method": "onMouseDown",
                "capture": true
            }];
    }
    static get style() { return ":host {\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  display: block;\n  position: absolute;\n  -webkit-transform: translateZ(0);\n  transform: translateZ(0);\n  contain: strict;\n  cursor: pointer;\n  opacity: .01;\n  -ms-touch-action: none;\n  touch-action: none;\n  z-index: 2; }\n\n:host(.backdrop-hide) {\n  background: transparent; }\n\n:host(.backdrop-no-tappable) {\n  cursor: auto; }\n\n:host {\n  background-color: var(--ion-backdrop-color, #000); }"; }
    static get styleMode() { return "ios"; }
}

class Fab {
    constructor() {
        this.edge = false;
        this.activated = false;
    }
    activatedChanged() {
        const activated = this.activated;
        const fab = this.el.querySelector("ion-fab-button");
        if (fab) {
            fab.activated = activated;
        }
        Array.from(this.el.querySelectorAll("ion-fab-list")).forEach(list => {
            list.activated = activated;
        });
    }
    componentDidLoad() {
        if (this.activated) {
            this.activatedChanged();
        }
    }
    onClick() {
        const hasList = !!this.el.querySelector("ion-fab-list");
        if (hasList) {
            this.activated = !this.activated;
        }
    }
    close() {
        this.activated = false;
    }
    hostData() {
        return {
            class: {
                [`fab-horizontal-${this.horizontal}`]: this.horizontal !== undefined,
                [`fab-vertical-${this.vertical}`]: this.vertical !== undefined,
                "fab-edge": this.edge
            }
        };
    }
    render() {
        return h("slot", null);
    }
    static get is() { return "ion-fab"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "activated": {
                "type": Boolean,
                "attr": "activated",
                "mutable": true,
                "watchCallbacks": ["activatedChanged"]
            },
            "close": {
                "method": true
            },
            "edge": {
                "type": Boolean,
                "attr": "edge"
            },
            "el": {
                "elementRef": true
            },
            "horizontal": {
                "type": String,
                "attr": "horizontal"
            },
            "vertical": {
                "type": String,
                "attr": "vertical"
            }
        };
    }
    static get listeners() {
        return [{
                "name": "click",
                "method": "onClick"
            }];
    }
    static get style() { return ":host {\n  position: absolute;\n  z-index: 999; }\n\n:host(.fab-horizontal-center) {\n  left: 50%;\n  margin-left: -28px; }\n\n:host(.fab-horizontal-start) {\n  left: calc(10px + var(--ion-safe-area-left, 0px)); }\n\n:host(.fab-horizontal-end) {\n  right: calc(10px + var(--ion-safe-area-right, 0px)); }\n\n:host(.fab-vertical-top) {\n  top: 10px; }\n\n:host(.fab-vertical-top.fab-edge) {\n  top: -28px; }\n\n:host(.fab-vertical-bottom) {\n  bottom: 10px; }\n\n:host(.fab-vertical-bottom.fab-edge) {\n  bottom: -28px; }\n\n:host(.fab-vertical-center) {\n  margin-top: -28px;\n  top: 50%; }"; }
}

class FabButton {
    constructor() {
        this.keyFocus = false;
        this.activated = false;
        this.disabled = false;
        this.routerDirection = "forward";
        this.show = false;
        this.translucent = false;
        this.type = "button";
        this.onFocus = () => {
            this.ionFocus.emit();
        };
        this.onKeyUp = () => {
            this.keyFocus = true;
        };
        this.onBlur = () => {
            this.keyFocus = false;
            this.ionBlur.emit();
        };
    }
    hostData() {
        const { el, disabled, color, activated, show, translucent, size, keyFocus } = this;
        const inList = hostContext("ion-fab-list", el);
        return {
            "aria-disabled": disabled ? "true" : null,
            class: Object.assign({}, createColorClasses(color), { "fab-button-in-list": inList, "fab-button-translucent-in-list": inList && translucent, "fab-button-close-active": activated, "fab-button-show": show, "fab-button-disabled": disabled, "fab-button-translucent": translucent, "ion-activatable": true, "focused": keyFocus, [`fab-button-${size}`]: size !== undefined })
        };
    }
    render() {
        const TagType = this.href === undefined ? "button" : "a";
        const attrs = (TagType === "button")
            ? { type: this.type }
            : { href: this.href };
        return (h(TagType, Object.assign({}, attrs, { class: "button-native", disabled: this.disabled, onFocus: this.onFocus, onKeyUp: this.onKeyUp, onBlur: this.onBlur, onClick: (ev) => openURL(this.win, this.href, ev, this.routerDirection) }), h("span", { class: "close-icon" }, h("ion-icon", { name: "close", lazy: false })), h("span", { class: "button-inner" }, h("slot", null)), this.mode === "md" && h("ion-ripple-effect", null)));
    }
    static get is() { return "ion-fab-button"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "activated": {
                "type": Boolean,
                "attr": "activated"
            },
            "color": {
                "type": String,
                "attr": "color"
            },
            "disabled": {
                "type": Boolean,
                "attr": "disabled"
            },
            "el": {
                "elementRef": true
            },
            "href": {
                "type": String,
                "attr": "href"
            },
            "keyFocus": {
                "state": true
            },
            "mode": {
                "type": String,
                "attr": "mode"
            },
            "routerDirection": {
                "type": String,
                "attr": "router-direction"
            },
            "show": {
                "type": Boolean,
                "attr": "show"
            },
            "size": {
                "type": String,
                "attr": "size"
            },
            "translucent": {
                "type": Boolean,
                "attr": "translucent"
            },
            "type": {
                "type": String,
                "attr": "type"
            },
            "win": {
                "context": "window"
            }
        };
    }
    static get events() {
        return [{
                "name": "ionFocus",
                "method": "ionFocus",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionBlur",
                "method": "ionBlur",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }];
    }
    static get style() { return ":host {\n  --transition: background-color, opacity 100ms linear;\n  --ripple-color: currentColor;\n  --border-radius: 50%;\n  --border-width: 0;\n  --border-style: none;\n  --border-color: initial;\n  /**\n   * \@prop --background: Background of the button\n   * \@prop --background-activated: Background of the button when activated\n   * \@prop --background-focused: Background of the button when focused\n   *\n   * \@prop --color: Text color of the button\n   * \@prop --color-activated: Text color of the button when activated\n   * \@prop --color-focused: Text color of the button when focused\n   *\n   * \@prop --transition: Transition of the button\n   *\n   * \@prop --border-radius: Border radius of the button\n   * \@prop --border-width: Border width of the button\n   * \@prop --border-style: Border style of the button\n   * \@prop --border-color: Border color of the button\n   *\n   * \@prop --ripple-color: Color of the button ripple effect\n   *\n   * \@prop --box-shadow: Box shadow of the button\n   *\n   * \@prop --padding-top: Padding top of the button\n   * \@prop --padding-end: Padding end of the button\n   * \@prop --padding-bottom: Padding bottom of the button\n   * \@prop --padding-start: Padding start of the button\n   */\n  margin: 0;\n  display: block;\n  width: 56px;\n  height: 56px;\n  font-size: 14px;\n  text-align: center;\n  text-overflow: ellipsis;\n  text-transform: none;\n  white-space: nowrap;\n  -webkit-font-kerning: none;\n  font-kerning: none; }\n\n:host(.ion-color) .button-native {\n  background: var(--ion-color-base);\n  color: var(--ion-color-contrast); }\n\n:host(.ion-color.focused) .button-native,\n:host(.ion-color.activated) .button-native {\n  background: var(--ion-color-shade);\n  color: var(--ion-color-contrast); }\n\n.button-native {\n  border-radius: var(--border-radius);\n  padding: var(--padding-top) var(--padding-end) var(--padding-bottom) var(--padding-start);\n  font-family: inherit;\n  font-size: inherit;\n  font-style: inherit;\n  font-weight: inherit;\n  letter-spacing: inherit;\n  text-decoration: inherit;\n  text-overflow: inherit;\n  text-transform: inherit;\n  text-align: inherit;\n  white-space: inherit;\n  color: inherit;\n  display: block;\n  position: relative;\n  width: 100%;\n  height: 100%;\n  -webkit-transform: var(--transform);\n  transform: var(--transform);\n  -webkit-transition: var(--transition);\n  transition: var(--transition);\n  border-width: var(--border-width);\n  border-style: var(--border-style);\n  border-color: var(--border-color);\n  outline: none;\n  background: var(--background);\n  background-clip: padding-box;\n  color: var(--color);\n  -webkit-box-shadow: var(--box-shadow);\n  box-shadow: var(--box-shadow);\n  contain: strict;\n  cursor: pointer;\n  overflow: hidden;\n  z-index: 0;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none; }\n\n.button-native[disabled] {\n  cursor: default;\n  opacity: .5;\n  pointer-events: none; }\n\n::slotted(ion-icon) {\n  line-height: 1; }\n\n.button-inner {\n  left: 0;\n  right: 0;\n  top: 0;\n  display: -ms-flexbox;\n  display: flex;\n  position: absolute;\n  -ms-flex-flow: row nowrap;\n  flex-flow: row nowrap;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  height: 100%;\n  -webkit-transition: all ease-in-out 300ms;\n  transition: all ease-in-out 300ms;\n  -webkit-transition-property: opacity, -webkit-transform;\n  transition-property: opacity, -webkit-transform;\n  transition-property: transform, opacity;\n  transition-property: transform, opacity, -webkit-transform; }\n\n:host(.activated) .button-native {\n  background: var(--background-activated);\n  color: var(--color-activated); }\n\n:host(.focused) .button-native {\n  background: var(--background-focused);\n  color: var(--color-focused); }\n\n:host(.fab-button-disabled) {\n  pointer-events: none; }\n\n.button-native[disabled] {\n  cursor: default;\n  opacity: .5;\n  pointer-events: none; }\n\n::slotted(ion-icon) {\n  line-height: 1; }\n\n:host(.fab-button-small) {\n  margin: 8px;\n  width: 40px;\n  height: 40px; }\n\n.close-icon {\n  left: 0;\n  right: 0;\n  top: 0;\n  display: -ms-flexbox;\n  display: flex;\n  position: absolute;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  height: 100%;\n  -webkit-transform: scale(0.4) rotateZ(-45deg);\n  transform: scale(0.4) rotateZ(-45deg);\n  -webkit-transition: all ease-in-out 300ms;\n  transition: all ease-in-out 300ms;\n  -webkit-transition-property: opacity, -webkit-transform;\n  transition-property: opacity, -webkit-transform;\n  transition-property: transform, opacity;\n  transition-property: transform, opacity, -webkit-transform;\n  opacity: 0; }\n\n:host(.fab-button-close-active) .close-icon {\n  -webkit-transform: scale(1) rotateZ(0deg);\n  transform: scale(1) rotateZ(0deg);\n  opacity: 1; }\n\n:host(.fab-button-close-active) .button-inner {\n  -webkit-transform: scale(0.4) rotateZ(45deg);\n  transform: scale(0.4) rotateZ(45deg);\n  opacity: 0; }\n\nion-ripple-effect {\n  color: var(--ripple-color); }\n\n:host {\n  --background: var(--ion-color-primary, #3880ff);\n  --background-activated: var(--ion-color-primary-shade, #3171e0);\n  --background-focused: var(--background-activated);\n  --color: var(--ion-color-primary-contrast, #fff);\n  --color-activated: var(--ion-color-primary-contrast, #fff);\n  --color-focused: var(--color-activated);\n  --box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);\n  --transition: 0.2s transform cubic-bezier(0.25, 1.11, 0.78, 1.59); }\n\n:host(.activated) {\n  --box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);\n  --transform: scale(1.1);\n  --transition: 0.2s transform ease-out; }\n\n::slotted(ion-icon),\n.close-icon {\n  font-size: 28px; }\n\n:host(.fab-button-in-list) {\n  --background: var(--ion-color-light, #f4f5f8);\n  --background-activated: var(--ion-color-light-shade, #d7d8da);\n  --background-focused: var(--background-activated);\n  --color: var(--ion-color-light-contrast, #000);\n  --color-activated: var(--ion-color-light-contrast, #000);\n  --color-focused: var(--color-activated);\n  --transition: transform 200ms ease 10ms, opacity 200ms ease 10ms; }\n\n:host(.fab-button-in-list) ::slotted(ion-icon) {\n  font-size: 18px; }\n\n:host(.fab-button-translucent) {\n  --background: rgba(var(--ion-color-primary-rgb, 56, 128, 255), 0.9);\n  --backdrop-filter: saturate(180%) blur(20px); }\n\n:host(.fab-button-translucent-in-list) {\n  --background: rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.8); }\n\n:host(.ion-color.fab-button-translucent) .button-native {\n  background: rgba(var(--ion-color-base-rgb), 0.9); }\n\n:host(.ion-color.focused.fab-button-translucent) .button-native,\n:host(.ion-color.activated.fab-button-translucent) .button-native {\n  background: var(--ion-color-base); }"; }
    static get styleMode() { return "ios"; }
}

function iosEnterAnimation(AnimationC, baseEl) {
    const baseAnimation = new AnimationC();
    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    const wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.loading-wrapper'));
    backdropAnimation.fromTo('opacity', 0.01, 0.3);
    wrapperAnimation.fromTo('opacity', 0.01, 1)
        .fromTo('scale', 1.1, 1);
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('ease-in-out')
        .duration(200)
        .add(backdropAnimation)
        .add(wrapperAnimation));
}

function iosLeaveAnimation(AnimationC, baseEl) {
    const baseAnimation = new AnimationC();
    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    const wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.loading-wrapper'));
    backdropAnimation.fromTo('opacity', 0.3, 0);
    wrapperAnimation.fromTo('opacity', 0.99, 0)
        .fromTo('scale', 1, 0.9);
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('ease-in-out')
        .duration(200)
        .add(backdropAnimation)
        .add(wrapperAnimation));
}

function mdEnterAnimation(AnimationC, baseEl) {
    const baseAnimation = new AnimationC();
    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    const wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.loading-wrapper'));
    backdropAnimation.fromTo('opacity', 0.01, 0.32);
    wrapperAnimation.fromTo('opacity', 0.01, 1).fromTo('scale', 1.1, 1);
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('ease-in-out')
        .duration(200)
        .add(backdropAnimation)
        .add(wrapperAnimation));
}

function mdLeaveAnimation(AnimationC, baseEl) {
    const baseAnimation = new AnimationC();
    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    const wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.loading-wrapper'));
    backdropAnimation.fromTo('opacity', 0.32, 0);
    wrapperAnimation.fromTo('opacity', 0.99, 0).fromTo('scale', 1, 0.9);
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('ease-in-out')
        .duration(200)
        .add(backdropAnimation)
        .add(wrapperAnimation));
}

class Loading {
    constructor() {
        this.presented = false;
        this.keyboardClose = true;
        this.duration = 0;
        this.backdropDismiss = false;
        this.showBackdrop = true;
        this.translucent = false;
        this.animated = true;
    }
    componentWillLoad() {
        if (this.spinner === undefined) {
            this.spinner = this.config.get("loadingSpinner", this.mode === "ios" ? "lines" : "crescent");
        }
    }
    componentDidLoad() {
        this.ionLoadingDidLoad.emit();
    }
    componentDidUnload() {
        this.ionLoadingDidUnload.emit();
    }
    onBackdropTap() {
        this.dismiss(undefined, BACKDROP);
    }
    async present() {
        await present(this, "loadingEnter", iosEnterAnimation, mdEnterAnimation, undefined);
        if (this.duration > 0) {
            this.durationTimeout = setTimeout(() => this.dismiss(), this.duration + 10);
        }
    }
    dismiss(data, role) {
        if (this.durationTimeout) {
            clearTimeout(this.durationTimeout);
        }
        return dismiss(this, data, role, "loadingLeave", iosLeaveAnimation, mdLeaveAnimation);
    }
    onDidDismiss() {
        return eventMethod(this.el, "ionLoadingDidDismiss");
    }
    onWillDismiss() {
        return eventMethod(this.el, "ionLoadingWillDismiss");
    }
    hostData() {
        return {
            style: {
                zIndex: 40000 + this.overlayIndex
            },
            class: Object.assign({}, getClassMap(this.cssClass), { "loading-translucent": this.translucent })
        };
    }
    render() {
        return [
            h("ion-backdrop", { visible: this.showBackdrop, tappable: this.backdropDismiss }),
            h("div", { class: "loading-wrapper", role: "dialog" }, this.spinner && (h("div", { class: "loading-spinner" }, h("ion-spinner", { name: this.spinner }))), this.message && h("div", { class: "loading-content" }, this.message))
        ];
    }
    static get is() { return "ion-loading"; }
    static get encapsulation() { return "scoped"; }
    static get properties() {
        return {
            "animated": {
                "type": Boolean,
                "attr": "animated"
            },
            "animationCtrl": {
                "connect": "ion-animation-controller"
            },
            "backdropDismiss": {
                "type": Boolean,
                "attr": "backdrop-dismiss"
            },
            "config": {
                "context": "config"
            },
            "cssClass": {
                "type": String,
                "attr": "css-class"
            },
            "dismiss": {
                "method": true
            },
            "duration": {
                "type": Number,
                "attr": "duration"
            },
            "el": {
                "elementRef": true
            },
            "enterAnimation": {
                "type": "Any",
                "attr": "enter-animation"
            },
            "keyboardClose": {
                "type": Boolean,
                "attr": "keyboard-close"
            },
            "leaveAnimation": {
                "type": "Any",
                "attr": "leave-animation"
            },
            "message": {
                "type": String,
                "attr": "message"
            },
            "mode": {
                "type": String,
                "attr": "mode"
            },
            "onDidDismiss": {
                "method": true
            },
            "onWillDismiss": {
                "method": true
            },
            "overlayIndex": {
                "type": Number,
                "attr": "overlay-index"
            },
            "present": {
                "method": true
            },
            "showBackdrop": {
                "type": Boolean,
                "attr": "show-backdrop"
            },
            "spinner": {
                "type": String,
                "attr": "spinner",
                "mutable": true
            },
            "translucent": {
                "type": Boolean,
                "attr": "translucent"
            }
        };
    }
    static get events() {
        return [{
                "name": "ionLoadingDidUnload",
                "method": "ionLoadingDidUnload",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionLoadingDidLoad",
                "method": "ionLoadingDidLoad",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionLoadingDidPresent",
                "method": "didPresent",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionLoadingWillPresent",
                "method": "willPresent",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionLoadingWillDismiss",
                "method": "willDismiss",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionLoadingDidDismiss",
                "method": "didDismiss",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }];
    }
    static get listeners() {
        return [{
                "name": "ionBackdropTap",
                "method": "onBackdropTap"
            }];
    }
    static get style() { return ".sc-ion-loading-ios-h {\n  \n  --min-width: auto;\n  --width: auto;\n  --min-height: auto;\n  --height: auto;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  display: -ms-flexbox;\n  display: flex;\n  position: fixed;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  font-family: var(--ion-font-family, inherit);\n  contain: strict;\n  -ms-touch-action: none;\n  touch-action: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  z-index: 1000; }\n\n.loading-wrapper.sc-ion-loading-ios {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: inherit;\n  align-items: inherit;\n  -ms-flex-pack: inherit;\n  justify-content: inherit;\n  width: var(--width);\n  min-width: var(--min-width);\n  max-width: var(--max-width);\n  height: var(--height);\n  min-height: var(--min-height);\n  max-height: var(--max-height);\n  background: var(--background);\n  opacity: 0;\n  z-index: 10; }\n\n.spinner-lines.sc-ion-loading-ios, .spinner-lines-small.sc-ion-loading-ios, .spinner-bubbles.sc-ion-loading-ios, .spinner-circles.sc-ion-loading-ios, .spinner-crescent.sc-ion-loading-ios, .spinner-dots.sc-ion-loading-ios {\n  color: var(--spinner-color); }\n\n.sc-ion-loading-ios-h {\n  --background: var(--ion-color-step-50, #f2f2f2);\n  --max-width: 270px;\n  --max-height: 90%;\n  --spinner-color: var(--ion-color-step-600, #666666);\n  color: var(--ion-text-color, #000);\n  font-size: 14px; }\n\n.loading-wrapper.sc-ion-loading-ios {\n  border-radius: 8px;\n  padding: 24px 34px; }\n\n.loading-translucent.sc-ion-loading-ios-h   .loading-wrapper.sc-ion-loading-ios {\n  background-color: rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.8);\n  -webkit-backdrop-filter: saturate(180%) blur(20px);\n  backdrop-filter: saturate(180%) blur(20px); }\n\n.loading-content.sc-ion-loading-ios {\n  font-weight: bold; }\n\n.loading-spinner.sc-ion-loading-ios    + .loading-content.sc-ion-loading-ios {\n  margin-left: 16px; }"; }
    static get styleMode() { return "ios"; }
}

class LoadingController {
    create(opts) {
        return createOverlay(this.doc.createElement("ion-loading"), opts);
    }
    dismiss(data, role, id) {
        return dismissOverlay(this.doc, data, role, "ion-loading", id);
    }
    async getTop() {
        return getOverlay(this.doc, "ion-loading");
    }
    static get is() { return "ion-loading-controller"; }
    static get properties() {
        return {
            "create": {
                "method": true
            },
            "dismiss": {
                "method": true
            },
            "doc": {
                "context": "document"
            },
            "getTop": {
                "method": true
            }
        };
    }
}

const spinners = {
    'lines': {
        dur: 1000,
        lines: 12,
        fn: (dur, index, total) => {
            const transform = `rotate(${30 * index + (index < 6 ? 180 : -180)}deg)`;
            const animationDelay = `${(dur * index / total) - dur}ms`;
            return {
                y1: 17,
                y2: 29,
                style: {
                    'transform': transform,
                    'animation-delay': animationDelay,
                }
            };
        }
    },
    'lines-small': {
        dur: 1000,
        lines: 12,
        fn: (dur, index, total) => {
            const transform = `rotate(${30 * index + (index < 6 ? 180 : -180)}deg)`;
            const animationDelay = `${(dur * index / total) - dur}ms`;
            return {
                y1: 12,
                y2: 20,
                style: {
                    'transform': transform,
                    'animation-delay': animationDelay,
                }
            };
        }
    },
    'bubbles': {
        dur: 1000,
        circles: 9,
        fn: (dur, index, total) => {
            const animationDelay = `${(dur * index / total) - dur}ms`;
            const angle = 2 * Math.PI * index / total;
            return {
                r: 5,
                style: {
                    'top': `${9 * Math.sin(angle)}px`,
                    'left': `${9 * Math.cos(angle)}px`,
                    'animation-delay': animationDelay,
                }
            };
        }
    },
    'circles': {
        dur: 1000,
        circles: 8,
        fn: (dur, index, total) => {
            const step = index / total;
            const animationDelay = `${(dur * step) - dur}ms`;
            const angle = 2 * Math.PI * step;
            return {
                r: 5,
                style: {
                    'top': `${9 * Math.sin(angle)}px`,
                    'left': `${9 * Math.cos(angle)}px`,
                    'animation-delay': animationDelay,
                }
            };
        }
    },
    'crescent': {
        dur: 750,
        circles: 1,
        fn: () => {
            return {
                r: 26,
                style: {}
            };
        }
    },
    'dots': {
        dur: 750,
        circles: 3,
        fn: (_, index) => {
            const animationDelay = -(110 * index) + 'ms';
            return {
                r: 6,
                style: {
                    'left': `${9 - (9 * index)}px`,
                    'animation-delay': animationDelay,
                }
            };
        }
    }
};
const SPINNERS = spinners;

class Spinner {
    constructor() {
        this.paused = false;
    }
    getName() {
        const name = this.name || this.config.get("spinner");
        if (name) {
            return name;
        }
        return (this.mode === "ios") ? "lines" : "crescent";
    }
    hostData() {
        return {
            class: Object.assign({}, createColorClasses(this.color), { [`spinner-${this.getName()}`]: true, "spinner-paused": !!this.paused || this.config.getBoolean("_testing") })
        };
    }
    render() {
        const name = this.getName();
        const spinner = SPINNERS[name] || SPINNERS["lines"];
        const duration = (typeof this.duration === "number" && this.duration > 10 ? this.duration : spinner.dur);
        const svgs = [];
        if (spinner.circles !== undefined) {
            for (let i = 0; i < spinner.circles; i++) {
                svgs.push(buildCircle(spinner, duration, i, spinner.circles));
            }
        }
        else if (spinner.lines !== undefined) {
            for (let i = 0; i < spinner.lines; i++) {
                svgs.push(buildLine(spinner, duration, i, spinner.lines));
            }
        }
        return svgs;
    }
    static get is() { return "ion-spinner"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "color": {
                "type": String,
                "attr": "color"
            },
            "config": {
                "context": "config"
            },
            "duration": {
                "type": Number,
                "attr": "duration"
            },
            "name": {
                "type": String,
                "attr": "name"
            },
            "paused": {
                "type": Boolean,
                "attr": "paused"
            }
        };
    }
    static get style() { return ":host {\n  /**\n   * \@prop --color: Color of the spinner\n   */\n  display: inline-block;\n  position: relative;\n  width: 28px;\n  height: 28px;\n  color: var(--color);\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none; }\n\n:host(.ion-color) {\n  color: var(--ion-color-base); }\n\nsvg {\n  left: 0;\n  top: 0;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  -webkit-transform: translateZ(0);\n  transform: translateZ(0); }\n\n:host(.spinner-lines) line,\n:host(.spinner-lines-small) line {\n  stroke-width: 4px;\n  stroke-linecap: round;\n  stroke: currentColor; }\n\n:host(.spinner-lines) svg,\n:host(.spinner-lines-small) svg {\n  -webkit-animation: spinner-fade-out 1s linear infinite;\n  animation: spinner-fade-out 1s linear infinite; }\n\n:host(.spinner-bubbles) svg {\n  -webkit-animation: spinner-scale-out 1s linear infinite;\n  animation: spinner-scale-out 1s linear infinite;\n  fill: currentColor; }\n\n:host(.spinner-circles) svg {\n  -webkit-animation: spinner-fade-out 1s linear infinite;\n  animation: spinner-fade-out 1s linear infinite;\n  fill: currentColor; }\n\n:host(.spinner-crescent) circle {\n  fill: transparent;\n  stroke-width: 4px;\n  stroke-dasharray: 128px;\n  stroke-dashoffset: 82px;\n  stroke: currentColor; }\n\n:host(.spinner-crescent) svg {\n  -webkit-animation: spinner-rotate 1s linear infinite;\n  animation: spinner-rotate 1s linear infinite; }\n\n:host(.spinner-dots) circle {\n  stroke-width: 0;\n  fill: currentColor; }\n\n:host(.spinner-dots) svg {\n  -webkit-transform-origin: center;\n  transform-origin: center;\n  -webkit-animation: spinner-dots 1s linear infinite;\n  animation: spinner-dots 1s linear infinite; }\n\n:host(.spinner-paused) svg {\n  -webkit-animation-play-state: paused;\n  animation-play-state: paused; }\n\n\@-webkit-keyframes spinner-fade-out {\n  0% {\n    opacity: 1; }\n  100% {\n    opacity: 0; } }\n\n\@keyframes spinner-fade-out {\n  0% {\n    opacity: 1; }\n  100% {\n    opacity: 0; } }\n\n\@-webkit-keyframes spinner-scale-out {\n  0% {\n    -webkit-transform: scale(1, 1);\n    transform: scale(1, 1); }\n  100% {\n    -webkit-transform: scale(0, 0);\n    transform: scale(0, 0); } }\n\n\@keyframes spinner-scale-out {\n  0% {\n    -webkit-transform: scale(1, 1);\n    transform: scale(1, 1); }\n  100% {\n    -webkit-transform: scale(0, 0);\n    transform: scale(0, 0); } }\n\n\@-webkit-keyframes spinner-rotate {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg); } }\n\n\@keyframes spinner-rotate {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg); } }\n\n\@-webkit-keyframes spinner-dots {\n  0% {\n    -webkit-transform: scale(1, 1);\n    transform: scale(1, 1);\n    opacity: .9; }\n  50% {\n    -webkit-transform: scale(0.4, 0.4);\n    transform: scale(0.4, 0.4);\n    opacity: .3; }\n  100% {\n    -webkit-transform: scale(1, 1);\n    transform: scale(1, 1);\n    opacity: .9; } }\n\n\@keyframes spinner-dots {\n  0% {\n    -webkit-transform: scale(1, 1);\n    transform: scale(1, 1);\n    opacity: .9; }\n  50% {\n    -webkit-transform: scale(0.4, 0.4);\n    transform: scale(0.4, 0.4);\n    opacity: .3; }\n  100% {\n    -webkit-transform: scale(1, 1);\n    transform: scale(1, 1);\n    opacity: .9; } }"; }
}
function buildCircle(spinner, duration, index, total) {
    const data = spinner.fn(duration, index, total);
    data.style["animation-duration"] = `${duration}ms`;
    return (h("svg", { viewBox: "0 0 64 64", style: data.style }, h("circle", { transform: "translate(32,32)", r: data.r })));
}
function buildLine(spinner, duration, index, total) {
    const data = spinner.fn(duration, index, total);
    data.style["animation-duration"] = `${duration}ms`;
    return (h("svg", { viewBox: "0 0 64 64", style: data.style }, h("line", { transform: "translate(32,32)", y1: data.y1, y2: data.y2 })));
}

export { AppHome, Backdrop as IonBackdrop, Fab as IonFab, FabButton as IonFabButton, Loading as IonLoading, LoadingController as IonLoadingController, Spinner as IonSpinner };
