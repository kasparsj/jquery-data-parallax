# [data-parallax]
Create super fast parallax effects using data attributes.

* written in native Javascript for best performance
* uses translate3d to ensure GPU acceleration
* uses single ticking requestAnimationFrame() method
* uses HSV color model for color interpolation
* intuitive default values, no need to type many parameters

## Examples

[See Examples](http://kasparsj.github.io/jquery-data-parallax/bower_components/jquery-data-parallax/examples/)

## Availability

```bash
bower install jquery-data-parallax
```

## Installation

```html
<script src="bower_components/jquery/dist/jquery.min.js"></script>
<script src="bower_components/jquery.requestAnimationFrame/jquery.requestAnimationFrame.min.js"></script>
<script src="bower_components/jquery-data-parallax/jquery.data-parallax.min.js"></script>
```

## Usage

Either use data attributes:

```html
<div data-parallax='{"y":"70%","scale":2,"rotate":180,"opacity":0}'></div>
```

or javascript:

```javascript
$("#selector").parallax({
    "y": "70%",
    "scale": 2,
    "rotate": 180,
    "opacity": 0
});
```

### Properties

All properties can be specified as **number** or **string** or **object**.  
Using the object syntax you can explicitly pass in a **from** value (optional), as well as override global options:

```html
<div data-parallax='{"opacity":{"to":1,"from":0.5,"duration":100},"translateY":"50%","duration":200}'></div>
```

### Currently supported properties:

#### pin
**Type:** boolean or selector

Make an elements' position fixed during the scene.

#### class
**Type** string

Adds one or more classes to the element during the scene.

#### x
**Type:** number or string (percentage or viewport units)

translateX. Percentages in this case are relative to the duration.

#### y
**Type:** number or string (percentage or viewport units)

translateY. Percentages in this case are relative to the duration.

#### z
**Type:** number or string (percentage or viewport units)

translateZ. Percentages in this case are relative to the duration.

#### scale or scaleX and scaleY
**Type:** number or string (percentage)

#### rotate
**Type:** number or string (percentage)

Rotation in degrees.

#### color
**Type:** string (e.g. "#ff0000")

Hex or rgb() color string.

#### backgroundColor
**Type:** string (e.g. "#ff0000")

Hex or rgb() color string.

#### opacity
**Type:** number (0 - 1)

#### top
**Type:** number or string (percentage or viewport units)

Better use "y" where possible.

#### left
**Type:** number or string (percentage or viewport units)

Better use "x" where possible.

#### width
**Type:** number or string (percentage or viewport units)

Better use "scaleX" where possible.

#### height
**Type:** number or string (percentage or viewport units)

Better use "scaleY" where possible.

#### backgroundPositionX
**Type:** number or string (percentage or viewport units)

Better use "x" where possible.

#### backgroundPositionY
**Type:** number or string (percentage or viewport units)

Better use "y" where possible.

### Options

Options can be specified for all properties:

```html
<div data-parallax='{"y":"70%","opacity":1,"duration":"150%"}'></div>
```

as well as (overridden) for each individually:

```html
<div data-parallax='{"y":"70%","opacity":{"to":1,"duration":"85%"},"duration":"150%"}'></div>
```

### Available options:

All options are **optional**.

#### offset
**Type:** number or string (percentage or viewport units) or callback function  
**Default:** 0

If you need to start the scene on an absolute offset or after/before "triggerElement"'s offset.

#### duration
**Type:** number or string (percentage or viewport units) or callback function  
**Default:** as long as it's needed to scroll past the element

Percentages are calculated against element dimensions rather than viewport: "50%" == 0.5 * $(el).outerWidth(true).  
For viewport relative values, use viewport units: vh or vw: "100vh" == $(window).height().  
Setting duration to "0" will run it till the end of document.

#### triggerElement
**Type:** selector  
**Default:** the element

Use this if you need another element to act as the trigger.
It's not recommended to set this to "null" or "false", because working with absolute offsets can become difficult 
when you need to change things. 

#### triggerHook
**Type:** number or string (percentage or viewport units) or callback function  
**Default:** "100%" ("0%" for "pin" property)

0% is top of the viewport and 100% is bottom of the viewport.

#### ease
**Type:** string or callback function  
**Default:** "linear"

#### axis
**Type:** string ("x" or "y")  
**Default:** "y"

#### enableTouchDevices
**Type:** boolean  
**Default:** false

This is per element / selector option. 

### Global options:

#### enableTouchDevices
**Type:** boolean  
**Default:** false

By default [data-parallax] is disabled on touch devices. To make it work add after including the js file:

```javascript
$.parallax.enableTouchDevices = true;
```

## Credits
This plugin was inspired from [Parallax Done Right](https://medium.com/@dhg/parallax-done-right-82ced812e61c) and [Perfecting Parallax Scrolling](https://github.com/Form5/parallax)
