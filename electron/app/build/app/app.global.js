
(function(namespace,resourcesUrl){"use strict";
(function(Context, resourcesUrl){
    /** App global **/

    // import { setupConfig } from '@ionic/core';
    // setupConfig({
    //   mode: 'ios'
    // });
})(x,r);


(function(Context, resourcesUrl){
    /** @ionic/core global **/

    const PLATFORMS_MAP = {
        'ipad': isIpad,
        'iphone': isIphone,
        'ios': isIOS,
        'android': isAndroid,
        'phablet': isPhablet,
        'tablet': isTablet,
        'cordova': isCordova,
        'capacitor': isCapacitorNative,
        'electron': isElectron,
        'pwa': isPWA,
        'mobile': isMobile,
        'desktop': isDesktop,
        'hybrid': isHybrid
    };
    function getPlatforms(win) {
        return setupPlatforms(win);
    }
    function isPlatform(win, platform) {
        return getPlatforms(win).includes(platform);
    }
    function setupPlatforms(win) {
        win.Ionic = win.Ionic || {};
        let platforms = win.Ionic.platforms;
        if (platforms == null) {
            platforms = win.Ionic.platforms = detectPlatforms(win);
            const classList = win.document.documentElement.classList;
            platforms.forEach(p => classList.add(`plt-${p}`));
        }
        return platforms;
    }
    function detectPlatforms(win) {
        return Object.keys(PLATFORMS_MAP).filter(p => PLATFORMS_MAP[p](win));
    }
    function isIpad(win) {
        return testUserAgent(win, /iPad/i);
    }
    function isIphone(win) {
        return testUserAgent(win, /iPhone/i);
    }
    function isIOS(win) {
        return testUserAgent(win, /iPad|iPhone|iPod/i);
    }
    function isAndroid(win) {
        return testUserAgent(win, /android|sink/i);
    }
    function isPhablet(win) {
        const width = win.innerWidth;
        const height = win.innerHeight;
        const smallest = Math.min(width, height);
        const largest = Math.max(width, height);
        return (smallest > 390 && smallest < 520) &&
            (largest > 620 && largest < 800);
    }
    function isTablet(win) {
        const width = win.innerWidth;
        const height = win.innerHeight;
        const smallest = Math.min(width, height);
        const largest = Math.max(width, height);
        return (smallest > 460 && smallest < 820) &&
            (largest > 780 && largest < 1400);
    }
    function isMobile(win) {
        return matchMedia(win, '(any-pointer:coarse)');
    }
    function isDesktop(win) {
        return !isMobile(win);
    }
    function isHybrid(win) {
        return isCordova(win) || isCapacitorNative(win);
    }
    function isCordova(window) {
        const win = window;
        return !!(win['cordova'] || win['phonegap'] || win['PhoneGap']);
    }
    function isCapacitorNative(window) {
        const win = window;
        const capacitor = win['Capacitor'];
        return !!(capacitor && capacitor.isNative);
    }
    function isElectron(win) {
        return testUserAgent(win, /electron/);
    }
    function isPWA(win) {
        return win.matchMedia('(display-mode: standalone)').matches;
    }
    function testUserAgent(win, expr) {
        return expr.test(win.navigator.userAgent);
    }
    function matchMedia(win, query) {
        return win.matchMedia(query).matches;
    }

    class Config {
        constructor(configObj) {
            this.m = new Map(Object.entries(configObj));
        }
        get(key, fallback) {
            const value = this.m.get(key);
            return (value !== undefined) ? value : fallback;
        }
        getBoolean(key, fallback = false) {
            const val = this.m.get(key);
            if (val === undefined) {
                return fallback;
            }
            if (typeof val === 'string') {
                return val === 'true';
            }
            return !!val;
        }
        getNumber(key, fallback) {
            const val = parseFloat(this.m.get(key));
            return isNaN(val) ? (fallback !== undefined ? fallback : NaN) : val;
        }
        set(key, value) {
            this.m.set(key, value);
        }
    }
    function configFromSession() {
        try {
            const configStr = window.sessionStorage.getItem(IONIC_SESSION_KEY);
            return configStr !== null ? JSON.parse(configStr) : {};
        }
        catch (e) {
            return {};
        }
    }
    function saveConfig(config) {
        try {
            window.sessionStorage.setItem(IONIC_SESSION_KEY, JSON.stringify(config));
        }
        catch (e) {
            return;
        }
    }
    function configFromURL() {
        const config = {};
        const win = window;
        win.location.search.slice(1)
            .split('&')
            .map(entry => entry.split('='))
            .map(([key, value]) => [decodeURIComponent(key), decodeURIComponent(value)])
            .filter(([key]) => startsWith(key, IONIC_PREFIX))
            .map(([key, value]) => [key.slice(IONIC_PREFIX.length), value])
            .forEach(([key, value]) => {
            config[key] = value;
        });
        return config;
    }
    function startsWith(input, search) {
        return input.substr(0, search.length) === search;
    }
    const IONIC_PREFIX = 'ionic:';
    const IONIC_SESSION_KEY = 'ionic-persist-config';

    const win = window;
    const Ionic = win['Ionic'] = win['Ionic'] || {};
    Object.defineProperty(Ionic, 'queue', {
        get: () => Context['queue']
    });
    setupPlatforms(win);
    Context.isPlatform = isPlatform;
    const configObj = Object.assign({}, configFromSession(), { persistConfig: false }, Ionic['config'], configFromURL());
    const config = Ionic['config'] = Context['config'] = new Config(configObj);
    if (config.getBoolean('persistConfig')) {
        saveConfig(configObj);
    }
    const documentElement = document.documentElement;
    const mode = config.get('mode', documentElement.getAttribute('mode') || (isPlatform(win, 'ios') ? 'ios' : 'md'));
    Ionic.mode = Context.mode = mode;
    config.set('mode', mode);
    documentElement.setAttribute('mode', mode);
    documentElement.classList.add(mode);
    if (config.getBoolean('_testing')) {
        config.set('animated', false);
    }
})(x,r);
})("App");