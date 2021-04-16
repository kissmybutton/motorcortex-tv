import { HTMLClip, loadPlugin, AudioPlayback } from "@kissmybutton/motorcortex";
import NoiseEffectDef from "../internalPlugins/noiseEffect/main";
const NoiseEffectPlugin = loadPlugin(NoiseEffectDef);

import base64Sound from "../assets/sound";

export default class TVNoise extends HTMLClip {
  get html() {
    return `
      <div class="bg"> 
          <canvas id="tv" width="${this.attrs.width}" height="${this.attrs.height}"></canvas>
      </div>
    `;
  }

  get css() {
    return `
      .bg{
          background: black;
      }
    `;
  }

  get audioSources() {
    return [
      {
        src: base64Sound,
        base64: true,
        id: "static",
      },
    ];
  }

  buildTree() {
    const duration = this.attrs.duration;
    const noiseEffect = new NoiseEffectPlugin.NoiseEffect(
      {
        animatedAttrs: {
          canvasImage: "dynamic",
        },
      },
      {
        selector: "#tv",
        duration,
      }
    );

    this.addIncident(noiseEffect, 0);

    if (this.attrs.sound === true) {
      for (let i = 0; i < this.attrs.duration - 4000; i += 4000) {
        const sound = new AudioPlayback({
          selector: "~#static",
          duration: 4000,
        });
        this.addIncident(sound, i * 4000);
      }
      const leftovers = this.attrs.duration % 4000;
      const leftoverSound = new AudioPlayback({
        selector: "~#static",
        duration: leftovers,
      });
      this.addIncident(leftoverSound, this.attrs.duration - leftovers);
    }
  }
}
