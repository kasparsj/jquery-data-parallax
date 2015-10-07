# jquery-easy-parallax
jQuery plugin for easy parallax effect

## Demo

http://kasparsj.github.io/jquery-easy-parallax/

## Availability

```bash
bower install jquery-easy-parallax
```

## Installation

```html
<script src="bower_components/jquery/dist/jquery.min.js"></script>
<script src="bower_components/requestAnimationFrame.js/requestAnimationFrame.min.js"></script>
<script src="bower_components/jquery-easy-parallax/jquery.parallax.min.js"></script>
```

## Usage

Either use data attributes:

```html
<div data-parallax='{"translateY":"70%","scale":2,"rotate":180,"opacity":0}'></div>
```

or javascript:

```javascript
$("#selector").parallax({
    "translateY": "70%",
    "scale": 2,
    "rotate": 180,
    "opacity": 0
});
```

### Supported properties:

Property value can be specified as number or percentage (string).
To specify a **from** value as well **to**, use object syntax:
```javascript
{"to":1,"from":0}
```

translateX

translateY

translateZ

scale

rotate

opacity

### Available options:

Options can be specified for all properties, or each individually

#### start
**Type:** number or selector  
**Default:** the elements top offset

#### duration
**Type:** number or percentage (string) or callback function  
**Default:** element top + height - start

#### trigger
**Type:** number or percentage (string)  
**Default:**: "100%"

#### ease
**Type:** function or string  
**Default:** "linear"

#### axis
**Type:** string ("x" or "y")  
**Default:** "y"
