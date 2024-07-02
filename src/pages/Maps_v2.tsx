import { useState, useEffect, useRef } from "react";
import mapboxgl, { Map, Marker } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useParams } from "react-router-dom";
import * as turf from "@turf/turf";
import { Units } from "@turf/turf";

mapboxgl.accessToken =
  "pk.eyJ1IjoibGFha2hlZXkiLCJhIjoiY2x4eGh6MW81MnNxdDJscXJveTc1ejZuZiJ9.KPle7lUMN4_CsE5PCAxq-Q";

interface Location {
  lat: number;
  lng: number;
}

const Maps_v2 = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [restaurantLocation, setRestaurantLocation] = useState<Location>();
  const [query, setQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Location>();
  const markerRef = useRef<Marker | null>(null);
  const [distance, setDistance] = useState<number>(0);
  const [price, setPrice] = useState(0);

  const { restaurant: restaurantPlaceName } = useParams<{
    restaurant: string;
  }>();

  useEffect(() => {
    const fetchRestaurantLocation = async () => {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${restaurantPlaceName}.json?access_token=${mapboxgl.accessToken}`
        );
        const data = await response.json();
        if (data.features.length > 0) {
          const { geometry } = data.features[0];
          const location = {
            lat: geometry.coordinates[1],
            lng: geometry.coordinates[0],
          };
          setRestaurantLocation(location);
        }
      } catch (error) {
        console.error("Error fetching restaurant location:", error);
      }
    };

    fetchRestaurantLocation();
  }, [restaurantPlaceName]);

  useEffect(() => {
    if (mapContainerRef.current && restaurantLocation) {
      const initializeMap = () => {
        const mapInstance = new mapboxgl.Map({
          container: mapContainerRef.current!,
          style: "mapbox://styles/mapbox/streets-v11",
          center: [restaurantLocation.lng, restaurantLocation.lat],
          zoom: 11,
        });

        mapInstance.on("load", () => {
          setMap(mapInstance);
          const restaurantMarker = new mapboxgl.Marker({ color: "red" })
            .setLngLat([restaurantLocation.lng, restaurantLocation.lat])
            .addTo(mapInstance);

          markerRef.current = restaurantMarker;
        });

        mapInstance.on("click", (event) => {
          const { lng, lat } = event.lngLat;
          setSearchResults({ lat, lng });
          if (markerRef.current) {
            markerRef.current.setLngLat([lng, lat]);
          } else {
            const newMarker = new mapboxgl.Marker()
              .setLngLat([lng, lat])
              .addTo(mapInstance);
            markerRef.current = newMarker;
          }
        });
      };

      initializeMap();
    }
  }, [restaurantLocation]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();
      const result = data.features[0].geometry;
      const cordinates: Location = {
        lat: result.coordinates[1],
        lng: result.coordinates[0],
      };
      setSearchResults(cordinates);
      if (data.features.length > 0 && map) {
        map.flyTo({ center: [cordinates.lng, cordinates.lat], zoom: 14 });
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleCalculateDistance = () => {
    if (restaurantLocation && searchResults) {
      const from = turf.point([restaurantLocation.lng, restaurantLocation.lat]);
      const to = turf.point([searchResults.lng, searchResults.lat]);
      const options: { units: Units } = { units: "kilometers" };
      let distance = turf.distance(from, to, options);
      distance = parseFloat(distance.toFixed(2));
      setDistance(distance);

      const basePrice = 100;
      const additionalPrice = 50;
      const price = basePrice + Math.floor(distance / 5) * additionalPrice;
      setPrice(price);
    }
  };

  return (
    <>
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for address"
          className="border p-2 text-black focus:outline-none rounded"
        />
        <button
          onClick={handleSearch}
          className="border p-2 bg-orange-500 text-white focus:outline-none rounded"
        >
          Search
        </button>
      </div>
      <div ref={mapContainerRef} style={{ height: "400px", width: "800px" }} />
      <button onClick={handleCalculateDistance}>
        Calculate Delivery Charge
      </button>
      <div className="">
        <p>{`Distance: ${distance}`}</p>
        <p>{`Price: ${price}`}</p>
      </div>

      <div>
        {searchResults &&
          `Lat: ${searchResults?.lat}, Lng: ${searchResults?.lng}`}
      </div>
    </>
  );
};

export default Maps_v2;
