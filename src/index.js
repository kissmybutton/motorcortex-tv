import TVNoise from "./Incidents/TVNoise";
import ImageGlitch from "./Incidents/ImageGlitch";
import { name, version } from "../package.json";

export default {
  npm_name: name,
  version,
  incidents: [
    {
      exportable: TVNoise,
      name: "TVNoise",
      attributesValidationRules: {
        width: {
          optional: false,
          type: "number",
          min: 1,
        },
        height: {
          optional: false,
          type: "number",
          min: 1,
        },
        sound: {
          optional: true,
          type: "boolean",
        },
      },
    },
    {
      exportable: ImageGlitch,
      name: "ImageGlitch",
      attributesValidationRules: {
        imgUrl: {
          type: "string",
          optional: false,
        },
      },
    },
  ],
};
