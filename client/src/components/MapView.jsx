import React, { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from 'ol/layer/Tile';
import VectorLayer from "ol/layer/Vector";
import OSM from "ol/source/OSM";
import  {toLonLat}  from "ol/proj"
import VectorSource from 'ol/source/Vector';
import Modify from 'ol/interaction/Modify';
import Link from 'ol/interaction/Link'
import Draw from 'ol/interaction/Draw'
import Point from 'ol/geom/Point'
import Feature from 'ol/Feature'
import Style from "ol/style/Style";
import CircleStyle from "ol/style/Circle";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";


function MapView({onMapClick, coordinates}) {
    const mapDivRef = useRef(null)
    const mapInstanceRef = useRef(null)
    const [clickedCoordinates, setClickedCoordinates] = useState(null);
    
  useEffect(() => {

    const tileLayer = new TileLayer({
        source: new OSM()
    })


    if(mapInstanceRef.current)return;
    const map = new Map({
      target: mapDivRef.current,
      layers: [tileLayer],
      view: new View({
        center:[0, 0],
        zoom: 5,
      }),
    });
    const source = new VectorSource();
    const pointLayer = new VectorLayer({
        source:source,
        style: new Style({
            image: new CircleStyle({
                radius:10,
                fill: new Fill({color:"#00e5ff"}),
                stroke: new Stroke({color:"#000", width:2})
            }),
        })
    })

    
    map.addInteraction(new Link());

    mapInstanceRef.current = map;

    const handleClick = (e) =>{
        const point = new Point(e.coordinate)
        const pointFeature = new Feature({ geometry: point });
        source.clear();
        source.addFeature(pointFeature);
        const lonLat = toLonLat(e.coordinate);
        onMapClick?.(lonLat)
    }

    map.addLayer(pointLayer)
    map.on("singleclick", handleClick)
  }, [onMapClick]);


return <div point={clickedCoordinates}
 ref={mapDivRef} style={{width: "100%", height: "300px"}}/>;


}

export default MapView