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
import Chart from "../Chart/Chart";
import close from "./close.svg";

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
  const [pointClick, setPointClick] = useState(false);
  const [featureName, setFeatureName] = useState("");
  const [map, setMap] = useState();
  const [temp, setTemp] = useState([]);
  const [humidityTx, setHumidityTx] = useState([]);

  const mapElement = useRef();

  const handleFeature = () => {
    setPointClick(!pointClick);
  };

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
          const lonlat = toLonLat(feature.getGeometry().getCoordinates());
          const lon = lonlat[0];
          const lat = lonlat[1];
          setFeatureName(feature.get("name"));

          const apiCall = async () => {
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=539a92a71fbb1b6ee46f8afdfc95bb2e`
            );
            const resJson = await response.json();
            setTemp([
              resJson.daily[0].temp.day,
              resJson.daily[1].temp.day,
              resJson.daily[2].temp.day,
              resJson.daily[3].temp.day,
              resJson.daily[4].temp.day,
            ]);
            setHumidityTx([
              resJson.daily[0].humidity,
              resJson.daily[1].humidity,
              resJson.daily[2].humidity,
              resJson.daily[3].humidity,
              resJson.daily[4].humidity,
            ]);
          };
          apiCall();
          setPointClick(true);
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
      {pointClick ? (
        <div className="chartElement">
          <div>
            <Chart
              title={`Last three days Temperature and Humidity % in ${featureName}`}
              chartTempOptions={[temp[0], temp[1], temp[2], temp[3], temp[4]]}
              chartHumOptions={[
                humidityTx[0],
                humidityTx[1],
                humidityTx[2],
                humidityTx[3],
                humidityTx[4],
              ]}
            />
          </div>
          <img
            className="imgClose"
            src={close}
            alt="close"
            onClick={handleFeature}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default MapWrapper;
