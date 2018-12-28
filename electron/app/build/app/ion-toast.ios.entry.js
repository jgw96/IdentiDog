const h = window.App.h;

import { a as createColorClasses, d as getClassMap } from './chunk-0f8926dc.js';
import { b as dismiss, c as eventMethod, d as present } from './chunk-ce5bf207.js';

function iosEnterAnimation(AnimationC, baseEl, position) {
    const baseAnimation = new AnimationC();
    const wrapperAnimation = new AnimationC();
    const hostEl = baseEl.host || baseEl;
    const wrapperEl = baseEl.querySelector('.toast-wrapper');
    wrapperAnimation.addElement(wrapperEl);
    const bottom = `calc(-10px - var(--ion-safe-area-bottom, 0px))`;
    const top = `calc(10px + var(--ion-safe-area-top, 0px))`;
    switch (position) {
        case 'top':
            wrapperAnimation.fromTo('translateY', '-100%', top);
            break;
        case 'middle':
            const topPosition = Math.floor(hostEl.clientHeight / 2 - wrapperEl.clientHeight / 2);
            wrapperEl.style.top = `${topPosition}px`;
            wrapperAnimation.fromTo('opacity', 0.01, 1);
            break;
        default:
            wrapperAnimation.fromTo('translateY', '100%', bottom);
            break;
    }
    return Promise.resolve(baseAnimation
        .addElement(hostEl)
        .easing('cubic-bezier(.155,1.105,.295,1.12)')
        .duration(400)
        .add(wrapperAnimation));
}

function iosLeaveAnimation(AnimationC, baseEl, position) {
    const baseAnimation = new AnimationC();
    const wrapperAnimation = new AnimationC();
    const hostEl = baseEl.host || baseEl;
    const wrapperEl = baseEl.querySelector('.toast-wrapper');
    wrapperAnimation.addElement(wrapperEl);
    const bottom = `calc(-10px - var(--ion-safe-area-bottom, 0px))`;
    const top = `calc(10px + var(--ion-safe-area-top, 0px))`;
    switch (position) {
        case 'top':
            wrapperAnimation.fromTo('translateY', top, '-100%');
            break;
        case 'middle':
            wrapperAnimation.fromTo('opacity', 0.99, 0);
            break;
        default:
            wrapperAnimation.fromTo('translateY', bottom, '100%');
            break;
    }
    return Promise.resolve(baseAnimation
        .addElement(hostEl)
        .easing('cubic-bezier(.36,.66,.04,1)')
        .duration(300)
        .add(wrapperAnimation));
}

function mdEnterAnimation(AnimationC, baseEl, position) {
    const baseAnimation = new AnimationC();
    const wrapperAnimation = new AnimationC();
    const hostEl = baseEl.host || baseEl;
    const wrapperEl = baseEl.querySelector('.toast-wrapper');
    wrapperAnimation.addElement(wrapperEl);
    const bottom = `calc(8px + var(--ion-safe-area-bottom, 0px))`;
    const top = `calc(8px + var(--ion-safe-area-top, 0px))`;
    switch (position) {
        case 'top':
            wrapperEl.style.top = top;
            wrapperAnimation.fromTo('opacity', 0.01, 1);
            break;
        case 'middle':
            const topPosition = Math.floor(hostEl.clientHeight / 2 - wrapperEl.clientHeight / 2);
            wrapperEl.style.top = `${topPosition}px`;
            wrapperAnimation.fromTo('opacity', 0.01, 1);
            break;
        default:
            wrapperEl.style.bottom = bottom;
            wrapperAnimation.fromTo('opacity', 0.01, 1);
            break;
    }
    return Promise.resolve(baseAnimation
        .addElement(hostEl)
        .easing('cubic-bezier(.36,.66,.04,1)')
        .duration(400)
        .add(wrapperAnimation));
}

function mdLeaveAnimation(AnimationC, baseEl) {
    const baseAnimation = new AnimationC();
    const wrapperAnimation = new AnimationC();
    const hostEl = baseEl.host || baseEl;
    const wrapperEl = baseEl.querySelector('.toast-wrapper');
    wrapperAnimation.addElement(wrapperEl);
    wrapperAnimation.fromTo('opacity', 0.99, 0);
    return Promise.resolve(baseAnimation
        .addElement(hostEl)
        .easing('cubic-bezier(.36,.66,.04,1)')
        .duration(300)
        .add(wrapperAnimation));
}

