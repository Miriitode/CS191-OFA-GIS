import { Marker, Popup, useMap } from 'react-leaflet'

function ActivityMarker({ activity, onSelectActivity }) {
    const map = useMap()

    const position = [
        activity.latitude,
        activity.longitude
    ]

    function handleClick() {
        map.flyTo(position, 18, {duration: 0.8})

        onSelectActivity(activity)
    }

    return (
        <Marker
            key={activity.id}
            position={[activity.latitude, activity.longitude]}
            eventHandlers={{
                click: handleClick,
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
    )
}
function ActivityMarkers({ activities, onSelectActivity }){
    return (
        <>
            {activities.map((activity) => (
                <ActivityMarker
                    key={activity.id}
                    activity={activity}
                    onSelectActivity={onSelectActivity}
                />
            ))}
        </>
    )
}

export default ActivityMarkers