var __awaiter=this&&this.__awaiter||function(t,o,e,r){return new(e||(e=Promise))(function(n,l){function i(t){try{s(r.next(t))}catch(t){l(t)}}function c(t){try{s(r.throw(t))}catch(t){l(t)}}function s(t){t.done?n(t.value):new e(function(o){o(t.value)}).then(i,c)}s((r=r.apply(t,o||[])).next())})},__generator=this&&this.__generator||function(t,o){var e,r,n,l,i={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return l={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(l[Symbol.iterator]=function(){return this}),l;function c(l){return function(c){return function(l){if(e)throw new TypeError("Generator is already executing.");for(;i;)try{if(e=1,r&&(n=2&l[0]?r.return:l[0]?r.throw||((n=r.return)&&n.call(r),0):r.next)&&!(n=n.call(r,l[1])).done)return n;switch(r=0,n&&(l=[2&l[0],n.value]),l[0]){case 0:case 1:n=l;break;case 4:return i.label++,{value:l[1],done:!1};case 5:i.label++,r=l[1],l=[0];continue;case 7:l=i.ops.pop(),i.trys.pop();continue;default:if(!(n=(n=i.trys).length>0&&n[n.length-1])&&(6===l[0]||2===l[0])){i=0;continue}if(3===l[0]&&(!n||l[1]>n[0]&&l[1]<n[3])){i.label=l[1];break}if(6===l[0]&&i.label<n[1]){i.label=n[1],n=l;break}if(n&&i.label<n[2]){i.label=n[2],i.ops.push(l);break}n[2]&&i.ops.pop(),i.trys.pop();continue}l=o.call(t,i)}catch(t){l=[6,t],r=0}finally{e=n=0}if(5&l[0])throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}([l,c])}}};App.loadBundle("envyk7jn",["exports","./chunk-187ef6fc.js","./chunk-f541d606.js"],function(t,o,e){var r=window.App.h,n=function(){function t(){this.isScrolling=!1,this.lastScroll=0,this.queued=!1,this.cTop=-1,this.cBottom=-1,this.detail={scrollTop:0,scrollLeft:0,type:"scroll",event:void 0,startX:0,startY:0,startTimeStamp:0,currentX:0,currentY:0,velocityX:0,velocityY:0,deltaX:0,deltaY:0,timeStamp:0,data:void 0,isScrolling:!0},this.fullscreen=!1,this.scrollX=!1,this.scrollY=!0,this.scrollEvents=!1}return t.prototype.onNavChanged=function(){this.resize()},t.prototype.componentWillLoad=function(){void 0===this.forceOverscroll&&(this.forceOverscroll="ios"===this.mode&&e.isPlatform(this.win,"mobile"))},t.prototype.componentDidLoad=function(){this.resize()},t.prototype.componentDidUnload=function(){this.watchDog&&clearInterval(this.watchDog)},t.prototype.resize=function(){this.fullscreen?this.queue.read(this.readDimensions.bind(this)):0===this.cTop&&0===this.cBottom||(this.cTop=this.cBottom=0,this.el.forceUpdate())},t.prototype.readDimensions=function(){var t=function(t){var o=t.closest("ion-tabs");if(o)return o;var e=t.closest("ion-app,ion-page,.ion-page,page-inner");return e||function(t){return t.parentElement?t.parentElement:t.parentNode&&t.parentNode.host?t.parentNode.host:null}(t)}(this.el),o=Math.max(this.el.offsetTop,0),e=Math.max(t.offsetHeight-o-this.el.offsetHeight,0);(o!==this.cTop||e!==this.cBottom)&&(this.cTop=o,this.cBottom=e,this.el.forceUpdate())},t.prototype.onScroll=function(t){var o=this,e=Date.now(),r=!this.isScrolling;this.lastScroll=e,r&&this.onScrollStart(),!this.queued&&this.scrollEvents&&(this.queued=!0,this.queue.read(function(e){o.queued=!1,o.detail.event=t,function(t,o,e,r){var n=t.currentX,l=t.currentY,i=t.timeStamp,c=o.scrollLeft,s=o.scrollTop;r&&(t.startTimeStamp=e,t.startX=c,t.startY=s,t.velocityX=t.velocityY=0),t.timeStamp=e,t.currentX=t.scrollLeft=c,t.currentY=t.scrollTop=s,t.deltaX=c-t.startX,t.deltaY=s-t.startY;var a=e-i;if(a>0&&a<100){var u=(s-l)/a;t.velocityX=.7*((c-n)/a)+.3*t.velocityX,t.velocityY=.7*u+.3*t.velocityY}}(o.detail,o.scrollEl,e,r),o.ionScroll.emit(o.detail)}))},t.prototype.getScrollElement=function(){return Promise.resolve(this.scrollEl)},t.prototype.scrollToTop=function(t){return void 0===t&&(t=0),this.scrollToPoint(void 0,0,t)},t.prototype.scrollToBottom=function(t){return void 0===t&&(t=0),this.scrollToPoint(void 0,this.scrollEl.scrollHeight-this.scrollEl.clientHeight,t)},t.prototype.scrollByPoint=function(t,o,e){return this.scrollToPoint(t+this.scrollEl.scrollLeft,o+this.scrollEl.scrollTop,e)},t.prototype.scrollToPoint=function(t,o,e){return void 0===e&&(e=0),__awaiter(this,void 0,void 0,function(){var r,n,l,i,c,s,a,u,h;return __generator(this,function(f){return r=this.scrollEl,e<32?(null!=o&&(r.scrollTop=o),null!=t&&(r.scrollLeft=t),[2]):(l=0,i=new Promise(function(t){return n=t}),c=r.scrollTop,s=r.scrollLeft,a=null!=o?o-c:0,u=null!=t?t-s:0,h=function(t){var o=Math.min(1,(t-l)/e)-1,i=Math.pow(o,3)+1;0!==a&&(r.scrollTop=Math.floor(i*a+c)),0!==u&&(r.scrollLeft=Math.floor(i*u+s)),i<1?requestAnimationFrame(h):n()},requestAnimationFrame(function(t){l=t,h(t)}),[2,i])})})},t.prototype.onScrollStart=function(){var t=this;this.isScrolling=!0,this.ionScrollStart.emit({isScrolling:!0}),this.watchDog&&clearInterval(this.watchDog),this.watchDog=setInterval(function(){t.lastScroll<Date.now()-120&&t.onScrollEnd()},100)},t.prototype.onScrollEnd=function(){clearInterval(this.watchDog),this.watchDog=null,this.isScrolling=!1,this.ionScrollEnd.emit({isScrolling:!1})},t.prototype.hostData=function(){return{class:Object.assign({},o.createColorClasses(this.color),{"content-sizing":o.hostContext("ion-popover",this.el),overscroll:!!this.forceOverscroll}),style:{"--offset-top":this.cTop+"px","--offset-bottom":this.cBottom+"px"}}},t.prototype.render=function(){var t=this,o=this.scrollX,e=this.scrollY,n=this.forceOverscroll;return this.resize(),[r("div",{class:{"inner-scroll":!0,"scroll-x":o,"scroll-y":e,overscroll:(o||e)&&!!n},ref:function(o){return t.scrollEl=o},onScroll:function(o){return t.onScroll(o)}},r("slot",null)),r("slot",{name:"fixed"})]},Object.defineProperty(t,"is",{get:function(){return"ion-content"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{color:{type:String,attr:"color"},config:{context:"config"},el:{elementRef:!0},forceOverscroll:{type:Boolean,attr:"force-overscroll",mutable:!0},fullscreen:{type:Boolean,attr:"fullscreen"},getScrollElement:{method:!0},queue:{context:"queue"},scrollByPoint:{method:!0},scrollEvents:{type:Boolean,attr:"scroll-events"},scrollToBottom:{method:!0},scrollToPoint:{method:!0},scrollToTop:{method:!0},scrollX:{type:Boolean,attr:"scroll-x"},scrollY:{type:Boolean,attr:"scroll-y"},win:{context:"window"}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"events",{get:function(){return[{name:"ionScrollStart",method:"ionScrollStart",bubbles:!0,cancelable:!0,composed:!0},{name:"ionScroll",method:"ionScroll",bubbles:!0,cancelable:!0,composed:!0},{name:"ionScrollEnd",method:"ionScrollEnd",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"listeners",{get:function(){return[{name:"body:ionNavDidChange",method:"onNavChanged"}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return".sc-ion-content-h{--background:var(--ion-background-color,#fff);--color:var(--ion-text-color,#000);--padding-top:0px;--padding-bottom:0px;--padding-start:0px;--padding-end:0px;--keyboard-offset:0px;--offset-top:0px;--offset-bottom:0px;--overflow:auto;display:block;position:relative;-ms-flex:1;flex:1;width:100%;height:100%;margin:0!important;padding:0!important;font-family:var(--ion-font-family,inherit);contain:layout size style}.ion-color.sc-ion-content-h   .inner-scroll.sc-ion-content{background:var(--ion-color-base);color:var(--ion-color-contrast)}.outer-content.sc-ion-content-h{--background:var(--ion-color-step-50,#f2f2f2)}.inner-scroll.sc-ion-content{left:0;right:0;top:calc(var(--offset-top) * -1);bottom:calc(var(--offset-bottom) * -1);padding:calc(var(--padding-top) + var(--offset-top)) var(--padding-end) calc(var(--padding-bottom) + var(--keyboard-offset) + var(--offset-bottom)) var(--padding-start);position:absolute;background:var(--background);color:var(--color);-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden}.scroll-x.sc-ion-content, .scroll-y.sc-ion-content{-webkit-overflow-scrolling:touch;will-change:scroll-position;-ms-scroll-chaining:none;overscroll-behavior:contain}.scroll-y.sc-ion-content{-ms-touch-action:pan-y;touch-action:pan-y;overflow-y:var(--overflow)}.scroll-x.sc-ion-content{-ms-touch-action:pan-x;touch-action:pan-x;overflow-x:var(--overflow)}.scroll-x.scroll-y.sc-ion-content{-ms-touch-action:auto;touch-action:auto}.overscroll.sc-ion-content:after, .overscroll.sc-ion-content:before{position:absolute;width:1px;height:1px;content:\"\"}.overscroll.sc-ion-content:before{bottom:-1px}.overscroll.sc-ion-content:after{top:-1px}.content-sizing.sc-ion-content-h{contain:none}.content-sizing.sc-ion-content-h   .inner-scroll.sc-ion-content{position:relative}"},enumerable:!0,configurable:!0}),t}();t.IonContent=n,Object.defineProperty(t,"__esModule",{value:!0})});