class Toast {
    constructor() {
        this.presented = false;
        this.duration = 0;
        this.keyboardClose = false;
        this.position = "bottom";
        this.showCloseButton = false;
        this.translucent = false;
        this.animated = true;
    }
    componentDidLoad() {
        this.ionToastDidLoad.emit();
    }
    componentDidUnload() {
        this.ionToastDidUnload.emit();
    }
    async present() {
        await present(this, "toastEnter", iosEnterAnimation, mdEnterAnimation, this.position);
        if (this.duration > 0) {
            this.durationTimeout = setTimeout(() => this.dismiss(undefined, "timeout"), this.duration);
        }
    }
    dismiss(data, role) {
        if (this.durationTimeout) {
            clearTimeout(this.durationTimeout);
        }
        return dismiss(this, data, role, "toastLeave", iosLeaveAnimation, mdLeaveAnimation, this.position);
    }
    onDidDismiss() {
        return eventMethod(this.el, "ionToastDidDismiss");
    }
    onWillDismiss() {
        return eventMethod(this.el, "ionToastWillDismiss");
    }
    hostData() {
        return {
            style: {
                zIndex: 60000 + this.overlayIndex,
            },
            class: Object.assign({}, createColorClasses(this.color), getClassMap(this.cssClass), { "toast-translucent": this.translucent })
        };
    }
    render() {
        const wrapperClass = {
            "toast-wrapper": true,
            [`toast-${this.position}`]: true
        };
        return (h("div", { class: wrapperClass }, h("div", { class: "toast-container" }, this.message !== undefined &&
            h("div", { class: "toast-message" }, this.message), this.showCloseButton &&
            h("ion-button", { fill: "clear", class: "toast-button ion-activatable", onClick: () => this.dismiss(undefined, "cancel") }, this.closeButtonText || "Close"))));
    }
    static get is() { return "ion-toast"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "animated": {
                "type": Boolean,
                "attr": "animated"
            },
            "animationCtrl": {
                "connect": "ion-animation-controller"
            },
            "closeButtonText": {
                "type": String,
                "attr": "close-button-text"
            },
            "color": {
                "type": String,
                "attr": "color"
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
            "position": {
                "type": String,
                "attr": "position"
            },
            "present": {
                "method": true
            },
            "showCloseButton": {
                "type": Boolean,
                "attr": "show-close-button"
            },
            "translucent": {
                "type": Boolean,
                "attr": "translucent"
            }
        };
    }
    static get events() {
        return [{
                "name": "ionToastDidLoad",
                "method": "ionToastDidLoad",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionToastDidPresent",
                "method": "didPresent",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionToastWillPresent",
                "method": "willPresent",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionToastWillDismiss",
                "method": "willDismiss",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionToastDidDismiss",
                "method": "didDismiss",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionToastDidUnload",
                "method": "ionToastDidUnload",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }];
    }
    static get style() { return ":host {\n  /**\n   * \@prop --background: Background of the toast\n   * \@prop --color: Color of the toast text\n   *\n   * \@prop --border-color: Border color of the toast\n   * \@prop --border-radius: Border radius of the toast\n   * \@prop --border-width: Border width of the toast\n   * \@prop --border-style: Border style of the toast\n   *\n   * \@prop --box-shadow: Box shadow of the toast\n   *\n   * \@prop --min-width: Minimum width of the toast\n   * \@prop --width: Width of the toast\n   * \@prop --max-width: Maximum width of the toast\n   *\n   * \@prop --min-height: Minimum height of the toast\n   * \@prop --height: Height of the toast\n   * \@prop --max-height: Maximum height of the toast\n   *\n   * \@prop --button-color: Color of the button text\n   */\n  --border-width: 0;\n  --border-style: none;\n  --border-color: initial;\n  --box-shadow: none;\n  --min-width: auto;\n  --width: auto;\n  --min-height: auto;\n  --height: auto;\n  --max-height: auto;\n  left: 0;\n  top: 0;\n  display: block;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  color: var(--color);\n  font-family: var(--ion-font-family, inherit);\n  contain: strict;\n  z-index: 1000;\n  pointer-events: none; }\n\n:host(.ion-color) {\n  --button-color: inherit;\n  color: var(--ion-color-contrast); }\n\n:host(.ion-color) .toast-wrapper {\n  background: var(--ion-color-base); }\n\n.toast-wrapper {\n  border-radius: var(--border-radius);\n  width: var(--width);\n  min-width: var(--min-width);\n  max-width: var(--max-width);\n  height: var(--height);\n  min-height: var(--min-height);\n  max-height: var(--max-height);\n  border-width: var(--border-width);\n  border-style: var(--border-style);\n  border-color: var(--border-color);\n  background: var(--background);\n  -webkit-box-shadow: var(--box-shadow);\n  box-shadow: var(--box-shadow); }\n\n.toast-container {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n  align-items: center;\n  pointer-events: auto;\n  contain: content; }\n\n.toast-button {\n  color: var(--button-color); }\n\n.toast-message {\n  -ms-flex: 1;\n  flex: 1;\n  white-space: pre-wrap; }\n\n:host {\n  --background: var(--ion-color-step-50, #f2f2f2);\n  --border-radius: 14px;\n  --button-color: var(--ion-color-step-600, #666666);\n  --color: var(--ion-color-step-850, #262626);\n  --max-width: 700px;\n  font-size: 14px; }\n\n.toast-wrapper {\n  left: 10px;\n  right: 10px;\n  margin: auto;\n  display: block;\n  position: absolute;\n  z-index: 10; }\n\n:host(.toast-translucent) .toast-wrapper {\n  background: rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.8);\n  -webkit-backdrop-filter: saturate(180%) blur(20px);\n  backdrop-filter: saturate(180%) blur(20px); }\n\n.toast-wrapper.toast-top {\n  -webkit-transform: translate3d(0,  -100%,  0);\n  transform: translate3d(0,  -100%,  0);\n  top: 0; }\n\n.toast-wrapper.toast-middle {\n  opacity: .01; }\n\n.toast-wrapper.toast-bottom {\n  -webkit-transform: translate3d(0,  100%,  0);\n  transform: translate3d(0,  100%,  0);\n  bottom: 0; }\n\n.toast-message {\n  padding: 15px; }\n\n.toast-button {\n  font-size: 15px; }"; }
    static get styleMode() { return "ios"; }
}

export { Toast as IonToast };
