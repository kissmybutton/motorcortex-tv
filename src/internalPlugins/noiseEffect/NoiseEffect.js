import { Effect } from "@kissmybutton/motorcortex";

export default class NoiseEffect extends Effect {
  onGetContext() {
    this.time = 0;
    this.canvasContext = this.element.getContext("2d");
  }

  onProgress(fr, ms) {
    const time = Math.round(ms / 20);
    if (time === this.time) {
      return;
    }
    this.time = time;

    const imgd = this.canvasContext.createImageData(
      this.element.width,
      this.element.height
    );
    const pix = imgd.data;

    for (let i = 0, n = pix.length; i < n; i += 12) {
      const c =
        6 + Math.sin(i / 60000 + (this.time % this.element.height) / 10);
      pix[i] = pix[i + 1] = pix[i + 2] = pix[i + 3] = pix[i + 4] =
        40 * Math.random() * c;
      pix[i + 5] = 255;
    }

    this.canvasContext.putImageData(imgd, 0, 0);
  }
}
