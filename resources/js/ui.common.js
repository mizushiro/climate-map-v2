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

const UIexe = {};
UIexe.layerFullSmall = () => {
    const fulls = document.querySelectorAll('.btn-full-view');
    const actLayerFullSmall = (e) => {
        const _this = e.currentTarget;
        _this.parentNode.parentNode.classList.toggle('active');
    }
    for (let item of fulls) {
        item.addEventListener('click', actLayerFullSmall);
    }

}
UIexe.inputClear = () => {
    const inputClear = document.querySelector('.btn-clear');
    const actClear = (e) => {
        const el = e.currentTarget;
        const id = el.dataset.id;

        document.querySelector('input[data-id="'+ id +'"]').value = '';
    }
    inputClear.addEventListener('click', actClear);
}
UIexe.hoverLayer = (opt) => {
    const btnLayerHovers = document.querySelectorAll('.' + opt.classname);
    const actHover = (e) => {
        const _this = e.currentTarget;
        _this.classList.toggle('selected');
    }
    for (let item of btnLayerHovers) {
        item.addEventListener('mouseover', actHover);
        item.addEventListener('mouseout', actHover);
    }
}
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