var __awaiter=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))(function(r,i){function a(e){try{c(o.next(e))}catch(e){i(e)}}function s(e){try{c(o.throw(e))}catch(e){i(e)}}function c(e){e.done?r(e.value):new n(function(t){t(e.value)}).then(a,s)}c((o=o.apply(e,t||[])).next())})},__generator=this&&this.__generator||function(e,t){var n,o,r,i,a={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,o&&(r=2&i[0]?o.return:i[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,i[1])).done)return r;switch(o=0,r&&(i=[2&i[0],r.value]),i[0]){case 0:case 1:r=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,o=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(r=(r=a.trys).length>0&&r[r.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!r||i[1]>r[0]&&i[1]<r[3])){a.label=i[1];break}if(6===i[0]&&a.label<r[1]){a.label=r[1],r=i;break}if(r&&a.label<r[2]){a.label=r[2],a.ops.push(i);break}r[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],o=0}finally{n=r=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}};App.loadBundle("fkn00lub",["exports","./chunk-31e25466.js","./chunk-96ecf18f.js","./chunk-187ef6fc.js","./chunk-b760673a.js"],function(e,t,n,o,r){var i=window.App.h,a=function(){function e(){this.toastCtrl=null,this.loadingCtrl=null,this.streaming=!1}return e.prototype.componentDidLoad=function(){return __awaiter(this,void 0,void 0,function(){var e;return __generator(this,function(t){switch(t.label){case 0:return navigator.permissions?[4,navigator.permissions.query({name:"camera"})]:[3,3];case 1:return e=t.sent(),console.log(e.state),"granted"!==e.state?[3,3]:[4,this.doStream()];case 2:t.sent(),t.label=3;case 3:return[2]}})})},e.prototype.doStream=function(){return __awaiter(this,void 0,void 0,function(){var e;return __generator(this,function(t){switch(t.label){case 0:return this.streaming=!0,e=this,[4,navigator.mediaDevices.getUserMedia({audio:!1,video:{facingMode:"environment"}})];case 1:return e.stream=t.sent(),this.stream&&(this.videoEl.srcObject=this.stream,console.log("connected stream to video element"),this.setUpCamera()),[2]}})})},e.prototype.setUpCamera=function(){var e=this.stream.getVideoTracks()[0];this.imageCapture=new ImageCapture(e)},e.prototype.takePhoto=function(){return __awaiter(this,void 0,void 0,function(){var e,t;return __generator(this,function(n){switch(n.label){case 0:return this.imageCapture?[4,this.loadingCtrl.create({message:"Thinking..."})]:[3,7];case 1:return[4,(e=n.sent()).present()];case 2:return n.sent(),[4,this.imageCapture.takePhoto()];case 3:return[4,function(e){return __awaiter(this,void 0,void 0,function(){var t;return __generator(this,function(n){switch(n.label){case 0:return[4,fetch("https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/216d2186-e826-4d9e-9ab4-b42b34ed65d4/image?iterationId=778e2d68-a120-45c1-bbeb-e18fc243d970",{method:"POST",headers:{"Content-Type":"application/octet-stream","Prediction-Key":"2a58718ea5834c3bab8f64e0f5ce67e3"},body:e})];case 1:return[4,n.sent().json()];case 2:return t=n.sent(),console.log(t),[2,t]}})})}(n.sent())];case 4:return t=n.sent(),[4,e.dismiss()];case 5:return n.sent(),[4,this.showPred(t.predictions[0])];case 6:n.sent(),n.label=7;case 7:return[2]}})})},e.prototype.showPred=function(e){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){switch(t.label){case 0:return[4,this.toastCtrl.create({message:"I am "+Math.round(e.probability/1*100)+"% sure this is a "+e.tagName,showCloseButton:!0,closeButtonText:"OK"})];case 1:return[4,t.sent().present()];case 2:return t.sent(),[2]}})})},e.prototype.render=function(){var e=this;return[i("ion-content",null,this.streaming?i("main",null,i("video",{autoplay:!0,id:"mainVideo",ref:function(t){return e.videoEl=t}})):i("div",{id:"intro"},i("img",{src:"/assets/dog.svg",alt:"dog header image"}),i("h1",null,"IdentiDog"),i("p",null,"IdentiDog uses artificial intelligence to help you identify dog breeds. To do this we need access to the camera so that we can see what it is pointed at, click below to give IdentiDog access to your camera and get started!"),i("ion-button",{onClick:function(){return e.doStream()}},"Get Started")),this.streaming?i("ion-fab",{vertical:"bottom",horizontal:"center",slot:"fixed"},i("ion-fab-button",{onClick:function(){return e.takePhoto()}},i("ion-icon",{name:"eye"}))):null)]},Object.defineProperty(e,"is",{get:function(){return"app-home"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{loadingCtrl:{connect:"ion-loading-controller"},streaming:{state:!0},toastCtrl:{connect:"ion-toast-controller"}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return"#mainVideo{position:fixed;top:0;left:0;right:0;bottom:0;-o-object-fit:cover;object-fit:cover;height:100%;width:100%}#intro{border-radius:10px;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;text-align:center;color:#000;padding:1em;margin:2em}#intro img{margin-bottom:2em}"},enumerable:!0,configurable:!0}),e}(),s=function(){function e(){this.lastClick=-1e4,this.blocker=t.GESTURE_CONTROLLER.createBlocker({disableScroll:!0}),this.visible=!0,this.tappable=!0,this.stopPropagation=!0}return e.prototype.componentDidLoad=function(){this.stopPropagation&&this.blocker.block()},e.prototype.componentDidUnload=function(){this.blocker.destroy()},e.prototype.onTouchStart=function(e){this.lastClick=n.now(e),this.emitTap(e)},e.prototype.onMouseDown=function(e){this.lastClick<n.now(e)-2500&&this.emitTap(e)},e.prototype.emitTap=function(e){this.stopPropagation&&(e.preventDefault(),e.stopPropagation()),this.tappable&&this.ionBackdropTap.emit()},e.prototype.hostData=function(){return{tabindex:"-1",class:{"backdrop-hide":!this.visible,"backdrop-no-tappable":!this.tappable}}},Object.defineProperty(e,"is",{get:function(){return"ion-backdrop"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{doc:{context:"document"},stopPropagation:{type:Boolean,attr:"stop-propagation"},tappable:{type:Boolean,attr:"tappable"},visible:{type:Boolean,attr:"visible"}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"events",{get:function(){return[{name:"ionBackdropTap",method:"ionBackdropTap",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(e,"listeners",{get:function(){return[{name:"touchstart",method:"onTouchStart",capture:!0},{name:"click",method:"onMouseDown",capture:!0},{name:"mousedown",method:"onMouseDown",capture:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return":host{left:0;right:0;top:0;bottom:0;display:block;position:absolute;-webkit-transform:translateZ(0);transform:translateZ(0);contain:strict;cursor:pointer;opacity:.01;-ms-touch-action:none;touch-action:none;z-index:2}:host(.backdrop-hide){background:transparent}:host(.backdrop-no-tappable){cursor:auto}:host{background-color:var(--ion-backdrop-color,#000)}"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"styleMode",{get:function(){return"ios"},enumerable:!0,configurable:!0}),e}(),c=function(){function e(){this.edge=!1,this.activated=!1}return e.prototype.activatedChanged=function(){var e=this.activated,t=this.el.querySelector("ion-fab-button");t&&(t.activated=e),Array.from(this.el.querySelectorAll("ion-fab-list")).forEach(function(t){t.activated=e})},e.prototype.componentDidLoad=function(){this.activated&&this.activatedChanged()},e.prototype.onClick=function(){this.el.querySelector("ion-fab-list")&&(this.activated=!this.activated)},e.prototype.close=function(){this.activated=!1},e.prototype.hostData=function(){var e;return{class:(e={},e["fab-horizontal-"+this.horizontal]=void 0!==this.horizontal,e["fab-vertical-"+this.vertical]=void 0!==this.vertical,e["fab-edge"]=this.edge,e)}},e.prototype.render=function(){return i("slot",null)},Object.defineProperty(e,"is",{get:function(){return"ion-fab"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{activated:{type:Boolean,attr:"activated",mutable:!0,watchCallbacks:["activatedChanged"]},close:{method:!0},edge:{type:Boolean,attr:"edge"},el:{elementRef:!0},horizontal:{type:String,attr:"horizontal"},vertical:{type:String,attr:"vertical"}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"listeners",{get:function(){return[{name:"click",method:"onClick"}]},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return":host{position:absolute;z-index:999}:host(.fab-horizontal-center){left:50%;margin-left:-28px}:host(.fab-horizontal-start){left:calc(10px + var(--ion-safe-area-left, 0px))}:host(.fab-horizontal-end){right:calc(10px + var(--ion-safe-area-right, 0px))}:host(.fab-vertical-top){top:10px}:host(.fab-vertical-top.fab-edge){top:-28px}:host(.fab-vertical-bottom){bottom:10px}:host(.fab-vertical-bottom.fab-edge){bottom:-28px}:host(.fab-vertical-center){margin-top:-28px;top:50%}"},enumerable:!0,configurable:!0}),e}(),l=function(){function e(){var e=this;this.keyFocus=!1,this.activated=!1,this.disabled=!1,this.routerDirection="forward",this.show=!1,this.translucent=!1,this.type="button",this.onFocus=function(){e.ionFocus.emit()},this.onKeyUp=function(){e.keyFocus=!0},this.onBlur=function(){e.keyFocus=!1,e.ionBlur.emit()}}return e.prototype.hostData=function(){var e,t=this,n=t.disabled,r=t.color,i=t.activated,a=t.show,s=t.translucent,c=t.size,l=t.keyFocus,u=o.hostContext("ion-fab-list",t.el);return{"aria-disabled":n?"true":null,class:Object.assign({},o.createColorClasses(r),(e={"fab-button-in-list":u,"fab-button-translucent-in-list":u&&s,"fab-button-close-active":i,"fab-button-show":a,"fab-button-disabled":n,"fab-button-translucent":s,"ion-activatable":!0,focused:l},e["fab-button-"+c]=void 0!==c,e))}},e.prototype.render=function(){var e=this,t=void 0===this.href?"button":"a";return i(t,Object.assign({},"button"===t?{type:this.type}:{href:this.href},{class:"button-native",disabled:this.disabled,onFocus:this.onFocus,onKeyUp:this.onKeyUp,onBlur:this.onBlur,onClick:function(t){return o.openURL(e.win,e.href,t,e.routerDirection)}}),i("span",{class:"close-icon"},i("ion-icon",{name:"close",lazy:!1})),i("span",{class:"button-inner"},i("slot",null)),"md"===this.mode&&i("ion-ripple-effect",null))},Object.defineProperty(e,"is",{get:function(){return"ion-fab-button"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{activated:{type:Boolean,attr:"activated"},color:{type:String,attr:"color"},disabled:{type:Boolean,attr:"disabled"},el:{elementRef:!0},href:{type:String,attr:"href"},keyFocus:{state:!0},mode:{type:String,attr:"mode"},routerDirection:{type:String,attr:"router-direction"},show:{type:Boolean,attr:"show"},size:{type:String,attr:"size"},translucent:{type:Boolean,attr:"translucent"},type:{type:String,attr:"type"},win:{context:"window"}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"events",{get:function(){return[{name:"ionFocus",method:"ionFocus",bubbles:!0,cancelable:!0,composed:!0},{name:"ionBlur",method:"ionBlur",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return":host{--transition:background-color,opacity 100ms linear;--ripple-color:currentColor;--border-radius:50%;--border-width:0;--border-style:none;--border-color:initial;margin:0;display:block;width:56px;height:56px;font-size:14px;text-align:center;text-overflow:ellipsis;text-transform:none;white-space:nowrap;-webkit-font-kerning:none;font-kerning:none}:host(.ion-color) .button-native{background:var(--ion-color-base);color:var(--ion-color-contrast)}:host(.ion-color.activated) .button-native,:host(.ion-color.focused) .button-native{background:var(--ion-color-shade);color:var(--ion-color-contrast)}.button-native{border-radius:var(--border-radius);padding:var(--padding-top) var(--padding-end) var(--padding-bottom) var(--padding-start);font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;display:block;position:relative;width:100%;height:100%;-webkit-transform:var(--transform);transform:var(--transform);-webkit-transition:var(--transition);transition:var(--transition);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);outline:none;background:var(--background);background-clip:padding-box;color:var(--color);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow);contain:strict;cursor:pointer;overflow:hidden;z-index:0;-webkit-appearance:none;-moz-appearance:none;appearance:none}.button-inner{left:0;right:0;top:0;display:-ms-flexbox;display:flex;position:absolute;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;height:100%;-webkit-transition:all .3s ease-in-out;transition:all .3s ease-in-out;-webkit-transition-property:opacity,-webkit-transform;transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform}:host(.activated) .button-native{background:var(--background-activated);color:var(--color-activated)}:host(.focused) .button-native{background:var(--background-focused);color:var(--color-focused)}:host(.fab-button-disabled){pointer-events:none}.button-native[disabled]{cursor:default;opacity:.5;pointer-events:none}::slotted(ion-icon){line-height:1}:host(.fab-button-small){margin:8px;width:40px;height:40px}.close-icon{left:0;right:0;top:0;display:-ms-flexbox;display:flex;position:absolute;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;height:100%;-webkit-transform:scale(.4) rotate(-45deg);transform:scale(.4) rotate(-45deg);-webkit-transition:all .3s ease-in-out;transition:all .3s ease-in-out;-webkit-transition-property:opacity,-webkit-transform;transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform;opacity:0}:host(.fab-button-close-active) .close-icon{-webkit-transform:scale(1) rotate(0deg);transform:scale(1) rotate(0deg);opacity:1}:host(.fab-button-close-active) .button-inner{-webkit-transform:scale(.4) rotate(45deg);transform:scale(.4) rotate(45deg);opacity:0}ion-ripple-effect{color:var(--ripple-color)}:host{--background:var(--ion-color-primary,#3880ff);--background-activated:var(--ion-color-primary-shade,#3171e0);--background-focused:var(--background-activated);--color:var(--ion-color-primary-contrast,#fff);--color-activated:var(--ion-color-primary-contrast,#fff);--color-focused:var(--color-activated);--transition:0.2s transform cubic-bezier(0.25,1.11,0.78,1.59)}:host,:host(.activated){--box-shadow:0 4px 16px rgba(0,0,0,0.12)}:host(.activated){--transform:scale(1.1);--transition:0.2s transform ease-out}.close-icon,::slotted(ion-icon){font-size:28px}:host(.fab-button-in-list){--background:var(--ion-color-light,#f4f5f8);--background-activated:var(--ion-color-light-shade,#d7d8da);--background-focused:var(--background-activated);--color:var(--ion-color-light-contrast,#000);--color-activated:var(--ion-color-light-contrast,#000);--color-focused:var(--color-activated);--transition:transform 200ms ease 10ms,opacity 200ms ease 10ms}:host(.fab-button-in-list) ::slotted(ion-icon){font-size:18px}:host(.fab-button-translucent){--background:rgba(var(--ion-color-primary-rgb,56,128,255),0.9);--backdrop-filter:saturate(180%) blur(20px)}:host(.fab-button-translucent-in-list){--background:rgba(var(--ion-background-color-rgb,255,255,255),0.8)}:host(.ion-color.fab-button-translucent) .button-native{background:rgba(var(--ion-color-base-rgb),.9)}:host(.ion-color.activated.fab-button-translucent) .button-native,:host(.ion-color.focused.fab-button-translucent) .button-native{background:var(--ion-color-base)}"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"styleMode",{get:function(){return"ios"},enumerable:!0,configurable:!0}),e}();function u(e,t){var n=new e,o=new e;o.addElement(t.querySelector("ion-backdrop"));var r=new e;return r.addElement(t.querySelector(".loading-wrapper")),o.fromTo("opacity",.01,.3),r.fromTo("opacity",.01,1).fromTo("scale",1.1,1),Promise.resolve(n.addElement(t).easing("ease-in-out").duration(200).add(o).add(r))}function d(e,t){var n=new e,o=new e;o.addElement(t.querySelector("ion-backdrop"));var r=new e;return r.addElement(t.querySelector(".loading-wrapper")),o.fromTo("opacity",.3,0),r.fromTo("opacity",.99,0).fromTo("scale",1,.9),Promise.resolve(n.addElement(t).easing("ease-in-out").duration(200).add(o).add(r))}function p(e,t){var n=new e,o=new e;o.addElement(t.querySelector("ion-backdrop"));var r=new e;return r.addElement(t.querySelector(".loading-wrapper")),o.fromTo("opacity",.01,.32),r.fromTo("opacity",.01,1).fromTo("scale",1.1,1),Promise.resolve(n.addElement(t).easing("ease-in-out").duration(200).add(o).add(r))}function f(e,t){var n=new e,o=new e;o.addElement(t.querySelector("ion-backdrop"));var r=new e;return r.addElement(t.querySelector(".loading-wrapper")),o.fromTo("opacity",.32,0),r.fromTo("opacity",.99,0).fromTo("scale",1,.9),Promise.resolve(n.addElement(t).easing("ease-in-out").duration(200).add(o).add(r))}var b=function(){function e(){this.presented=!1,this.keyboardClose=!0,this.duration=0,this.backdropDismiss=!1,this.showBackdrop=!0,this.translucent=!1,this.animated=!0}return e.prototype.componentWillLoad=function(){void 0===this.spinner&&(this.spinner=this.config.get("loadingSpinner","ios"===this.mode?"lines":"crescent"))},e.prototype.componentDidLoad=function(){this.ionLoadingDidLoad.emit()},e.prototype.componentDidUnload=function(){this.ionLoadingDidUnload.emit()},e.prototype.onBackdropTap=function(){this.dismiss(void 0,r.BACKDROP)},e.prototype.present=function(){return __awaiter(this,void 0,void 0,function(){var e=this;return __generator(this,function(t){switch(t.label){case 0:return[4,r.present(this,"loadingEnter",u,p,void 0)];case 1:return t.sent(),this.duration>0&&(this.durationTimeout=setTimeout(function(){return e.dismiss()},this.duration+10)),[2]}})})},e.prototype.dismiss=function(e,t){return this.durationTimeout&&clearTimeout(this.durationTimeout),r.dismiss(this,e,t,"loadingLeave",d,f)},e.prototype.onDidDismiss=function(){return r.eventMethod(this.el,"ionLoadingDidDismiss")},e.prototype.onWillDismiss=function(){return r.eventMethod(this.el,"ionLoadingWillDismiss")},e.prototype.hostData=function(){return{style:{zIndex:4e4+this.overlayIndex},class:Object.assign({},o.getClassMap(this.cssClass),{"loading-translucent":this.translucent})}},e.prototype.render=function(){return[i("ion-backdrop",{visible:this.showBackdrop,tappable:this.backdropDismiss}),i("div",{class:"loading-wrapper",role:"dialog"},this.spinner&&i("div",{class:"loading-spinner"},i("ion-spinner",{name:this.spinner})),this.message&&i("div",{class:"loading-content"},this.message))]},Object.defineProperty(e,"is",{get:function(){return"ion-loading"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"encapsulation",{get:function(){return"scoped"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{animated:{type:Boolean,attr:"animated"},animationCtrl:{connect:"ion-animation-controller"},backdropDismiss:{type:Boolean,attr:"backdrop-dismiss"},config:{context:"config"},cssClass:{type:String,attr:"css-class"},dismiss:{method:!0},duration:{type:Number,attr:"duration"},el:{elementRef:!0},enterAnimation:{type:"Any",attr:"enter-animation"},keyboardClose:{type:Boolean,attr:"keyboard-close"},leaveAnimation:{type:"Any",attr:"leave-animation"},message:{type:String,attr:"message"},mode:{type:String,attr:"mode"},onDidDismiss:{method:!0},onWillDismiss:{method:!0},overlayIndex:{type:Number,attr:"overlay-index"},present:{method:!0},showBackdrop:{type:Boolean,attr:"show-backdrop"},spinner:{type:String,attr:"spinner",mutable:!0},translucent:{type:Boolean,attr:"translucent"}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"events",{get:function(){return[{name:"ionLoadingDidUnload",method:"ionLoadingDidUnload",bubbles:!0,cancelable:!0,composed:!0},{name:"ionLoadingDidLoad",method:"ionLoadingDidLoad",bubbles:!0,cancelable:!0,composed:!0},{name:"ionLoadingDidPresent",method:"didPresent",bubbles:!0,cancelable:!0,composed:!0},{name:"ionLoadingWillPresent",method:"willPresent",bubbles:!0,cancelable:!0,composed:!0},{name:"ionLoadingWillDismiss",method:"willDismiss",bubbles:!0,cancelable:!0,composed:!0},{name:"ionLoadingDidDismiss",method:"didDismiss",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(e,"listeners",{get:function(){return[{name:"ionBackdropTap",method:"onBackdropTap"}]},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return".sc-ion-loading-ios-h{--min-width:auto;--width:auto;--min-height:auto;--height:auto;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;left:0;right:0;top:0;bottom:0;position:fixed;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;font-family:var(--ion-font-family,inherit);contain:strict;-ms-touch-action:none;touch-action:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:1000}.loading-wrapper.sc-ion-loading-ios, .sc-ion-loading-ios-h{display:-ms-flexbox;display:flex}.loading-wrapper.sc-ion-loading-ios{-ms-flex-align:inherit;align-items:inherit;-ms-flex-pack:inherit;justify-content:inherit;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);opacity:0;z-index:10}.spinner-bubbles.sc-ion-loading-ios, .spinner-circles.sc-ion-loading-ios, .spinner-crescent.sc-ion-loading-ios, .spinner-dots.sc-ion-loading-ios, .spinner-lines.sc-ion-loading-ios, .spinner-lines-small.sc-ion-loading-ios{color:var(--spinner-color)}.sc-ion-loading-ios-h{--background:var(--ion-color-step-50,#f2f2f2);--max-width:270px;--max-height:90%;--spinner-color:var(--ion-color-step-600,#666);color:var(--ion-text-color,#000);font-size:14px}.loading-wrapper.sc-ion-loading-ios{border-radius:8px;padding:24px 34px}.loading-translucent.sc-ion-loading-ios-h   .loading-wrapper.sc-ion-loading-ios{background-color:rgba(var(--ion-background-color-rgb,255,255,255),.8);-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px)}.loading-content.sc-ion-loading-ios{font-weight:700}.loading-spinner.sc-ion-loading-ios + .loading-content.sc-ion-loading-ios{margin-left:16px}"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"styleMode",{get:function(){return"ios"},enumerable:!0,configurable:!0}),e}(),h=function(){function e(){}return e.prototype.create=function(e){return r.createOverlay(this.doc.createElement("ion-loading"),e)},e.prototype.dismiss=function(e,t,n){return r.dismissOverlay(this.doc,e,t,"ion-loading",n)},e.prototype.getTop=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){return[2,r.getOverlay(this.doc,"ion-loading")]})})},Object.defineProperty(e,"is",{get:function(){return"ion-loading-controller"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{create:{method:!0},dismiss:{method:!0},doc:{context:"document"},getTop:{method:!0}}},enumerable:!0,configurable:!0}),e}(),m={lines:{dur:1e3,lines:12,fn:function(e,t,n){return{y1:17,y2:29,style:{transform:"rotate("+(30*t+(t<6?180:-180))+"deg)","animation-delay":e*t/n-e+"ms"}}}},"lines-small":{dur:1e3,lines:12,fn:function(e,t,n){return{y1:12,y2:20,style:{transform:"rotate("+(30*t+(t<6?180:-180))+"deg)","animation-delay":e*t/n-e+"ms"}}}},bubbles:{dur:1e3,circles:9,fn:function(e,t,n){var o=e*t/n-e+"ms",r=2*Math.PI*t/n;return{r:5,style:{top:9*Math.sin(r)+"px",left:9*Math.cos(r)+"px","animation-delay":o}}}},circles:{dur:1e3,circles:8,fn:function(e,t,n){var o=t/n,r=e*o-e+"ms",i=2*Math.PI*o;return{r:5,style:{top:9*Math.sin(i)+"px",left:9*Math.cos(i)+"px","animation-delay":r}}}},crescent:{dur:750,circles:1,fn:function(){return{r:26,style:{}}}},dots:{dur:750,circles:3,fn:function(e,t){return{r:6,style:{left:9-9*t+"px","animation-delay":-110*t+"ms"}}}}},y=function(){function e(){this.paused=!1}return e.prototype.getName=function(){return this.name||this.config.get("spinner")||("ios"===this.mode?"lines":"crescent")},e.prototype.hostData=function(){var e;return{class:Object.assign({},o.createColorClasses(this.color),(e={},e["spinner-"+this.getName()]=!0,e["spinner-paused"]=!!this.paused||this.config.getBoolean("_testing"),e))}},e.prototype.render=function(){var e=this.getName(),t=m[e]||m.lines,n="number"==typeof this.duration&&this.duration>10?this.duration:t.dur,o=[];if(void 0!==t.circles)for(var r=0;r<t.circles;r++)o.push(g(t,n,r,t.circles));else if(void 0!==t.lines)for(r=0;r<t.lines;r++)o.push(v(t,n,r,t.lines));return o},Object.defineProperty(e,"is",{get:function(){return"ion-spinner"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{color:{type:String,attr:"color"},config:{context:"config"},duration:{type:Number,attr:"duration"},name:{type:String,attr:"name"},paused:{type:Boolean,attr:"paused"}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return":host{display:inline-block;position:relative;width:28px;height:28px;color:var(--color);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host(.ion-color){color:var(--ion-color-base)}svg{left:0;top:0;position:absolute;width:100%;height:100%;-webkit-transform:translateZ(0);transform:translateZ(0)}:host(.spinner-lines) line,:host(.spinner-lines-small) line{stroke-width:4px;stroke-linecap:round;stroke:currentColor}:host(.spinner-lines) svg,:host(.spinner-lines-small) svg{-webkit-animation:spinner-fade-out 1s linear infinite;animation:spinner-fade-out 1s linear infinite}:host(.spinner-bubbles) svg{-webkit-animation:spinner-scale-out 1s linear infinite;animation:spinner-scale-out 1s linear infinite;fill:currentColor}:host(.spinner-circles) svg{-webkit-animation:spinner-fade-out 1s linear infinite;animation:spinner-fade-out 1s linear infinite;fill:currentColor}:host(.spinner-crescent) circle{fill:transparent;stroke-width:4px;stroke-dasharray:128px;stroke-dashoffset:82px;stroke:currentColor}:host(.spinner-crescent) svg{-webkit-animation:spinner-rotate 1s linear infinite;animation:spinner-rotate 1s linear infinite}:host(.spinner-dots) circle{stroke-width:0;fill:currentColor}:host(.spinner-dots) svg{-webkit-transform-origin:center;transform-origin:center;-webkit-animation:spinner-dots 1s linear infinite;animation:spinner-dots 1s linear infinite}:host(.spinner-paused) svg{-webkit-animation-play-state:paused;animation-play-state:paused}\@-webkit-keyframes spinner-fade-out{0%{opacity:1}to{opacity:0}}\@keyframes spinner-fade-out{0%{opacity:1}to{opacity:0}}\@-webkit-keyframes spinner-scale-out{0%{-webkit-transform:scale(1);transform:scale(1)}to{-webkit-transform:scale(0);transform:scale(0)}}\@keyframes spinner-scale-out{0%{-webkit-transform:scale(1);transform:scale(1)}to{-webkit-transform:scale(0);transform:scale(0)}}\@-webkit-keyframes spinner-rotate{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}\@keyframes spinner-rotate{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}\@-webkit-keyframes spinner-dots{0%{-webkit-transform:scale(1);transform:scale(1);opacity:.9}50%{-webkit-transform:scale(.4);transform:scale(.4);opacity:.3}to{-webkit-transform:scale(1);transform:scale(1);opacity:.9}}\@keyframes spinner-dots{0%{-webkit-transform:scale(1);transform:scale(1);opacity:.9}50%{-webkit-transform:scale(.4);transform:scale(.4);opacity:.3}to{-webkit-transform:scale(1);transform:scale(1);opacity:.9}}"},enumerable:!0,configurable:!0}),e}();function g(e,t,n,o){var r=e.fn(t,n,o);return r.style["animation-duration"]=t+"ms",i("svg",{viewBox:"0 0 64 64",style:r.style},i("circle",{transform:"translate(32,32)",r:r.r}))}function v(e,t,n,o){var r=e.fn(t,n,o);return r.style["animation-duration"]=t+"ms",i("svg",{viewBox:"0 0 64 64",style:r.style},i("line",{transform:"translate(32,32)",y1:r.y1,y2:r.y2}))}e.AppHome=a,e.IonBackdrop=s,e.IonFab=c,e.IonFabButton=l,e.IonLoading=b,e.IonLoadingController=h,e.IonSpinner=y,Object.defineProperty(e,"__esModule",{value:!0})});