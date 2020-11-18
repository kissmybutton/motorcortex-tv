import Player from "@kissmybutton/motorcortex-player";
import { HTMLClip, loadPlugin } from "@kissmybutton/motorcortex/";
import TVPluginDef from "../dist/motorcortex-tv.umd";
const TVPlugin = loadPlugin(TVPluginDef);

const myClip = new HTMLClip({
  html: `<div>
    <div id="container"></div>
    <div id="glitchContainer"></div>
 </div>    
`,
  css: `
        #container, #glitchContainer{
            width: 800px;
            height: 600px;
        }
    `,
  host: document.getElementById("clip"),
  containerParams: {
    width: "800px",
    height: "1200px",
  },
});

const tvNoise = new TVPlugin.TVNoise(
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

const imageGlitch = new TVPlugin.ImageGlitch({
    imgUrl: "https://images.hdqwalls.com/wallpapers/minimal-sunset-landscape-4k-w5.jpg"
}, {
    selector: "#glitchContainer",
    containerParams: {
        width: "800px",
        height: "600px"
    }
});

myClip.addIncident(tvNoise, 0);
myClip.addIncident(imageGlitch, 0);
new Player({ clip: myClip });
