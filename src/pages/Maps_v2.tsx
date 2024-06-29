import { useState, useEffect, useRef } from 'react';
import mapboxgl, { Map, Marker } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // Ensure to include the CSS for mapbox
import { useParams } from 'react-router-dom';

mapboxgl.accessToken = 'pk.eyJ1IjoibGFha2hlZXkiLCJhIjoiY2x4eGh6MW81MnNxdDJscXJveTc1ejZuZiJ9.KPle7lUMN4_CsE5PCAxq-Q';

interface Location {
  lat: number;
  lng: number;
}

const Maps_v2 = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [marker, setMarker] = useState<Marker | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [restaurantLocation, setRestaurantLocation] = useState<Location | null>(null);
  const [query, setQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Location[]>([]);
  
  const { restaurant: restaurantPlaceName } = useParams<{ restaurant: string }>();

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
        console.error('Error fetching restaurant location:', error);
      }
    };

    fetchRestaurantLocation();
  }, [restaurantPlaceName]);

  useEffect(() => {
    if (mapContainerRef.current && restaurantLocation) {
      const initializeMap = () => {
        const mapInstance = new mapboxgl.Map({
          container: mapContainerRef.current!,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [restaurantLocation.lng, restaurantLocation.lat],
          zoom: 11,
        });

        mapInstance.on('load', () => {
          setMap(mapInstance);

          // Add restaurant marker
          const restaurantMarker = new mapboxgl.Marker({ color: 'red' })
            .setLngLat([restaurantLocation.lng, restaurantLocation.lat])
            .addTo(mapInstance);

          // Set initial marker state
          setMarker(restaurantMarker);
        });

        mapInstance.on('click', (event) => {
          const { lng, lat } = event.lngLat;
          setSelectedLocation({ lat, lng });

          // Update marker location or create new marker
          if (marker) {
            marker.setLngLat([lng, lat]);
          } else {
            const newMarker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(mapInstance);
            setMarker(newMarker);
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
      const results = data.features.map((feature: any) => ({
        lat: feature.geometry.coordinates[1],
        lng: feature.geometry.coordinates[0],
      }));
      setSearchResults(results);
      if (results.length > 0 && map) {
        map.flyTo({ center: [results[0].lng, results[0].lat], zoom: 14 });
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const calculateDeliveryCharge = async () => {
    if (selectedLocation) {
      try {
        const response = await fetch('/api/calculate-delivery-charge', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userLocation: selectedLocation }),
        });
        const data = await response.json();
        console.log('Delivery Charge:', data.deliveryCharge);
      } catch (error) {
        console.error('Error calculating delivery charge:', error);
      }
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for address"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div ref={mapContainerRef} style={{ height: '400px', width: '800px' }} />
      <button onClick={calculateDeliveryCharge}>Calculate Delivery Charge</button>
      {searchResults.length > 0 && (
        <ul>
          {searchResults.map((result, index) => (
            <li key={index} onClick={() => setSelectedLocation(result)}>
              {`Lat: ${result.lat}, Lng: ${result.lng}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Maps_v2;
