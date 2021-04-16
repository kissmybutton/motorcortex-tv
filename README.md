# motorcortex-tv

## Demo

[Check it out here](https://kissmybutton.github.io/motorcortex-tv/demo/index.html)

## Installation

```bash
$ npm install --save @kissmybutton/motorcortex-tv
# OR
$ yarn add @kissmybutton/motorcortex-tv
```

## Loading

```javascript
import { loadPlugin } from "@kissmybutton/motorcortex";
import tvDefinition from "@kissmybutton/motorcortex-abstracts";
const Plugin = loadPlugin(tvDefinition);
```

# Create incident

## CrossMoveRight

```javascript
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
```

### CrossMoveRight Attrs

| Name           |                   Are                   |                Values |
| -------------- | :-------------------------------------: | --------------------: |
| width          |            width of the canvas          |                   num |
| height         |           height of the canvas          |                   num |
| duration       |        the duration of the effect       |                   num |
| sound          |          iclude noise sound or not      |                   bool|

## imageGlitch

```javascript
const imageGlitch = new TVPlugin.ImageGlitch(
  {
    imgUrl:
      "https://images.hdqwalls.com/wallpapers/minimal-sunset-landscape-4k-w5.jpg",
  },
  {
    selector: "#glitchContainer",
    containerParams: {
      width: "800px",
      height: "600px",
    },
  }
);
```

### CrossMoveRightOutline Attrs

| Name           |                       Are                       |                Values |
| -------------- | :---------------------------------------------: | --------------------: |
| imgUrl         |    the image url to apply the effect on         |                   url |
