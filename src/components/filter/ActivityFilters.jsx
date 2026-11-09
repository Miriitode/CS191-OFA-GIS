import academicCalendar from '../../data/academicCalendar.json'

function ActivityFilters({
    selectedAcademicYear,
    selectedSemester,
    onAcademicYearChange,
    onSemesterChange,
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange,
    onClearFilters
}) {
    const selectedYear = academicCalendar.find(
        (year) => year.id === selectedAcademicYear
    )

    const semesters = selectedYear?.semesters ?? []

    return (
        <div className="activity-filters">
            <label>
                Academic Year
                <select
                    value={selectedAcademicYear}
                    onChange={(event) => onAcademicYearChange(event.target.value)}
                >
                    <option value="">All Academic Years</option>

                    {academicCalendar.map((year) => (
                        <option key={year.id} value={year.id}>
                            {year.label}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                Semester
                <select
                    value={selectedSemester}
                    onChange={(event) => onSemesterChange(event.target.value)}
                    disabled={!selectedAcademicYear}
                >
                    <option value="">All Semesters</option>

                    {semesters.map((semester) => (
                        <option key={semester.id} value={semester.id}>
                            {semester.label}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                From
                <input
                    type="date"
                    value={startDate}
                    onChange={(event) => onStartDateChange(event.target.value)}
                />
            </label>

            <label>
                To
                <input
                    type="date"
                    value={endDate}
                    onChange={(event) => onEndDateChange(event.target.value)}
                    min={startDate || undefined}
                />
            </label>

            <button
                type="button"
                onClick={onClearFilters}
                className="clear-filters-button"
            >
                Clear Filters
            </button>
        </div>
    )
}

export default ActivityFilters