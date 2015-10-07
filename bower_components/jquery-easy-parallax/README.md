# jquery-easy-parallax
jQuery plugin for easy parallax effect

## Examples

[See Examples](http://kasparsj.github.io/jquery-easy-parallax/bower_components/jquery-easy-parallax/examples/)

## Availability

```bash
bower install jquery-easy-parallax
```

## Installation

```html
<script src="bower_components/jquery/dist/jquery.min.js"></script>
<script src="bower_components/jquery.requestAnimationFrame/jquery.requestAnimationFrame.min.js"></script>
<script src="bower_components/jquery-easy-parallax/jquery.parallax.min.js"></script>
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

All properties can be specified as **number** or **percentage** (string) or **object**.  
To specify a **from** value as well **to**, use the object syntax:

```html
<div data-parallax='{"opacity":{"to":1,"from":0}}'></div>
```

### Available properties:

x

y

z

scale

rotate

opacity

### Options

Options can be specified for all properties:

```html
<div data-parallax='{"y":"70%","opacity":{"to":1,"from":0},"duration":"150%"}'></div>
```

or (overridden for) each individually:

```html
<div data-parallax='{"y":"70%","opacity":{"to":1,"from":0,"duration":"85%"},"duration":"150%"}'></div>
```

### Available options:

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
