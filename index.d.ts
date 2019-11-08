import videojs, { VideoJsPlayer } from "video.js";

declare module "video.js" {
  class VideoJsRemnant {}

  namespace VideoJsRemnant {
    interface Options {
      disableColorCorrection: boolean;
    }
  }

  interface VideoJsPlayer {
    remnant(options?: VideoJsRemnant.Options): VideoJsRemnant;
  }
}
