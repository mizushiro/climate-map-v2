//Tab
$.fn.uxeTabs = function (options) {
    var settings = $.extend({
        'selector' : 'js-tabs',
        'menuSelector': '.list-item-tab',
        'menuBtnSelector' : '.list-item-btn',
        'mainTargetAttribute' : 'name',
        'activeTabMenuClass': 'is-selected',
        'tabsContentSlector' : '.list-item-btn',
        'activeTabContentClass' : 'active',
        'speed': 0,
        'autoFirstActivate': false,
        'firstActiveIndex':0,
        'useSubTarget' : false,
        'useSubTargetAttribute' : 'data-subtarget',
        'subtargetClass' : 'is-selected',
        'navClickScrollToTabsTop' :false
    }, options);
    return this.each(function(){
        var $this = $(this);
        var $navs = $this.find(settings.menuSelector);
        $this.addClass(settings.selector);
        if(settings.autoFirstActivate === true){
            var fisrtMenuElement = $this.find(settings.menuSelector).eq(settings.firstActiveIndex);
            var fisrtHash = fisrtMenuElement.find('.list-item-btn').attr(settings.mainTargetAttribute);
            fisrtMenuElement.addClass(settings.activeTabMenuClass).siblings().removeClass(settings.activeTabMenuClass);
            $this.find(fisrtHash).addClass(settings.activeTabContentClass);
            if(settings.useSubTarget===true){
                var $firstsubTarget = $(fisrtMenuElement.find('.list-item-btn').attr(settings.useSubTargetAttribute));
                $firstsubTarget.addClass(settings.subtargetClass);
            }
        };
        $navs.find(settings.menuBtnSelector).click(function(e){
            e.preventDefault();
            var hash = $(this).attr(settings.mainTargetAttribute);
            var $tabContent = $this.find(settings.tabsContentSlector);

            $navs.removeClass(settings.activeTabMenuClass);
            $tabContent.removeClass(settings.activeTabContentClass);
            $(this).parents(settings.menuSelector).addClass(settings.activeTabMenuClass);
            $(hash).addClass(settings.activeTabContentClass);

            if(settings.useSubTarget===true){
                var $subTarget = $($(this).attr(settings.useSubTargetAttribute));
                $this.find($subTarget).addClass(settings.subtargetClass);
            }
        });
    });
};

//아코디언 메뉴
$.fn.uxeAccordionMenu = function (options) {
    var settings = $.extend({
        'selector' : 'js-accordion',
        'itemSelector' : '.section-info-item',
        'itemClass': 'js-accordion-item',
        'navigation' : '.btn-accordion',
        'activeItemClass': 'active',
        'clickedShowOnly': false
    }, options);
    return this.each(function(){
        var $this = $(this);
        var $nav = $(this).find(settings.navigation);
        $this.addClass(settings.selector).find(settings.itemSelector).addClass(settings.itemClass);
        $nav.each(function(){
            $(this).click(function(e){
                e.preventDefault();
                if(settings.clickedShowOnly === true){
                    $(this).parents('.'+settings.itemClass).siblings().removeClass(settings.activeItemClass);
                }
                $(this).parents('.'+settings.itemClass).toggleClass(settings.activeItemClass);
            });
        });
    });
};

var newhome = (function() {
        var callLayer = function() {
            var btnLayer = document.querySelectorAll('[data-layer]');
            for (var i = 0; i < btnLayer.length; i++) {
                btnLayer[i].addEventListener('click', function(e) {
                    var targetId = this.dataset.layer;
                    var targetLayer = document.querySelector('#' + targetId);
                    targetLayer.classList.add('showing');
                    console.log($(targetLayer));
                    if ($(targetLayer).is('.layer-area, #cartLayer')) {
                        $('html, body').addClass('scroll-off');
                    }
                });
            }
            var btnLayerClose = document.querySelectorAll('.layer_section .btn_layer-close');
            for (var i = 0; i < btnLayerClose.length; i++) {
                btnLayerClose[i].addEventListener('click', function(e) {
                    var targetElem = e.target;
                    while (!targetElem.classList.contains('layer_section')) {
                        targetElem = targetElem.parentNode;
                        if (targetElem.nodeName == 'BODY') {
                            targetElem = null;
                            return;
                        }
                    }
                    targetElem.classList.remove('showing');
                })
            }
        };
        return {
            callLayer: callLayer,
        }
    }
)();

