import "../App.css";
import RoomIcon from "@mui/icons-material/Room";
import styled from "@emotion/styled";
import { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import Section from "../components/Section";

import MapMarker from "../components/MapMarker";
import { useStore } from "../state";

const defaultLoc = {
  center: [-39.312328190014426, 171.87617060410338],
  zoom: 8,
};

// Leaflet handles bounds automatically, but you can use fitBounds if needed.

const Body = () => {
  const where = useStore((state) => state.where);
  const selected = useStore((state) => state.selected);
  const special = useStore((state) => state.special);
  let loaded = true;
  let test;

  // Fix Leaflet marker icon issue
  useEffect(() => {
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: markerIcon2x,
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
    });
  }, []);
  // ...existing code...
  console.log(selected);

  if (selected.length === 0) {
    return (
      <ErrorContainer>Please select a location to view map</ErrorContainer>
    );
  }

  if (!loaded) {
    return null;
  }

  if (test) {
    return (
      <ErrorContainer>
        We haven't filled out the map data for your area
      </ErrorContainer>
    );
  }

  const selectedNames = selected.map((s) => s.Name);
  const locations = where?.filter(
    (loc) => loc.District && selectedNames.includes(loc.District)
  );

  // Cleverness to extract lat/lng from link
  var locRegex = new RegExp("@(.*),(.*),");
  var nameRegex = new RegExp("/place/(.*)/@");

  const info = locations
    .map((x, idx) => {
      if (x.latlng === "") {
        var loc = x.link.match(locRegex);
        var lat = loc && loc[1];
        var lng = loc && loc[2];
      } else {
        var loc = x.latlng.split(",");
        var lat = loc && loc[0];
        var lng = loc && loc[1];
      }
      var name_match = x.link.match(nameRegex);
      var name = name_match && name_match[1];
      name = name?.split("+").join(" ");
      name = decodeURIComponent(name);
      let out = { lat, lng, name, ...x, _key: x.id || `${name}-${idx}` };
      return out;
    })
    .filter((a) => a.lat && a.lng)
    .sort((a, b) => (a.type === "special" ? 1 : -1));

  // Center map on first marker or default
  const mapCenter =
    info.length > 0 ? [info[0].lat, info[0].lng] : defaultLoc.center;

  // Component to fit bounds to markers
  const MapBounds = ({ markers }) => {
    const { useMap } = require("react-leaflet");
    const map = useMap();
    useEffect(() => {
      if (markers.length > 0) {
        const bounds = markers.map((m) => [m.lat, m.lng]);
        map.fitBounds(bounds, { padding: [40, 40] });
      }
    }, [markers, map]);
    return null;
  };

  return (
    <>
      <MapContainer
        // center={mapCenter}
        zoom={defaultLoc.zoom}
        style={{ width: "100%", height: "80vh" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapBounds markers={info} />
        {info.map(({ lat, lng, name, link, type, _key }) => (
          <Marker key={_key} position={[lat, lng]}>
            <Popup>
              <div>
                <strong>{name}</strong>
                {link && (
                  <div>
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      View on Google Maps
                    </a>
                  </div>
                )}
                {type && <div>Type: {type}</div>}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Only show the key if there are special locations */}
      {special && (
        <KeyContainer>
          <MarkerContainer>
            <RoomIcon style={{ color: "red" }} />
            <span>Drop Off Location</span>
          </MarkerContainer>
          <MarkerContainer>
            <RoomIcon style={{ color: "#556a41" }} />
            <span>Special Vote Pickup</span>
          </MarkerContainer>
        </KeyContainer>
      )}
    </>
  );
};

const Render = () => {
  return (
    <div id="Where">
      <Section
        title="WHERE?"
        subtitle="All the locations in your area where you can drop off your voting pack"
      >
        <Body />
      </Section>
    </div>
  );
};

export default Render;

const KeyContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 80%;
  margin-top: 10px;
  justify-content: center;
`;

const MarkerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 10px;

  & > span {
    font-size: 14px;
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10em;

  & > span {
    font-size: 14px;
  }
`;
