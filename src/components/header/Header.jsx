function Header({ activityCount, loading, error }) {
    return (
        <header className="app-header">
            <h1>OFA-GIS</h1>
            <p>
                {loading
                ? 'Loading activities...'
                : error
                    ? error
                    : `${activityCount} activities loaded`}
            </p>
        </header>
    )
}

export default Header