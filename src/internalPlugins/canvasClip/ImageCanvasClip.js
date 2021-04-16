import { BrowserClip } from "@kissmybutton/motorcortex";

export default class ImageGlitch extends BrowserClip {
  onAfterRender() {
    this.contextLoading();
    // create a canvas
    const canvas = this.context.getElements("canvas")[0];
    const ctx = canvas.getContext("2d");

    this.setCustomEntity("canvas", ctx);

    const img = new Image();
    img.onload = () => {
      this.context.image = img;
      ctx.drawImage(
        img, // image
        0, // position
        0, // position
        img.width, // original image width
        img.height, // original image height
        0,
        0,
        canvas.width,
        canvas.height
      );
      this.contextLoaded();
    };
    img.src = this.attrs.imgUrl;
  }

  get html() {
    return `<canvas width="${parseInt(
      this.props.containerParams.width
    )}" height="${parseInt(this.props.containerParams.height)}"></canvas>`;
  }
}
