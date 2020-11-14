import Player from "@kissmybutton/motorcortex-player";
import { HTMLClip, loadPlugin } from "@kissmybutton/motorcortex/";
import TVNoisePluginDef from "../dist/motorcortex-tv.umd";
const TVNoisePlugin = loadPlugin(TVNoisePluginDef);

const myClip = new HTMLClip({
  html: `<div id="container"></div>`,
  css: `
        container{
            width: 800px;
            height: 600px;
        }
    `,
  host: document.getElementById("clip"),
  containerParams: {
    width: "800px",
    height: "600px",
  },
});

const tvNoise = new TVNoisePlugin.TVNoise(
  {
    width: 800,
    height: 600,
    duration: 6000,
    sound: true,
  },
  {
    selector: "#container",
  }
);

myClip.addIncident(tvNoise, 0);
new Player({ clip: myClip });
