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
<div data-parallax="true" data-speed="0.7"></div>
```

or javascript:

```javascript
$("#selector").parallax({speed: 0.7});
```