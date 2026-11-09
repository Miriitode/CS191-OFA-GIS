function ActivityDetails({ activity, onClose }) {
    return (
        <aside className={`activity-sidebar ${activity ? 'open' : ''}`}>
            {activity && (
                <>
                    <div className="activity-sidebar-header">
                        <h2>AFA Details</h2>

                        <button onClick={onClose} aria-label="Close activity details">
                            &times;
                        </button>
                    </div>

                    <div className="activity-details">
                        <h3>{activity.name}</h3>

                        <h3>{activity.description}</h3>

                        <hr />

                        <p>
                            <strong>Location</strong>
                            <br />
                            {activity.location}
                        </p>

                        <p>
                        <strong>Start Date</strong>
                        <br />
                        {activity.start_date}
                        </p>

                        <p>
                        <strong>End Date</strong>
                        <br />
                        {activity.end_date}
                        </p>

                        <p>
                        <strong>Coordinates</strong>
                        <br />
                        {activity.latitude}, {activity.longitude}
                        </p>

                        <p>
                        <strong>Activity ID</strong>
                        <br />
                        {activity.id}
                        </p>
                    </div>
                </>
            )}
        </aside>
    )
}

export default ActivityDetails