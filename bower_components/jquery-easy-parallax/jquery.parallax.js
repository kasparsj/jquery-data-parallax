;(function($) {
    'use strict';

    var $window = $(window),
        $elements = null,
        elementsArr,
        parallaxArr,
        scrollTop,
        windowHeight = $window.height(),
        windowWidth = $window.width(),
        scrollTicking = false,
        resizeTicking = false,
        isTouchDevice = window.Modernizr && typeof(Modernizr.touchevents) != 'undefined' ? Modernizr.touchevents : testTouchEvents();

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
                    var options = method || {};
                    setParallaxOptions.call(this, options);
                    parallaxArr = [];
                    this.each(updateParallaxArray);
                    if ($elements === null) {
                        $elements = this;
                        window.onresize = onResize;
                        window.onscroll = onScroll;
                        //setInterval(onScroll, 10);
                    }
                    else {
                        $elements.add(this);
                    }
                    elementsArr = $elements.toArray();
                }
        }
        return this;
    };

    function setParallaxOptions(options) {
        options || (options = {});
        this.data("parallax-options", options);
    }

    function updateParallaxArray(idx) {
        var $this = $(this),
            options = $this.data("parallax-options"),
            start = $this.data("parallax-start") || $this.offset().top,
            trigger = $this.data("parallax-trigger") || "100%",
            globalOptions = {
                start: start,
                trigger: trigger,
                duration: $this.data("parallax-duration") || (Math.min(convertToPx(trigger), start) + $this.outerHeight())
            },
            parallax = {};
        if (options.translateX || typeof $this.data("parallax-translate-x") != "undefined") {
            var translateXOptions = mergeOptions(options.translateX || $this.data("parallax-translate-x"), globalOptions);
            parallax.translateX = new Scene(translateXOptions, windowHeight);
        }
        if (options.translateY || typeof $this.data("parallax-translate-y") != "undefined") {
            var translateYOptions = mergeOptions(options.translateY || $this.data("parallax-translate-y"), globalOptions);
            parallax.translateY = new Scene(translateYOptions, windowHeight);
        }
        if (options.translateZ || typeof $this.data("parallax-translate-z") != "undefined") {
            var translateZOptions = mergeOptions(options.translateZ || $this.data("parallax-translate-z"), globalOptions);
            parallax.translateZ = new Scene(translateZOptions, windowHeight);
        }
        if (options.scale || typeof $this.data('parallax-scale') != "undefined") {
            var scaleOptions = mergeOptions(options.scale || $this.data('parallax-scale'), globalOptions, 1);
            parallax.scale = new Scene(scaleOptions, 1);
        }
        if (options.rotate || typeof $this.data('parallax-rotate') != "undefined") {
            var rotateOptions = mergeOptions(options.rotate || $this.data('parallax-rotate'), globalOptions);
            parallax.rotate = new Scene(rotateOptions, 360);
        }
        if (parallax.translateX || parallax.translateY || parallax.translateZ || parallax.scale || parallax.rotate) {
            parallax.transform = new Transform(new TransformMatrix());
        }

        if (options.opacity || typeof $this.data('parallax-opacity') != "undefined") {
            var opacityOptions = mergeOptions(options.opacity || $this.data('parallax-opacity'), globalOptions, 1);
            parallax.opacity = new Scene(opacityOptions, 1);
        }
        parallaxArr[idx] = parallax;
    }

    function onResize() {
        if (!resizeTicking) {
            window.requestAnimationFrame(function() {
                windowHeight = $window.height();
                windowWidth = $window.width();
                $elements.each(updateParallaxArray);
            });
            resizeTicking = true;
        }
    }

    function onScroll() {
        if (!scrollTicking) {
            window.requestAnimationFrame(animateElements);
            scrollTicking = true;
        }
    }

    function animateElements() {
        scrollTop = $window.scrollTop();
        for (var i=0; i<elementsArr.length; i++) {
            animateElement.call(elementsArr[i], i);
        }
        scrollTicking = false;
    }

    function animateElement(idx) {
        var parallax = parallaxArr[idx];
        if (parallax.transform) {
            TransformMatrix.fromEl(this, parallax.transform.matrix);
            if (parallax.translateX && parallax.translateX.update()) {
                parallax.transform.setTranslateX(parallax.translateX.value());
            }
            if (parallax.translateY && parallax.translateY.update()) {
                parallax.transform.setTranslateY(parallax.translateY.value());
            }
            if (parallax.translateZ && parallax.translateZ.update()) {
                parallax.transform.setTranslateZ(parallax.translateZ.value());
            }
            if (parallax.scale && parallax.scale.update()) {
                parallax.transform.setScale(parallax.scale.value());
            }
            if (parallax.rotate && parallax.rotate.update()) {
                parallax.transform.setRotation(parallax.rotate.value());
            }
            var transform = parallax.transform.toString();
            this.style['-webkit-transform'] = transform;
            this.style['-moz-transform'] = transform;
            this.style['-ms-transform'] = transform;
            this.style['-o-transform'] = transform;
            this.style.transform = transform;
        }
        if (parallax.opacity && parallax.opacity.update()) {
            this.style.opacity = parallax.opacity.value();
        }
    }

    function mergeOptions(options, globalOptions, defaultFrom) {
        if (typeof options != "object") {
            options = {to: options};
        }
        if (typeof options.from == "undefined") {
            options.from = defaultFrom || 0;
        }
        return $.extend({}, globalOptions, options);
    }

    function convertToPx(value, axis) {
        if (axis === 'x') {
            return covertOption(value, windowWidth);
        }
        return covertOption(value, windowHeight);
    }

    function covertOption(value, maxValue) {
        if (typeof value === "string" && value.match(/%/g)) {
            value = (parseFloat(value) / 100) * maxValue;
        }
        else if (typeof value == "function") {
            value = value(maxValue);
        }
        return value;
    }

    function easeInOutQuad(t, b, c, d) {
        return c*t/d + b;
        //return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
    }

    function Scene(options, maxValue, axis) {
        this.start = Math.max(options.start - convertToPx(options.trigger, axis), 0),
        this.trigger = options.trigger,
        this.duration = convertToPx(options.duration, axis),
        this.from = covertOption(options.from, maxValue),
        this.to = covertOption(options.to, maxValue);
    }
    Scene.prototype = {
        update: function() {
            var needsUpdate = (this.state == 'during');
            if (scrollTop < this.start) {
                this.state = 'before';
            }
            else if (scrollTop <= (this.start + this.duration)) {
                this.state = 'during';
                needsUpdate = true;
            }
            else {
                this.state = 'after';
            }
            return needsUpdate;
        },
        value: function() {
            if (this.state == 'before') {
                return this.from;
            }
            else if (this.state == 'during') {
                return easeInOutQuad(scrollTop-this.start, this.from, (this.to - this.from), this.duration);
            }
            else {
                return this.to;
            }
        }
    };

    function Transform(matrix) {
        this.matrix = matrix || new TransformMatrix();
    }
    Transform.prototype = {
        setTranslateX: function(value) {
            this.translateX = value;
        },
        setTranslateY: function(value) {
            this.translateY = value;
        },
        setTranslateZ: function(value) {
            this.translateZ = value;
        },
        setScale: function(value) {
            this.scale = value;
        },
        setRotation: function(angle) {
            this.rotate = angle;
        },
        toString: function() {
            var translateX = (typeof this.translateX != "undefined" ? this.translateX : this.matrix.getTranslateX()).toFixed(2),
                translateY = (typeof this.translateY != "undefined" ? this.translateY : this.matrix.getTranslateY()).toFixed(2),
                translateZ = (typeof this.translateZ != "undefined" ? this.translateZ : this.matrix.getTranslateZ()).toFixed(2),
                scale = (typeof this.scale != "undefined" ? this.scale : this.matrix.getScale()),
                rotate = (typeof this.rotate != "undefined" ? this.rotate : this.matrix.getRotation()),
                string = 'translate3d('+translateX+'px, '+translateY+'px, '+translateZ+'px)';
            if (scale != 1) {
                string += ' scale('+scale+')';
            }
            if (rotate) {
                string += 'rotate('+rotate+'deg)';
            }
            return string;
        }
    };

    function TransformMatrix() {
        this.matrix = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
    }
    TransformMatrix.fromArray = function(array, result) {
        if (array.length < 6) {
            return new TransformMatrix();
        }
        var result = result || new TransformMatrix();
        for (var i=0; i<array.length; i++) {
            array[i] = parseFloat(array[i]);
        }
        if (array.length < 16) {
            array = [
                array[0], array[1], 0, 0,
                array[2], array[3], 0, 0,
                0, 0, 1, 0,
                array[4], array[5], 0, 1
            ];
        }
        result.matrix = array;
        return result;
    };
    TransformMatrix.fromEl = function(el, result) {
        if (!window.getComputedStyle) return;
        var style = getComputedStyle(el),
            transform = style.transform || style.webkitTransform || style.mozTransform;
        return TransformMatrix.fromArray(transform.replace(/^matrix(3d)?\((.*)\)$/, '$2').split(/, /), result);
    };
    TransformMatrix.prototype = {
        getTranslateX: function() {
            return this.matrix[12];
        },
        setTranslateX: function(value) {
            this.matrix[12] = value;
        },
        getTranslateY: function() {
            return this.matrix[13];
        },
        setTranslateY: function(value) {
            this.matrix[13] = value;
        },
        getTranslateZ: function() {
            return this.matrix[14];
        },
        setTranslateZ: function(value) {
            this.matrix[14] = value;
        },
        getScale: function() {
            var a = this.matrix[0],
                b = this.matrix[1],
                d = 10;
            return Math.round( Math.sqrt( a*a + b*b ) * d ) / d;
        },
        getRotation: function() {
            var a = this.matrix[0],
                b = this.matrix[1];
            return Math.round(Math.atan2(b, a) * (180/Math.PI));
        }
    };

    if (!isTouchDevice) {
        $(function() {

            var selector  = '[data-parallax-translate-x],[data-parallax-translate-y],[data-parallax-translate-z]';
                selector += ',[data-parallax-scale],[data-parallax-rotate],[data-parallax-opacity]';
            $(selector).parallax();

        });
    }

})(jQuery);
