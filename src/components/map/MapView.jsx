import { MapContainer, TileLayer } from 'react-leaflet'
import ActivityMarkers from './Markers'

function MapView({ activities, onSelectActivity }) {
    return (
        <div className="map-container">
          <MapContainer
            center={[14.654967, 121.065785]}
            zoom={17}
            scrollWheelZoom={true}
            className="map"
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <ActivityMarkers
              activities={activities}
              onSelectActivity={onSelectActivity}
            />
          </MapContainer>   
        </div>
    )
}

export default MapView