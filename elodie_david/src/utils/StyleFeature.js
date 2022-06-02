import { Circle, Fill, Stroke, Style } from "ol/style";

const fillStyle = new Fill({
    color: "yellow",
  });
  const strokeStyle = new Stroke({
    color: "black",
    width: 2.8,
  });

export const StyleFeature = (feature) => {
    feature.setStyle(
      new Style({
        image: new Circle({
          fill: fillStyle,
          stroke: strokeStyle,
          radius: 9,
        }),
      })
    );
  };