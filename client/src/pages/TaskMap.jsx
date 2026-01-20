import { useRef, useEffect } from "react";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import { Feature, Map, View } from "ol";
import { fromLonLat } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Link from "ol/interaction/Link";
import "ol/ol.css";
import { useAtomValue } from "jotai";
import { tasksAtom } from "../helpers/atoms";
import DragAndDrop from "ol/interaction/DragAndDrop";
import Style from "ol/style/Style";
import Text from "ol/style/Text";
import Fill from "ol/style/Fill";
import CircleStyle from "ol/style/Circle";
import Stroke from "ol/style/Stroke";

function convertToGeoJSON(data) {
  const geoJson = {
    type: "FeatureCollection",
    features: [],
  };

  data.forEach((item) => {
    const feature = {
      type: "Feature",
      properties: { name: item.name },
      geometry: item.position,
    };
    geoJson.features.push(feature);
  });
  return geoJson;
}
export default function TaskMap() {
  const mapDivRef = useRef(null);
  const mapInstanceRef = useRef(null);

  const tasks = useAtomValue(tasksAtom);
  const tasksGeoJSONed = convertToGeoJSON(tasks);
  console.log(tasksGeoJSONed);
  useEffect(() => {
    if (mapInstanceRef.current) return;

    const tileLayer = new TileLayer({
      source: new OSM(),
    });

    const map = new Map({
      target: mapDivRef.current,
      layers: [tileLayer],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2,
      }),
    });

    const taskLayerSource = new VectorSource();
    const format = new GeoJSON();
    const features = format.readFeatures(tasksGeoJSONed, {
      featureProjection: "EPSG:3857",
      dataProjection: "EPSG:4326",
    });
    taskLayerSource.addFeatures(features);
    const taskLayer = new VectorLayer({
      source: taskLayerSource,
      style: (feature) => {
        const isActive = feature.get("isActive") === true;

        return new Style({
          image: new CircleStyle({
            radius: 6,
            fill: new Fill({ color: "white" }),
            stroke: new Stroke({ color: "black", width: 2 }),
          }),
          text: isActive
            ? new Text({
                text: feature.get("name"),
                offsetY: -15,
                backgroundFill: new Fill({ color: "white" }),
                padding: [2, 4, 2, 4],
              })
            : null,
        });
      },
    });

    map.addInteraction(
      new DragAndDrop({
        source: taskLayerSource,
        formatConstructors: [GeoJSON],
      }),
    );

    let lastActive = null;
    map.on("pointermove", (evt) => {
      const feature = map.forEachFeatureAtPixel(evt.pixel, (f) => f);

      if (lastActive && lastActive !== feature) {
        lastActive.set("isActive", false);
      }
      if (feature) {
        feature.set("isActive", true);
      }

      lastActive = feature || null;
      taskLayer.changed();
    });
    map.addLayer(taskLayer);
    map.addInteraction(new Link());
    mapInstanceRef.current = map;
  }, []);
  return (
    <div
      id="map"
      ref={mapDivRef}
      style={{
        margin: 0,
        height: "100%",
        width: "100%",
        backgroundColor: "#04041b",
      }}
    ></div>
  );
}
