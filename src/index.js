import TVNoise from "./TVNoise";

export default {
  npm_name: "@kissmybutton/motorcortex-tv",
  incidents: [
    {
      exportable: TVNoise,
      name: "TVNoise",
      attributesValidationRules: {
        duration: {
          optional: false,
          type: "number",
          min: 1,
        },
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
  ],
};
