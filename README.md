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
<div data-parallax-translate-y="70%"
     data-parallax-scale="2"
     data-parallax-rotate="180"
     data-parallax-opacity="0"></div>
```

or javascript:

```javascript
$("#selector").parallax({
    "translate-y": "70%",
    "scale": 2,
    "rotate": 180,
    "opacity": 0
});
```