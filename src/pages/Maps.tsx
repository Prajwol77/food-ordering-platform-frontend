import { useState, useEffect, useRef } from "react";
import mapboxgl, { Map, Marker, GeolocateControl } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_SECRET_KEY;

interface Location {
  lat: number;
  lng: number;
}

const Maps = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<Map | null>(null);
  const markerRef = useRef<Marker | null>(null);
  const [restaurantLocation, setRestaurantLocation] = useState<Location>();
  const [query, setQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Location>();
  const [isLoading, setIsLoading] = useState(false)

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

          const geolocateControl = new GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true,
            },
            trackUserLocation: true,
            showUserHeading: true,
          });

          geolocateControl.on("geolocate", (e: any) => {
            const userLocation = {
              lat: e?.coords.latitude,
              lng: e?.coords.longitude,
            };

            setSearchResults(userLocation);
            if (map) {
              map.flyTo({
                center: [userLocation.lng, userLocation.lat],
                zoom: 14,
              });

              if (markerRef.current) {
                markerRef.current.setLngLat([
                  userLocation.lng,
                  userLocation.lat,
                ]);
              } else {
                const userMarker = new mapboxgl.Marker()
                  .setLngLat([userLocation.lng, userLocation.lat])
                  .addTo(map);
                markerRef.current = userMarker;
              }
            }
          });

          mapInstance.addControl(geolocateControl);
        });

        mapInstance.on("click", (event) => {
          const { lng, lat } = event.lngLat;
          setSearchResults({ lat, lng });
          setIsLoading(true)
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
      if (data.features.length > 0) {
        const { geometry } = data.features[0];
        const coordinates: Location = {
          lat: geometry.coordinates[1],
          lng: geometry.coordinates[0],
        };
        setSearchResults(coordinates);
        setIsLoading(true);
        if (map) {
          map.flyTo({ center: [coordinates.lng, coordinates.lat], zoom: 14 });
        }
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleCalculateDistance = async () => {
    if (restaurantLocation && searchResults) {
      const response = await fetch(
        `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${restaurantLocation.lat},${restaurantLocation.lng}&destinations=${searchResults.lat},${searchResults.lng}&key=kK6IKRqx4r8zhNjeR4UbNUblXM99JQXbj9B5mwui8uBYzUOFSI5RSsKockR9G2cw`
      );
      const data = await response.json();
      const distance = data.rows[0].elements[0].distance.text.split(' ')[0];
      console.log('distance', distance);
      debugger
      const duration = data.rows[0].elements[0].duration.text.split(' ')[0];
      const estimatedDeliveryTime = parseInt(duration) + 20;
      sessionStorage.setItem('estimatedDeliveryTime', estimatedDeliveryTime.toString());
      const deliveryPrice = (Math.ceil(distance / 5) * 50).toString();
      sessionStorage.setItem('deliveryPrice', deliveryPrice);
      window.history.back();
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
      <Button
        disabled={!isLoading}
        className="bg-orange-500 text-white"
        onClick={handleCalculateDistance}
      >
        Select Location
      </Button>
    </>
  );
};

export default Maps;
