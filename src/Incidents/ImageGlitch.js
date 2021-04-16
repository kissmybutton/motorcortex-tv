import { HTMLClip, loadPlugin } from "@kissmybutton/motorcortex";
import canvasClipPluginDefinition from "../internalPlugins/canvasClip/main";
const CanvasClipPlugin = loadPlugin(canvasClipPluginDefinition);

export default class ImageGlitch extends HTMLClip {
  get html() {
    return `<div id="canvasClipContainer"></div>`;
  }

  get css() {
    return `
      #canvasClipContainer{
          width: ${this.props.containerParams.width};
          height: ${this.props.containerParams.height};
      }
    `;
  }

  buildTree() {
    const canvasClip = new CanvasClipPlugin.Clip(
      {
        imgUrl: this.attrs.imgUrl,
      },
      {
        selector: "#canvasClipContainer",
        containerParams: this.props.containerParams,
      }
    );

    this.addIncident(canvasClip, 0);
  }
}
