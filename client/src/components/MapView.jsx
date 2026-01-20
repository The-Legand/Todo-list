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


function MapView({onMapClick}) {
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
   

    
    map.addInteraction(new Link());

    mapInstanceRef.current = map;

    const handleClick = (e) =>{
        const lonLat = toLonLat(e.coordinate);
        onMapClick?.(lonLat)
    }
    map.on("singleclick", handleClick)
  }, [onMapClick]);


return <div point={clickedCoordinates}
 ref={mapDivRef} style={{width: "90%", height: "300px"}}/>;


}

export default MapView