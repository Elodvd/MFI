import React, { useState, useEffect, useRef } from "react";
import Map from "ol/Map";
import View from 'ol/View';
import Feature from 'ol/Feature';
import TileLayer from "ol/layer/Tile";

import OSM from "ol/source/OSM";
import OlMap from "ol/Map";
import "ol/ol.css";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Circle, Fill, Stroke, Style } from "ol/style";

import "./mapWrapper.css";
import { StyleFeature } from "../utils/StyleFeature";

/*

const fillStyle = new Fill({
  color: "yellow",
});
const strokeStyle = new Stroke({
  color: "black",
  width: 2.8,
});
const StyleFeature = (feature: any) => {
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
*/
const BaseLayer = new TileLayer({
  source: new OSM(),
});

const Toulouse = new Feature({
  geometry: new Point(fromLonLat([1.4428482641703768, 43.60174471289672])),
  name: "Toulouse",
});
const Narbonne = new Feature({
  geometry: new Point(fromLonLat([3.034030749423082, 43.18386996556944])),
  name: "Narbonne",
});
const Montpellier = new Feature({
  geometry: new Point(fromLonLat([3.8758855208461562, 43.6116266258184])),
  name: "Montpellier",
});


StyleFeature(Toulouse);
StyleFeature(Narbonne);
StyleFeature(Montpellier);


const vectorSource = new VectorSource({
  features: [Toulouse, Narbonne, Montpellier],
});


const vectorLayer = new VectorLayer({
  source: vectorSource,
});

function MapWrapper() {
 
  //const [pointClick, setPointClick] = useState(false);
  const [map, setMap] = useState();
  const mapElement= useRef();
  const chartElement= useRef();

  
  useEffect(() => {
    if (mapElement.current != null) {
      const initialMap = new Map({
        target: mapElement.current,
        layers: [BaseLayer, vectorLayer],
        view: new View({
          center: fromLonLat([2.7, 43.4]),
          zoom: 9,
        }),
      });
      setMap(initialMap);

      return () => {
        initialMap.setTarget(undefined);
      };
    }
  }, []);
  /*
  const popup = new Overlay({
    if (chartElement.current) {
    element: chartElement.current
  });
  map.addOverlay(popup);
  */

  /*
  useEffect(() => {
    if (map) {
      map.on("click", (event) => {
        map.forEachFeatureAtPixel(event.pixel, (feature) => {
          if (chartElement.current) {
            const featureName = feature.get("name");
            setParcName(featureName);
            setPointClick(true);
          }
        });
      });
      map.on("pointermove", function (e) {
        const pixel = map.getEventPixel(e.originalEvent);
        const match = map.hasFeatureAtPixel(pixel);
        map.getTargetElement().style.cursor = match ? "pointer" : "";
      });
    }
  });
*/
  return (
    <div className="mapContainer">
      <div className="mapElement" ref={mapElement} />
     
     

    </div>
  );
}

export default MapWrapper;

//<div className="h-96 w-3/6 mt-0 mb-0 mr-auto ml-auto" ref={mapElement} />