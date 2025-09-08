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

var greenIcon = new L.Icon({
    iconUrl: "assets/map_icons/marker-icon-green.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

var redIcon = new L.Icon({
    iconUrl: "assets/map_icons/marker-icon-red.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

// Leaflet handles bounds automatically, but you can use fitBounds if needed.

const Body = () => {
    const where = useStore((state) => state.where);
    const selected = useStore((state) => state.selected);
    const special = useStore((state) => state.special);
    let loaded = true;
    const [tilesLoading, setTilesLoading] = useState(true);

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

    if (selected.filter((sel) => sel.Type === "district").length === 0) {
        return (
            <ErrorContainer>
                Please select a district to view map
            </ErrorContainer>
        );
    }

    if (!loaded) {
        return null;
    }

    const selectedNames = selected.map((s) => s.Name);
    const locations = where
        ?.filter((loc) => special || loc.type !== "special")
        .filter((loc) => loc.District && selectedNames.includes(loc.District));

    if (locations.length === 0) {
        return (
            <ErrorContainer>
                We haven't filled out the map data for your area
            </ErrorContainer>
        );
    }

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
            <MapWrapper>
                {tilesLoading && (
                    <LoaderOverlay>
                        <Spinner />
                        <span>Loading map…</span>
                    </LoaderOverlay>
                )}
                <MapContainer
                    zoom={defaultLoc.zoom}
                    style={{ width: "100%", height: "70vh" }}
                    scrollWheelZoom={false}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        eventHandlers={{
                            loading: () => setTilesLoading(true),
                            tileload: () => setTilesLoading(false),
                        }}
                    />
                    <MapBounds markers={info} />
                    {info.map(({ lat, lng, name, link, type, _key }) => (
                        <Marker
                            icon={type === "special" ? greenIcon : redIcon}
                            key={_key}
                            position={[lat, lng]}
                        >
                            <Popup>
                                <div>
                                    <strong>{name}</strong>
                                    {link && (
                                        <div>
                                            <a
                                                href={link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                View on Google Maps
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </MapWrapper>

            {special && (
                <KeyContainer>
                    <MarkerContainer>
                        <LegendIcon
                            src="assets/map_icons/marker-icon-red.png"
                            alt="Drop off marker"
                        />
                        <span>Drop Off Location</span>
                    </MarkerContainer>
                    <MarkerContainer>
                        <LegendIcon
                            src="assets/map_icons/marker-icon-green.png"
                            alt="Special vote marker"
                        />
                        <span>Special Vote Pickup</span>
                    </MarkerContainer>
                </KeyContainer>
            )}
        </>
    );
};

const Render = () => {
    return (
        <Section
            title="WHERE?"
            id="where"
            subtitle="All the locations in your area where you pick up a special voting pack"
        >
            <Body />
        </Section>
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

const LegendIcon = styled.img`
    width: 18px;
    height: 30px;
    object-fit: contain;
    margin-right: 6px;
    image-rendering: -webkit-optimize-contrast;
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

// Map wrapper & loader styles
const MapWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 70vh;
    margin-top: 30px;
`;

const LoaderOverlay = styled.div`
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.2);
    // background: rgba(255, 255, 255, 0.8);
    z-index: 500;
    font-size: 14px;
    color: #333;
    gap: 10px;
`;

const Spinner = styled.div`
    width: 40px;
    height: 40px;
    border: 4px solid #e0e0e0;
    border-top-color: #e24f33;
    border-radius: 50%;
    animation: spin 0.9s linear infinite;

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`;
