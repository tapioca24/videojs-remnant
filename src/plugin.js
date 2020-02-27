import videojs from 'video.js';
import {version as VERSION} from '../package.json';
import correctColor from './correctColor';

const Plugin = videojs.getPlugin('plugin');

// Default options for the plugin.
const defaults = {
  disableColorCorrection: false
};

/**
 * An advanced Video.js plugin. For more information on the API
 *
 * See: https://blog.videojs.com/feature-spotlight-advanced-plugins/
 */
class Remnant extends Plugin {
  /**
   * Create a Remnant plugin instance.
   *
   * @param {Player} player A Video.js Player instance.
   * @param {Object} options An optional options object.
   */
  constructor(player, options) {
    super(player);
    this.options = videojs.mergeOptions(defaults, options);
    this.player.ready(() => this._onPlayerReady());
  }

  /**
   * Start the plugin after the player is ready.
   *
   * @private
   */
  _onPlayerReady() {
    this.player.addClass('vjs-remnant');
    this._setup();

    this.player.on('playerresize', e => {
      this._setCanvasStyle(e.target.offsetWidth, e.target.offsetHeight);
    });
    this.player.on('loadeddata', () => {
      this._hide();
    });
    this.player.on('ended', () => {
      this._capture();
      this._show();
    });
  }

  /**
   * Setup the plugin.
   *
   * @private
   */
  _setup() {
    const parent = this.player.el();
    const video = parent.querySelector('video');

    this.video = video;

    // Create div element
    const div = document.createElement('div'); // eslint-disable-line no-undef

    div.classList.add('vjs-remnant-content', 'vjs-hidden');
    this.div = div;

    const canvas = document.createElement('canvas'); // eslint-disable-line no-undef

    canvas.classList.add('vjs-remnant-canvas');
    canvas.width = 1280;
    canvas.height = 720;
    this.canvas = canvas;
    this._setCanvasStyle(parent.offsetWidth, parent.offsetHeight);

    div.appendChild(canvas);

    // video 要素の次に挿入する
    parent.insertBefore(div, video.nextSibling);
  }

  /**
   * Show the canvas.
   *
   * @private
   */
  _show() {
    this.div.classList.remove('vjs-hidden');
  }

  /**
   * Hide the canvas.
   *
   * @private
   */
  _hide() {
    this.div.classList.add('vjs-hidden');
  }

  /**
   * Set the canvas style.
   *
   * @private
   * @param {number} playerWidth Player width
   * @param {number} playerHeight Player height
   */
  _setCanvasStyle(playerWidth, playerHeight) {
    const aspectRatio = this.player.aspectRatio() || '16:9';
    const [horizontal, vertical] = aspectRatio.split(':').map(v => Number(v));
    const ratio = horizontal / vertical;
    const contentRatio = playerWidth / playerHeight;

    if (ratio < contentRatio) {
      // Set margins on the left and right
      const width = playerHeight * ratio;
      const padding = (playerWidth - width) / 2;

      this.canvas.style.width = width + 'px';
      this.canvas.style.height = '100%';
      this.canvas.style.left = padding + 'px';
      this.canvas.style.top = 0;
    } else {
      // Set margins on the top and bottom
      const height = playerWidth / ratio;
      const padding = (playerHeight - height) / 2;

      this.canvas.style.width = '100%';
      this.canvas.style.height = height + 'px';
      this.canvas.style.left = 0;
      this.canvas.style.top = padding + 'px';
    }
  }

  /**
   * Copy the rendered content of the video element to the canvas.
   *
   * @private
   */
  _capture() {
    const context = this.canvas.getContext('2d');

    context.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
    if (!this.options.disableColorCorrection) {
      correctColor(context, this.canvas.width, this.canvas.height);
    }
  }
}

// Define default values for the plugin's `state` object here.
Remnant.defaultState = {};

// Include the version number.
Remnant.VERSION = VERSION;

// Register the plugin with video.js.
videojs.registerPlugin('remnant', Remnant);

export default Remnant;