$(document).ready(function(){
    $('.box-tab').uxeTabs({
        'tabsContentSlector':'.tab-contents',
        'useSubTarget': true,
        'autoFirstActivate': true,
        'navClickScrollToTabsTop':true
    });
    $('.box-tab2').uxeTabs({
        'tabsContentSlector':'.tab-contents2',
        'menuSelector': '.list-item-tab2',
        'menuBtnSelector' : '.list-item-btn2',
        'useSubTarget': true,
        'autoFirstActivate': true,
        'navClickScrollToTabsTop':true
    });

    // 아코디언
    $('.accordion-list').uxeAccordionMenu({
        'clickedShowOnly': true,
        'itemSelector' : '.accordion-group'
    });
});
(() => {

	'use strict';

	const global = 'UIexe';

	window[global] = {};

    const Global = window[global];
    const UA = navigator.userAgent.toLowerCase();
    const deviceSize = [1920, 1600, 1440, 1280, 1024, 960, 840, 720, 600, 480, 400, 360];
    const deviceInfo = ['android', 'iphone', 'ipod', 'ipad', 'blackberry', 'windows ce', 'windows','samsung', 'lg', 'mot', 'sonyericsson', 'nokia', 'opeara mini', 'opera mobi', 'webos', 'iemobile', 'kfapwi', 'rim', 'bb10'];
    Global.state = {
        isSystemModal: false,
        device: {
            info: (() => {
                for (let i = 0, len = deviceInfo.length; i < len; i++) {
                    if (UA.match(deviceInfo[i]) !== null) {
                        return deviceInfo[i];
                    }
                }
            })(),
            width: window.innerWidth,
            height: window.innerHeight,
            breakpoint: null,
            colClass: null,
            ios: (/ip(ad|hone|od)/i).test(UA),
            android: (/android/i).test(UA),
            app: UA.indexOf('appname') > -1 ? true : false,
            touch: null,
            mobile: null,
            os: (navigator.appVersion).match(/(mac|win|linux)/i)
        },
        browser: {
            ie: UA.match(/(?:msie ([0-9]+)|rv:([0-9\.]+)\) like gecko)/i),
            local: (/^http:\/\//).test(location.href),
            firefox: (/firefox/i).test(UA),
            webkit: (/applewebkit/i).test(UA),
            chrome: (/chrome/i).test(UA),
            opera: (/opera/i).test(UA),
            safari: (/applewebkit/i).test(UA) && !(/chrome/i).test(UA),	
            size: null
        },
        scroll: {
            y: 0,
            direction: 'down'
        },		
        breakPoint: [600, 1024],
        resizeState() {
            let timerWin;

            const act = () => {
                const browser = Global.state.browser;
                const device = Global.state.device;

                device.width = window.innerWidth;
                device.height = window.innerHeight;

                device.touch = device.ios || device.android || (document.ontouchstart !== undefined && document.ontouchstart !== null);
                device.mobile = device.touch && (device.ios || device.android);
                device.os = device.os ? device.os[0] : '';
                device.os = device.os.toLowerCase();

                device.breakpoint = device.width >= deviceSize[5] ? true : false;
                device.colClass = device.width >= deviceSize[5] ? 'col-12' : device.width > deviceSize[8] ? 'col-8' : 'col-4';

                if (browser.ie) {
                    browser.ie = browser.ie = parseInt( browser.ie[1] || browser.ie[2] );
                    ( 11 > browser.ie ) ? support.pointerevents = false : '';
                    ( 9 > browser.ie ) ? support.svgimage = false : '';
                } else {
                    browser.ie = false;
                }
                
                const clsBrowser = browser.chrome ? 'chrome' : browser.firefox ? 'firefox' : browser.opera ? 'opera' : browser.safari ? 'safari' : browser.ie ? 'ie' + browser.ie : 'other';
                const clsMobileSystem = device.ios ? "ios" : device.android ? "android" : 'etc';
                const clsMobile = device.mobile ? device.app ? 'ui-a ui-m' : 'ui-m' : 'ui-d';
                const el_html = document.querySelector('html');

                el_html.classList.remove('col-12', 'col-8', 'col-4');
                el_html.classList.add(device.colClass);
                el_html.classList.add(clsBrowser);
                el_html.classList.add(clsMobileSystem);
                el_html.classList.add(clsMobile);
            
                const w = window.innerWidth;

                clearTimeout(timerWin);
                timerWin = setTimeout(() => {
                    el_html.classList.remove('size-tablet');
                    el_html.classList.remove('size-desktop');
                    el_html.classList.remove('size-mobile');
                        el_html.classList.remove('size-desktop');

                    if (w < Global.state.breakPoint[0]) {
                        Global.state.browser.size = 'mobile';
                        el_html.classList.add('size-mobile');
                    } else if (w < Global.state.breakPoint[1]) {
                        Global.state.browser.size = 'tablet';
                        el_html.classList.add('size-tablet');
                    } else {
                        Global.state.browser.sizee = 'desktop';
                        el_html.classList.add('size-desktop');
                    }
                },200);
            }
            window.addEventListener('resize', act);
            act();
        },
    }
    Global.state.resizeState();

    Global.layerFullSmall = () => {
        const fulls = document.querySelectorAll('.btn-full-view');
        const actLayerFullSmall = (e) => {
            const _this = e.currentTarget;
            _this.parentNode.parentNode.classList.toggle('active');
        }
        for (let item of fulls) {
            item.addEventListener('click', actLayerFullSmall);
        }

    }
    Global.inputClear = () => {
        const inputClear = document.querySelector('.btn-clear');
        const actClear = (e) => {
            const el = e.currentTarget;
            const id = el.dataset.id;

            document.querySelector('input[data-id="'+ id +'"]').value = '';
        }
        inputClear.addEventListener('click', actClear);
    }

    Global.hoverLayer = (opt) => {
        const btnLayerHovers = document.querySelectorAll('.' + opt.classname);
        
        
        const actHover = (e) => {
            const _this = e.currentTarget;
           
            _this.classList.add('selected');
        }
         const actOut = (e) => {
            const _this = e.currentTarget;
           
            _this.classList.remove('selected');
        }
        const actClick = (e) => {
            
            const _this = e.currentTarget;
            const name = _this.dataset.name;
            const wrap = _this.closest('.' + name);

            wrap.classList.toggle('selected');

        }
        const actClose = (e) => {
            const _this = e.currentTarget;
            const name = _this.dataset.name;
            const wrap = _this.closest('.' + name);

            wrap.classList.remove('selected');
        }

        let closeBtn;
        let btn;
        for (let item of btnLayerHovers) {
            closeBtn = item.querySelector('.layer-close');
            btn = item.querySelector('button[data-hoverlayer="btn"]');
            closeBtn ? closeBtn.dataset.name = opt.classname : '';
            btn ? btn.dataset.name = opt.classname : '';
            closeBtn && closeBtn.addEventListener('click', actClose);

            if (Global.state.device.mobile) {
                console.log(btn);
                btn && btn.addEventListener('click', actClick);
            } else {
                item.addEventListener('mouseout', actOut);
                item.addEventListener('mouseover', actHover);
            }
        }
    }
    Global.loading = {
        timerShow : {}, 
        timerHide : {},
        options : {
            selector: null,
            message : 'LOADING',
            styleClass : 'spinner-area' //time
        },
        show(option){
            const opt = Object.assign({}, this.options, option);
            const selector = opt.selector; 
            const styleClass = opt.styleClass; 
            const message = opt.message;
            const el = (selector !== null) ? selector : document.querySelector('body');
            const el_loadingHides = document.querySelectorAll('.ui-loading:not(.visible)');

            for (let i = 0, len = el_loadingHides.length; i < len; i++) {
                const that = el_loadingHides[i];

                that.remove();
            }

            let htmlLoading = '';


            (selector === null) ?
                htmlLoading += '<div class="ui-loading spinner-area">':
                htmlLoading += '<div class="spinner-area type-area">';

            htmlLoading += '<div class="spinner-box">';
            htmlLoading += '<div class="spinner-img"></div><p class="loading-text">'+ message +'</p>';
            htmlLoading += '</div>';
            htmlLoading += '</div>';

            const showLoading = () => {
                const el_child = el.childNodes;
                let is_loading = false;

                for (let i = 0; i < el_child.length; i++) {
                    if (el_child[i].nodeName === 'DIV' && el_child[i].classList.contains('ui-loading')) {
                        is_loading = true;
                    }
                }

                !is_loading && el.insertAdjacentHTML('beforeend', htmlLoading);
                htmlLoading = null;		
                
                const el_loadings = document.querySelectorAll('.ui-loading');

                this.timerShow = setTimeout(() => {
                    for (let i = 0, len = el_loadings.length; i < len; i++) {
                        const that = el_loadings[i];

                        that.classList.add('visible');
                        that.classList.remove('close');
                    }
                },0);
                
            }
            clearTimeout(this.timerShow);
            clearTimeout(this.timerHide);
            showLoading();
        },
        hide(){
            clearTimeout(this.timerShow);
            this.timerHide = setTimeout(() => {
                const el_loadings = document.querySelectorAll('.ui-loading');

                for (let i = 0, len = el_loadings.length; i < len; i++) {
                    const that = el_loadings[i];

                    that.classList.add('close');
                    setTimeout(() => {
                        that.classList.remove('visible')
                        that.remove();
                    },200);
                }
            },200);
        }
    }
    Global.toggle = {
        init() {
            const objs = document.querySelectorAll('[data-toggle-obj');

            for (let item of objs) {
                item.addEventListener('click', Global.toggle.toggle)
            }
        },
        toggle(e) {
            const _this = e.currentTarget;
            console.log(_this);
            const target = document.querySelector('[data-toggle-target="'+ _this.dataset.toggleObj +'"]');
            if (target) {
                target.dataset.toggle !== 'true' ? target.dataset.toggle = true: target.dataset.toggle = false;
            }
        },
        show(v) {
            const target = document.querySelector('[data-toggle-target="'+ v +'"]');
            if (target) {
                target.dataset.toggle = true;
            }
        },
        hide(v) {
            const target = document.querySelector('[data-toggle-target="'+ v +'"]');
            if (target) {
                target.dataset.toggle = false;
            }
        }
    }
})();

