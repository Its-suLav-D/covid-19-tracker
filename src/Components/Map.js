import React from 'react';
import "./Map.css"
import {Map as LeafLetMap, TileLayer} from "react-leaflet";
import {showDataOnMap} from '../utils';

function Map(props) {
    return (
        <div className="Map"> 
            <LeafLetMap center={props.center} zoom={props.zoom}>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">
                    OpenStreetMap</a> contributors'
                />
                {/* Loop Through Country and draw a bunch of circles on the screen */}
                {showDataOnMap(props.countries, props.casesType)}
            </LeafLetMap>
        </div>
    )
}

export default Map
