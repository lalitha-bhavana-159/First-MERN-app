import React, { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

const AboutUs = () => {
  const mapContainerRef = useRef(null);
  const [userLocations, setUserLocations] = useState([]);

  useEffect(() => {
    // Ensure map container is available
    if (!mapContainerRef.current) {
      console.error('Map container not found');
      return;
    }

    // Initialize Leaflet map
    const map = L.map(mapContainerRef.current, { attributionControl: false }).setView([48.505, -0.09], 3);

    // Add OpenStreetMap tile layer
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    let marker, circle, zoomed;

    const success = (pos) => {
      try {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const accuracy = pos.coords.accuracy;

        if (marker) {
          map.removeLayer(marker);
          map.removeLayer(circle);
        }

        marker = L.marker([lat, lng]).addTo(map);
        circle = L.circle([lat, lng], { radius: accuracy }).addTo(map);

        if (!zoomed) {
          zoomed = map.fitBounds(circle.getBounds());
        }

        map.setView([lat, lng]);

        // Send user location to the server
        sendLocationToServer(lat, lng, accuracy);
      } catch (error) {
        console.error('Error during Leaflet operations:', error);
      }
    };

    const error = (err) => {
      if (err.code === 1) {
        alert('Please allow geolocation access');
      } else {
        alert('Cannot get the current location');
      }
    };

    // Watch for geolocation changes
    const watchId = navigator.geolocation.watchPosition(success, error);

    // Fetch locations of logged-in users from the server
    const fetchUserLocations = async () => {
      try {
        const response = await axios.get('http://localhost:3500/user-api/get-locations');
        const locations = response.data;

        // Display markers for each logged-in user
        locations.forEach((location) => {
          const { latitude, longitude, accuracy, userId } = location;
          const userMarker = L.marker([latitude, longitude]).addTo(map);
          userMarker.bindPopup(`User ${userId}<br>Accuracy: ${accuracy} meters`);
        });

        // Save user locations in the component state for potential future use
        setUserLocations(locations);
      } catch (error) {
        console.error('Error fetching user locations:', error);
      }
    };

    // Call the fetchUserLocations function
    fetchUserLocations();

    // Cleanup on component unmount
    return () => {
      navigator.geolocation.clearWatch(watchId);

      if (map) {
        map.remove();
      }
    };

  }, []); // Add any dependencies as needed

  const sendLocationToServer = (latitude, longitude, accuracy) => {
    // Example HTTP request using axios
    axios.post('http://localhost:3500/user-api/send-location', {
      latitude,
      longitude,
      accuracy,
    })
    .then((response) => {
      console.log('Location sent to server:', response.data);
    })
    .catch((error) => {
      console.error('Error sending location to server:', error);
    });
  };

  return (
    <div>
      <p>About Us Component with Leaflet Map</p>
      <div ref={mapContainerRef} style={{ height: '500px' }}></div>
    </div>
  );
};

export default AboutUs;
