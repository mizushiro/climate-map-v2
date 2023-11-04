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

    // 아코디언
    $('.accordion-list').uxeAccordionMenu({
        'clickedShowOnly': true,
        'itemSelector' : '.accordion-group'
    });
});

const UIexe = {};
class UI_ToggleAct {
    constructor(opt) {
        this.btn = opt.btn;
        this.target = opt.target;
        this.state = opt.state;

        this.init();
    }

    init() {
        console.log(this)
        this.btn.addEventListener('click', this.toggle);
    }
    toggle = (e) => {
        if (this.target.length > 1) {
            for (let i = 0; i < this.target.length; i++) {
                this.target[i].dataset.toggle = (this.target[i].dataset.toggle === 'true') ? 'false' : 'true';
            }
        } else {
            this.target.dataset.toggle = (this.target.dataset.toggle === 'true') ? 'false' : 'true';
        }
        
    }
    show() {
        if (this.target.length > 1) {
            for (let i = 0; i < this.target.length; i++) {
                this.target.dataset.toggle = 'true';       
            }
        } else {
            this.target.dataset.toggle = 'true';
        }
    }
    hide() {
        if (this.target.length > 1) {
            for (let i = 0; i < this.target.length; i++) {
                this.target.dataset.toggle = 'false';       
            }
        } else {
            this.target.dataset.toggle = 'false';
        }
    }
}
class UI_DragMap {
    constructor(opt) {
        this.divide = document.querySelector('.btn-map-divide');
        this.area = document.querySelector('.map-original-area');
        this.divide_line = document.querySelector('.map-divide-line');
        this.divide_A = document.querySelector('.layer-deviation-item[data-name="a"]');
        this.divide_B = document.querySelector('.layer-deviation-item[data-name="b"]');
        this.ww = window.innerWidth;
    }
    start() {
        this.divide.addEventListener('touchstart', this.actStart);
    }
    end() {
        console.log('aaa');
        this.divide.removeEventListener('touchstart', this.actStart);
    }
    actStart = (e) => {
        console.log('actStart');
        const el = e.currentTarget;
        let _x;
        let per;
        let _per;

        const actEnd = (e) => { 
            console.log('actEnd');
            this.area.removeEventListener('touchmove', actMove);
            this.area.removeEventListener('touchend', actEnd);
        }
        const actMove = (e) => {
            console.log('actMove');
            _x = !!e.clientX ? e.clientX : e.targetTouches[0].clientX;

            per = _x / this.ww * 100;
            per < 0 ? per = 0 : per;
            per > 100 ? per = 100 : per;
            _per = 100 - per;

            this.divide_line.style.left = per + '%';
            this.divide_A.style.width = per + '%';
            this.divide_B.style.width = _per + '%';
        }
        this.area.addEventListener('touchmove', actMove);
        this.area.addEventListener('touchend', actEnd);
    }
}