class UI_ToggleAct {
    constructor(opt) {
        this.btn = !opt.btn ? null : opt.btn;
        this.target = !opt.target ? null : opt.target;
        this.callback_show = !opt.callback_show ? null : opt.callback_show;
        this.callback_hide = !opt.callback_hide ? null : opt.callback_hide;
        this.init();
    }

    init() {
        if (!!this.btn) {
            for (let item of this.btn) {
                item.addEventListener('click', this.toggle);
            }
        } 
    }
    toggle = (e) => {
        const _this = e.currentTarget;

        if (this.target.length > 1) {
            for (let i = 0; i < this.target.length; i++) {
                if (this.target[i].dataset.toggle === 'true') {
                    this.target[i].dataset.toggle = 'false';
                    this.callback_hide && this.callback_hide();
                    _this.classList.remove('active');
                } else {
                    this.target[i].dataset.toggle = 'true';
                    this.callback_show && this.callback_show();
                    _this.classList.add('active');
                }              
            }
        } else {
            if (this.target.dataset.toggle === 'true') {
                this.target.dataset.toggle = 'false';
                this.callback_hide && this.callback_hide();
                _this.classList.remove('active');
            } else {
                this.target.dataset.toggle = 'true';
                this.callback_show && this.callback_show();
                _this.classList.add('active');
            }
        }
        
    }
    show() {
        if (this.target.length > 1) {
            for (let i = 0; i < this.target.length; i++) {
                this.target[i].dataset.toggle = 'true';       
            }
        } else {
            this.target.dataset.toggle = 'true';
        
        }

        if (!!this.btn) {
            for (let item of this.btn) {
                item.classList.add('active');
            }
        } 
        this.callback_show && this.callback_show();
    }
    hide() {
        if (this.target.length > 1) {
            for (let i = 0; i < this.target.length; i++) {
                this.target[i].dataset.toggle = 'false';       
            }
        } else {
            this.target.dataset.toggle = 'false';
        }

        if (!!this.btn) {
            for (let item of this.btn) {
                item.classList.remove('active');
            }
        } 
        this.callback_hide && this.callback_hide();
    }
}
class UI_DragMap {
    constructor(opt) {
        this.id = opt.id;
        this.wrap = document.querySelector('[data-map="'+ this.id +'"]');
        this.divides = this.wrap.querySelectorAll('[data-map-btn');
        this.divide_items = this.wrap.querySelectorAll('[data-map-area]');
        this.n = this.divides.length;
        this.ww = window.innerWidth;
    }
    start() {
        for (let i = 0; i < this.divides.length; i++) {
            this.divides[i].dataset.n = i;
            this.divides[i].addEventListener('touchstart', this.actStart);
            this.divides[i].addEventListener('mousedown', this.actStart);
        }
    }
    end() {
        this.divide.removeEventListener('touchstart', this.actStart);
    }
    actStart = (e) => {
        const el = e.currentTarget;
        const n = Number(el.dataset.n);
        const divide_line = el.closest('[data-map-line]');
        let _x;
        let per;
        let _per;

        const actEnd = (e) => { 
            window.removeEventListener('touchmove', actMove);
            window.removeEventListener('touchend', actEnd);
            window.removeEventListener('mousemove', actMove);
            window.removeEventListener('mouseup', actEnd);
        }
        const actMove = (e) => {
            _x = !!e.clientX ? e.clientX : e.targetTouches[0].clientX;
            per = _x / this.wrap.offsetWidth * 100;
            per < 0 ? per = 0 : per;
            per > 100 ? per = 100 : per;
            _per = 100 - per;
        
            divide_line.style.left = per + '%';

            if (this.divide_items.length === 2) {
                for (let i = n; i < this.divide_items.length; i++) {
                    this.divide_items[n].style.width = per + '%';
                    this.divide_items[n + 1].style.width = _per + '%';
                }
            } else {
                for (let i = n; i < this.divide_items.length; i++) {
                    let _w;
                    if (n === 0) {
                        _w = this.divide_items[n + 2].offsetWidth;
                        _w = _w / this.wrap.offsetWidth * 100;

                        if (_per - _w <= 0) {
                            per = 100 - _w;
                            divide_line.style.left = per + '%';
                            this.divide_items[n].style.width = per + '%';
                            this.divide_items[n + 1].style.width = _per - _w + '%';
                        } else {
                            this.divide_items[n].style.width = per + '%';
                            this.divide_items[n + 1].style.width = _per - _w + '%';
                        }
                    } else {
                        _w = this.divide_items[n - 1].offsetWidth;
                        _w = _w / this.wrap.offsetWidth * 100;

                        if (per - _w <= 0) {
                            divide_line.style.left = _w + '%';
                            this.divide_items[n].style.width = '0%';
                            this.divide_items[n + 1].style.width = 100 - _w + '%';
                        } else {
                            _w = this.divide_items[n - 1].offsetWidth;
                            _w = _w / this.wrap.offsetWidth * 100;   
                            this.divide_items[n].style.width = per - _w + '%';
                            this.divide_items[n + 1].style.width = _per + '%';
                        }
                    }
                }
            }
        }
        window.addEventListener('touchmove', actMove);
        window.addEventListener('touchend', actEnd);
        window.addEventListener('mousemove', actMove);
        window.addEventListener('mouseup', actEnd);
    }
}
document.addEventListener('DOMContentLoaded', function () {
    //layerpopup
    newhome.callLayer();
    //nav
    // UIexe.navToggle = new UI_ToggleAct({
    //     target: document.querySelector('.head'),
    //     btn: document.querySelectorAll('.head-nav-btn'),
    //     callback_show: () => {
    //         console.log('navToggle show');
    //     },
    //     callback_hide: () => {
    //         console.log('navToggle hide'); 
    //     },
    // });
    //hover layer
    UIexe.toggle.init();
    UIexe.hoverLayer({
        classname : 'btn-layer-hover'
    });
}, false);
