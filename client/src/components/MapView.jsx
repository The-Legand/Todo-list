import React, { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from 'ol/layer/Tile';
import OSM from "ol/source/OSM";
import  {toLonLat}  from "ol/proj"
function MapView({onMapClick}) {
    const mapDivRef = useRef(null)
    const mapInstanceRef = useRef(null)
    const [clickedCoordinates, setClickedCoordinates] = useState(null);
    
  useEffect(() => {
    if(mapInstanceRef.current)return;
    const map = new Map({
      target: mapDivRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center:[0, 0],
        zoom: 5,
      }),
    });

    mapInstanceRef.current = map;

    const handleClick = (e) =>{
        const lonLat = toLonLat(e.coordinate);
        onMapClick?.(lonLat)
    }
    map.on("singleclick", handleClick)
  }, [onMapClick]);


return <div point={clickedCoordinates}
 ref={mapDivRef} style={{width: "70%", height: "300px"}}/>;


}

export default MapView