import { useState, useCallback, useEffect } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

type LocationType = {
    lat: number,
    lng: number
}

function MapDistance() {
  const [response, setResponse] = useState(null);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [currentLocation, setCurrentLocation] = useState<LocationType>();
  const [distance, setDistance] = useState('');

  const directionsCallback = useCallback((result: any, status: any) => {
    if (status === 'OK') {
      setResponse(result);
      const distanceText = result.routes[0].legs[0].distance.text;
      setDistance(distanceText);
    } else {
      console.error(`Error fetching directions ${result}`);
    }
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          setOrigin(`${latitude},${longitude}`);
        },
        (error) => {
          console.error("Error getting current location", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleSubmit = () => {
    if (currentLocation && destination !== '') {
      setResponse(null);
    }
  };

  const parseDestination = (input: any) => {
    const latLngPattern = /^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/;
    if (latLngPattern.test(input)) {
      const [lat, lng] = input.split(',').map(Number);
      return { lat, lng };
    }
    return input;
  };

  return (
    <div>
      <input
        type="text"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        placeholder="Enter destination"
      />
      <button onClick={handleSubmit}>Calculate Distance</button>

      {distance && (
        <div>
          <h3>Distance: {distance}</h3>
        </div>
      )}

      <LoadScript googleMapsApiKey="AIzaSyDEEL_hdQAawMkUQm2s_p_r79JDtLce0jE">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentLocation || center}
          zoom={10}
        >
          {currentLocation && destination !== '' && (
            <DirectionsService
              options={{
                destination: parseDestination(destination),
                origin: origin,
                travelMode: google.maps.TravelMode.DRIVING
              }}
              callback={directionsCallback}
            />
          )}

          {response !== null && (
            <DirectionsRenderer
              options={{
                directions: response
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default MapDistance;
