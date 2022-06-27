import { useRef, useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../config/firebase_next";
import mapboxgl from "!mapbox-gl";
mapboxgl.accessToken =
  "pk.eyJ1IjoidGhhbnNrZSIsImEiOiJjbDNibzRwZngwMGlxM2lvd240cXJzeHllIn0.Edv7wcY0uoDxQ88zUwSt3Q";

const Mapbox = props => {
  //*State an ref to control map
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(4.5261);
  const [lat, setLat] = useState(50.4979);
  const [zoom, setZoom] = useState(7);
  //*Events state
  const [events, setEvents] = useState([]);

  //*loading map
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [lng, lat],
      zoom: zoom,
    });
  });
  //*Adding markers to map
  const addMarkers = () => {
    events.map(({ long, lat }) => {
      new mapboxgl.Marker().setLngLat([long, lat]).addTo(map.current);
    });
  };
  addMarkers();
  //*Display control long/lat
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  //*Get long&lat from firestore
  useEffect(() => {
    const colRef = collection(db, "events");
    const q = query(colRef);
    const unsubscribe = onSnapshot(q, querySnapshot => {
      setEvents(
        querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
    return unsubscribe;
  }, []);

  return (
    <Box {...props}>
      <Box
        backgroundColor="rgba(81, 108, 150, 0.9)"
        color="rgba(86, 186, 227)"
        px={2}
        py={1}
        zIndex={1}
        position="absolute"
        m={2}
        borderRadius={4}
      >
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </Box>
      <Box ref={mapContainer} h={733} borderRadius="10px"></Box>
    </Box>
  );
};

export default Mapbox;
