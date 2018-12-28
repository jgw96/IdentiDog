const h = window.App.h;

import { e as createOverlay, f as dismissOverlay, g as getOverlay } from './chunk-ce5bf207.js';

class ToastController {
    create(opts) {
        return createOverlay(this.doc.createElement("ion-toast"), opts);
    }
    dismiss(data, role, id) {
        return dismissOverlay(this.doc, data, role, "ion-toast", id);
    }
    async getTop() {
        return getOverlay(this.doc, "ion-toast");
    }
    static get is() { return "ion-toast-controller"; }
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

export { ToastController as IonToastController };
