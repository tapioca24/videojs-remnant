# videojs-remnant

A video.js plugin to leave the last frame video at the end of playback.  
This is useful when playing a video that has been split into multiple files.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Installation](#installation)
- [Usage](#usage)
  - [`<script>` Tag](#script-tag)
  - [Browserify/CommonJS](#browserifycommonjs)
  - [Browserify/ES6](#browserifyes6)
  - [RequireJS/AMD](#requirejsamd)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
## Installation

```sh
npm install --save videojs-remnant
```

## Usage

To include videojs-remnant on your website or web application, use any of the following methods.

### `<script>` Tag

This is the simplest case. Get the script in whatever way you prefer and include the plugin _after_ you include [video.js][videojs], so that the `videojs` global is available.

```html
<script src="//path/to/video.min.js"></script>
<script src="//path/to/videojs-remnant.min.js"></script>
<script>
  var player = videojs('my-video');

  player.remnant();
</script>
```

### Browserify/CommonJS

When using with Browserify, install videojs-remnant via npm and `require` the plugin as you would any other module.

```js
var videojs = require('video.js');

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
require('videojs-remnant');

var player = videojs('my-video');

player.remnant();
```

### Browserify/ES6

When using with Browserify, install videojs-logo via npm and `import` the plugin as you would any other module.

```js
import videojs from 'video.js';

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
import 'videojs-remnant';

const player = videojs('my-video');

player.remnant();
```

### RequireJS/AMD

When using with RequireJS (or another AMD library), get the script in whatever way you prefer and `require` the plugin as you normally would:

```js
require(['video.js', 'videojs-remnant'], function(videojs) {
  var player = videojs('my-video');

  player.remnant();
});
```

## License

MIT. Copyright (c) tapioca24


[videojs]: http://videojs.com/
