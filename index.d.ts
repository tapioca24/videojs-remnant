import videojs, { VideoJsPlayer } from "video.js";

declare module "video.js" {
  class VideoJsRemnant {}

  interface VideoJsPlayer {
    remnant(): VideoJsRemnant;
  }
}
