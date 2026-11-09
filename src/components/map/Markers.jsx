import { Marker, Popup } from 'react-leaflet'

function ActivityMarkers({ activities, onSelectActivity }){
    return (
        <>
            {activities.map((activity) => (
                <Marker
                    key={activity.id}
                    position={[activity.latitude, activity.longitude]}
                    eventHandlers={{
                        click: () => {
                            onSelectActivity(activity)
                        },
                        mouseover: (event) => {
                            event.target.openPopup()
                        },
                        mouseout: (event) => {
                            event.target.closePopup()
                        }
                    }}
                >
                    <Popup>
                        <div>
                            <h3>{activity.name}</h3>

                            <p>{activity.description}</p>

                            <p><strong>Location:</strong> {activity.location}</p>

                            <p>
                                <strong>Date:</strong> {activity.start_date} {activity.end_date !== activity.start_date && ` to ${activity.end_date}`}
                            </p>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </>
    )
}

export default ActivityMarkers