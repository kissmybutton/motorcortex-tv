import ImageCanvasClip from "./ImageCanvasClip";
import CanvasImageGlitch from './CanvasImageGlitch';

export default {
    name: "Image Canvas Clip and various Effects",
    Clip: {
        exportable: ImageCanvasClip,
        attributesValidationRules: {
            imgUrl: {
                type: "string"
            }
        }
    }
};
