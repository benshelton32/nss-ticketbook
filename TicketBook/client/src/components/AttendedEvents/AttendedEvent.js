export const AttendedEvent = ({ attendedEvent }) => {
    return (
        <section className="eventContainer">
            <header className="dateAndLocationContainer">
                <div className="eventDate">{attendedEvent.date}</div>
                <div className="stadiumName">{attendedEvent.stadium.name}</div>
                <div className="stadiumLocation">{attendedEvent.stadium.location}</div>
            </header>

            <section className="teamAndScoreContainer">
                <div className="homeTeamContainer">
                    <div className="homeTeamLabel">HOME</div>
                    <div className="homeTeamLogo">{attendedEvent.homeTeam.logo}</div>
                    <div className="homeTeamScore">{attendedEvent.homeTeamScore}</div>
                </div>
                <div className="finalAndOvertimeContainer">
                    <div>Final</div>
                </div>
                <div className="awayTeamContainer">
                    <div className="awayTeamLabel">AWAY</div>
                    <div className="awayTeamLogo">{attendedEvent.awayTeam.logo}</div>
                    <div className="awayTeamScore">{attendedEvent.awayTeamScore}</div>
                </div>
            </section>

            <section className="seatLocationContainer">
                <div className="sectionContainer">
                    <div className="sectionLabel">Section</div>
                    <div className="sectionLocation">{attendedEvent.section}</div>
                </div>
                <div className="rowContainer">
                    <div className="rowLabel">Row</div>
                    <div className="rowLocation">{attendedEvent.row}</div>
                </div>
                <div className="seatContainer">
                    <div className="seatLabel">Seat</div>
                    <div className="seatLocation">{attendedEvent.seat}</div>
                </div>
            </section>
            <footer className="buttons">
                <div className="detailsButton">
                    <button>Details</button>
                </div>
                <div className="deleteButton">
                    <button>Delete</button>
                </div>
            </footer>
        </section>
    )
}