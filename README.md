# jquery-easy-parallax
jQuery plugin for easy parallax effect

## Availability

```bash
bower install jquery-easy-parallax
```

## Installation

```html
<script src="bower_components/jquery/jquery.js"></script>
<script src="bower_components/requestAnimationFrame.js/requestAnimationFrame.js"></script>
<script src="bower_components/jquery-easy-parallax/jquery.parallax.js"></script>
```

## Usage

Either use data attributes:

```html
<div data-parallax="true" data-speed="0.7"></div>
```

or javascript:

```javascript
$("#selector").parallax({speed: 0.7});
```