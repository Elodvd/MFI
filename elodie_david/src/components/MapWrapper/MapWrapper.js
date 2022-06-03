import React, { useState, useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import "ol/ol.css";
import { fromLonLat, toLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

import "./mapWrapper.css";
import { StyleFeature } from "../../utils/StyleFeature";
import { Toulouse, Narbonne, Montpellier } from "../../utils/Locations";
import { apiCall } from "../../utils/API";
import axios from "axios";

const BaseLayer = new TileLayer({
  source: new OSM(),
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
  const [data, setData] = useState({});
  const [temp, setTemp] = useState([]);
  const [humidityTx, setHumidityTx] = useState([]);
  const [location, setLocation] = useState([]);
  const mapElement = useRef();
  const chartElement = useRef();

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

  useEffect(() => {
    if (map) {
      map.on("click", (event) => {
        map.forEachFeatureAtPixel(event.pixel, (feature) => {
          const featureName = feature.get("name");
          const lonlat = toLonLat(feature.getGeometry().getCoordinates());
          const lon = lonlat[0];
          const lat = lonlat[1];
          console.log("featureName", featureName);
          console.log("lon & lat", lon, lat);

          const fetchApi = async () => {
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=539a92a71fbb1b6ee46f8afdfc95bb2e`
            );
            const resJson = await response.json();
            setTemp([
              resJson.daily[0].temp.day,
              resJson.daily[1].temp.day,
              resJson.daily[2].temp.day,
            ]);
            setHumidityTx([
              resJson.daily[0].humidity,
              resJson.daily[1].humidity,
              resJson.daily[2].humidity,
            ]);
          };
          fetchApi();
        });
      });

      map.on("pointermove", function (e) {
        const pixel = map.getEventPixel(e.originalEvent);
        const match = map.hasFeatureAtPixel(pixel);
        map.getTargetElement().style.cursor = match ? "pointer" : "";
      });
    }
  });

  return (
    <div className="mapContainer">
      <div className="mapElement" ref={mapElement} />
      <div className="mapinfo">
        <p>{temp[0] ? temp[0] : "no"}</p>
      </div>
    </div>
  );
}

export default MapWrapper;