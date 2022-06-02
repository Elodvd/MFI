import Feature from 'ol/Feature';
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";

export const Toulouse = new Feature({
    geometry: new Point(fromLonLat([1.4428482641703768, 43.60174471289672])),
    name: "Toulouse",
  });
export const Narbonne = new Feature({
    geometry: new Point(fromLonLat([3.034030749423082, 43.18386996556944])),
    name: "Narbonne",
  });
export const Montpellier = new Feature({
    geometry: new Point(fromLonLat([3.8758855208461562, 43.6116266258184])),
    name: "Montpellier",
  });
