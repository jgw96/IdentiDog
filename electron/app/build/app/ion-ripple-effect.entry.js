const h = window.App.h;

class RippleEffect {
    constructor() {
        this.type = "bounded";
    }
    async addRipple(pageX, pageY) {
        return new Promise(resolve => {
            this.queue.read(() => {
                const rect = this.el.getBoundingClientRect();
                const width = rect.width;
                const height = rect.height;
                const hypotenuse = Math.sqrt(width * width + height * height);
                const maxDim = Math.max(height, width);
                const maxRadius = this.unbounded ? maxDim : hypotenuse + PADDING;
                const initialSize = Math.floor(maxDim * INITIAL_ORIGIN_SCALE);
                const finalScale = maxRadius / initialSize;
                let posX = pageX - rect.left;
                let posY = pageY - rect.top;
                if (this.unbounded) {
                    posX = width * 0.5;
                    posY = height * 0.5;
                }
                const x = posX - initialSize * 0.5;
                const y = posY - initialSize * 0.5;
                const moveX = width * 0.5 - posX;
                const moveY = height * 0.5 - posY;
                this.queue.write(() => {
                    const div = this.win.document.createElement("div");
                    div.classList.add("ripple-effect");
                    const style = div.style;
                    style.top = y + "px";
                    style.left = x + "px";
                    style.width = style.height = initialSize + "px";
                    style.setProperty("--final-scale", `${finalScale}`);
                    style.setProperty("--translate-end", `${moveX}px, ${moveY}px`);
                    const container = this.el.shadowRoot || this.el;
                    container.appendChild(div);
                    setTimeout(() => {
                        resolve(() => {
                            removeRipple(div);
                        });
                    }, 225 + 100);
                });
            });
        });
    }
    get unbounded() {
        return this.type === "unbounded";
    }
    hostData() {
        return {
            role: "presentation",
            class: {
                "unbounded": this.unbounded
            }
        };
    }
    static get is() { return "ion-ripple-effect"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "addRipple": {
                "method": true
            },
            "el": {
                "elementRef": true
            },
            "queue": {
                "context": "queue"
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
    static get style() { return ":host {\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  position: absolute;\n  contain: strict; }\n\n:host(.unbounded) {\n  contain: layout size style; }\n\n.ripple-effect {\n  border-radius: 50%;\n  position: absolute;\n  background-color: currentColor;\n  color: inherit;\n  contain: strict;\n  opacity: 0;\n  -webkit-animation: 225ms rippleAnimation forwards, 75ms fadeInAnimation forwards;\n  animation: 225ms rippleAnimation forwards, 75ms fadeInAnimation forwards;\n  will-change: transform, opacity;\n  pointer-events: none; }\n\n.fade-out {\n  -webkit-transform: translate(var(--translate-end)) scale(var(--final-scale, 1));\n  transform: translate(var(--translate-end)) scale(var(--final-scale, 1));\n  -webkit-animation: 150ms fadeOutAnimation forwards;\n  animation: 150ms fadeOutAnimation forwards; }\n\n\@-webkit-keyframes rippleAnimation {\n  from {\n    -webkit-animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n    -webkit-transform: scale(1);\n    transform: scale(1); }\n  to {\n    -webkit-transform: translate(var(--translate-end)) scale(var(--final-scale, 1));\n    transform: translate(var(--translate-end)) scale(var(--final-scale, 1)); } }\n\n\@keyframes rippleAnimation {\n  from {\n    -webkit-animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n    -webkit-transform: scale(1);\n    transform: scale(1); }\n  to {\n    -webkit-transform: translate(var(--translate-end)) scale(var(--final-scale, 1));\n    transform: translate(var(--translate-end)) scale(var(--final-scale, 1)); } }\n\n\@-webkit-keyframes fadeInAnimation {\n  from {\n    -webkit-animation-timing-function: linear;\n    animation-timing-function: linear;\n    opacity: 0; }\n  to {\n    opacity: 0.16; } }\n\n\@keyframes fadeInAnimation {\n  from {\n    -webkit-animation-timing-function: linear;\n    animation-timing-function: linear;\n    opacity: 0; }\n  to {\n    opacity: 0.16; } }\n\n\@-webkit-keyframes fadeOutAnimation {\n  from {\n    -webkit-animation-timing-function: linear;\n    animation-timing-function: linear;\n    opacity: 0.16; }\n  to {\n    opacity: 0; } }\n\n\@keyframes fadeOutAnimation {\n  from {\n    -webkit-animation-timing-function: linear;\n    animation-timing-function: linear;\n    opacity: 0.16; }\n  to {\n    opacity: 0; } }"; }
}
function removeRipple(ripple) {
    ripple.classList.add("fade-out");
    setTimeout(() => {
        ripple.remove();
    }, 200);
}
const PADDING = 10;
const INITIAL_ORIGIN_SCALE = 0.5;

export { RippleEffect as IonRippleEffect };
