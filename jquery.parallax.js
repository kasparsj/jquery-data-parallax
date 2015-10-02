;(function($) {
    'use strict';

    var $window = $(window),
        $elements = null,
        scrollTop,
        windowHeight,
        ticking = false,
        isTouchDevice = typeof(Modernizr.touchevents) != 'undefined' ? Modernizr.touchevents : testTouchEvents();

    function testTouchEvents() {
        return 'ontouchstart' in window // works on most browsers
            || 'onmsgesturechange' in window; // works on ie10
    }

    $.fn.parallax = function(method) {
        switch (method) {
            case 'reset':
                this.css('transform', '');
                break;
            case 'destroy':
                $elements.not(this);
                break;
            default:
                if (!isTouchDevice) {
                    if ($elements === null) {
                        $elements = this;
                        $window.on("scroll", onScroll);
                    }
                    else {
                        $elements.add(this);
                    }
                }
        }
        return this;
    };

    function onScroll() {
        requestTick();
    }

    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(update);
            ticking = true;
        }
    }

    function update(time) {
        scrollTop = $window.scrollTop();
        windowHeight = $window.height();

        $elements.each(function(){
            var $this = $(this),
                start = $this.data('start') || 0,
                end = $this.data('end') || Number.MAX_SAFE_INTEGER;
            if (scrollTop >= start && scrollTop < end) {
                var speed = $this.data('speed') || 0.5,
                    distance = ((scrollTop - start) * speed),
                    translateX = getTranslateX(this),
                    translateY = distance.toFixed(2),
                    translateZ = getTranslateZ(this),
                    transform = 'translate3d(' + translateX + 'px,' + translateY  + 'px,' + translateZ + 'px)';
                $this.css({
                    "-ms-transform": transform,
                    "-webkit-transform": transform,
                    transform: transform
                });
            }
        });

        ticking = false;
    }

    function getTranslateX(obj) {
        if(!window.getComputedStyle) return;
        var style = getComputedStyle(obj),
            transform = style.transform || style.webkitTransform || style.mozTransform;
        var mat = transform.match(/^matrix3d\((.+)\)$/);
        if(mat) return parseFloat(mat[1].split(', ')[12]);
        mat = transform.match(/^matrix\((.+)\)$/);
        return mat ? parseFloat(mat[1].split(', ')[4]) : 0;
    }

    function getTranslateZ(obj) {
        if(!window.getComputedStyle) return;
        var style = getComputedStyle(obj),
            transform = style.transform || style.webkitTransform || style.mozTransform;
        var mat = transform.match(/^matrix3d\((.+)\)$/);
        return mat ? parseFloat(mat[1].split(', ')[14]) : 0;
    }

    if (!isTouchDevice) {
        $(function() {

            $('[data-parallax="true"]').parallax();

        });
    }

})(jQuery);
