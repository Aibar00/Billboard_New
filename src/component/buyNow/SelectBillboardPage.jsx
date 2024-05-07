import React, { useEffect, useState } from 'react';
import { GoogleMap, InfoWindow, LoadScriptNext, Marker } from '@react-google-maps/api';
import styles from './styles/buyNowPage.module.css';
import customMarkerImageAvailable from '../../assets/businessAvailableR.png';
import customMarkerImageInUse from '../../assets/businessInUseR.png';
import customMarkerImageBanned from '../../assets/businessBannedR.png';
import { Link } from 'react-router-dom';

const containerStyle = {
  width: '800px',
  height: '400px'
};

const center = {
  lat: 43.239095,
  lng: 76.878642
};

const mapStyles = [
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [{visibility:"off"}]
    },
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#263c3f"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#6b9a76"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#38414e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#212a37"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9ca5b3"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#1f2835"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#f3d19c"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2f3948"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#515c6d"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    }
];

// const API_KEY = process.env.REACT_APP_API_KEY;

const markers = [
    {key: 1, location: "Akkent", lat: 43.240023, lng: 76.813539},
    {key: 2, location: "Tole-bi Utegen-Batyr", lat: 43.244813, lng: 76.852554},
    {key: 3, location: "Momyshuly Shalyapina", lat: 43.209403, lng: 76.842526},
    {key: 4, location: "Zhandosova Altynsarin", lat: 43.217185, lng: 76.875727},
    {key: 5, location: "Tole-bi Nazarbayev", lat: 43.254958, lng: 76.946580},
];

function SelectBillboardPage() {
    
    const [mapLoaded, setMapLoaded] = useState(false);   
    const [showMarker, setShowMarker] = useState(false);
    const [billboards, setBillboards] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/api/v1/billboards/all_billboard", {
            method:'GET',
            headers:{"Content-Type":"application/json"},
        })
        .then(response => response.json())
        .then(data => setBillboards(data))
        .catch(error => console.error('Error fetching billboards', error));
    }, []);

    useEffect(() => {

        const timer = setTimeout(() => {
            setShowMarker(true);
        }, 500);

        return () => clearTimeout(timer);
    }, []);
    
    useEffect(() => {
        return () => {
            setMapLoaded(false);
        };
    }, []);

    const renderMarker = (marker) => {
        const iconAvailable = {
            url: customMarkerImageAvailable,
            scaledSize: new window.google.maps.Size(50, 50)
        };
        const iconInUse = {
            url: customMarkerImageInUse,
            scaledSize: new window.google.maps.Size(50, 50)
        };
        const iconBanned = {
            url: customMarkerImageBanned,
            scaledSize: new window.google.maps.Size(50, 50)
        };

        switch (marker.status) {
            case "Available":
                return (
                    <Marker
                        key={marker.id}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        icon={iconAvailable}
                        onClick={() => {alert(`This billboard is available`); setSelectedMarker(marker)}}
                    />
                );
            case "In use":
                return (
                    <Marker
                        key={marker.id}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        icon={iconInUse}
                        onClick={() => {alert(`This billboard is being used`); setSelectedMarker(marker)}}
                    />
                );
            case "Banned":
                return (
                    <Marker
                        key={marker.id}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        icon={iconBanned}
                        onClick={() => {alert(`This billboard is banned`); setSelectedMarker(marker)}}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <LoadScriptNext googleMapsApiKey="AIzaSyBiBkosez2A599m81c58e5OtXa6Kmrz8iw" >
            <main className={styles.container}>
                <div className={styles.mainContent}>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={12}
                        onLoad={() => {setMapLoaded(true)}}
                        options={{styles:mapStyles}}
                    >
                        {showMarker && mapLoaded && billboards.map(renderMarker)}
                    </GoogleMap>
                    <div className={styles.billboardList}>
                        <ul className={styles.billboardULList}>
                            {billboards.map(billboard => (
                                <li key={billboard.id}>
                                    <div className={styles.listItem}>
                                        <div className={styles.items}>
                                            <h2 className={styles.itemTitle}>{billboard.location}</h2>
                                            <div className={styles.itemStatus}>{billboard.status}</div>
                                        </div>
                                        <div>
                                            {billboard.status === "Banned" && (
                                                <span className={styles.unusableText}>Banned</span>
                                            )}
                                            {billboard.status === "In use" && (
                                                <span className={styles.unusableText}>In use</span>
                                            )} 
                                            {billboard.status === "Available" && (
                                                <Link to={{pathname:"/buynow/packages", state:{selectedBillboard : billboard}}}>
                                                    <button className={styles.mainBtn}>BUY NOW</button>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* <div className={styles.sidebar + (selectedMarker ? ` ${styles.open}` : '')}>
                        <div className={styles.sidebarContent}>
                            {selectedMarker ? (
                                <>
                                    <h1>{selectedMarker.name}</h1>
                                    <p>Details about the selected marker...</p>
                                    <button onClick={() => setSelectedMarker(null)}>Close</button>
                                </>
                            ) : (
                                <p>Select a marker to see details.</p>
                            )}
                        </div>
                    </div> */}
                </div>
            </main>
        </LoadScriptNext>
    )
}

export default SelectBillboardPage;
