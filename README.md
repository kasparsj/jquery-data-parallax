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

#### Supported properties:

translateX

translateY

translateZ

scale

rotate

opacity

#### Available options:

Options can be specified for all properties, or each individually

**start** - number | selector

**duration** - number | percentage string | callback function

**trigger** - number | percentage string

**axis** - "x" | "y"
