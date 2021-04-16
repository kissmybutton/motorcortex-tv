import ImageCanvasClip from "./ImageCanvasClip";

export default {
  name: "Image Canvas Clip and various Effects",
  Clip: {
    exportable: ImageCanvasClip,
    attributesValidationRules: {
      imgUrl: {
        type: "string",
      },
    },
  },
};
