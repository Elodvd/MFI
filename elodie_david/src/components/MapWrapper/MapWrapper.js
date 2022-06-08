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
import { apiCall } from "../../utils/API";
import { ExtractHum, ExtractTemps } from "../../utils/ExtractData";
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

          const fetchData = async () => {
            const resJson = await apiCall(lat, lon);
            setTemp(ExtractTemps(resJson));
            setHumidityTx(ExtractHum(resJson));
          };
          setPointClick(true);
          fetchData();
        });
      });

      map.on("pointermove", function (e) {
        const pixel = map.getEventPixel(e.originalEvent);
        const match = map.hasFeatureAtPixel(pixel);
        map.getTargetElement().style.cursor = match ? "pointer" : "";
      });
    }
  }, [map]);

  return (
    <div className="mapContainer">
      <div className="mapElement" ref={mapElement} />
      {pointClick ? (
        <div className="chartElement">
          <div>
            <Chart
              title={`Last three days Temperature and Humidity % in ${featureName}`}
              chartTempOptions={[...temp]}
              chartHumOptions={[...humidityTx]}
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
