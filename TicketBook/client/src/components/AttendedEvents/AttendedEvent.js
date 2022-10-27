export const AttendedEvent = ({ attendedEvent }) => {



    return (
        <section className="eventContainer">
            <header className="dateAndLocationContainer">
                <div className="eventDate">{attendedEvent.date}</div>
                <div className="stadiumName">{attendedEvent.stadium.name}</div>
                <div className="stadiumLocation">{attendedEvent.stadium.location}</div>
            </header>

            <section className="teamAndScoreContainer">
                <div className="teamContainer">
                    <div className="teamLabel">HOME</div>
                    <div className="teamLogo"><img className="teamLogo" src={process.env.PUBLIC_URL + `${attendedEvent.homeTeam.logo}`} /></div>
                    {/* <div className="teamAbbreviation">{attendedEvent.homeTeam.abbreviation}</div> */}
                    <div className="teamScore">{attendedEvent.homeTeamScore}</div>
                    <div className="teamAbbreviation">{attendedEvent.homeTeam.abbreviation}</div>
                </div>
                <div className="finalAndOvertimeContainer">
                    <div className="final">Final</div>
                </div>
                <div className="teamContainer">
                    <div className="teamLabel">AWAY</div>
                    {/* <div>{attendedEvent.awayTeam.abbreviation}</div> */}
                    <div className="teamLogoContainer"><img className="teamLogo" src={process.env.PUBLIC_URL + `${attendedEvent.awayTeam.logo}`} /></div>
                    <div className="teamScore">{attendedEvent.awayTeamScore}</div>
                    <div className="teamAbbreviation">{attendedEvent.awayTeam.abbreviation}</div>
                </div>
            </section>

            <section className="seatLocationContainer">
                <div className="seatInfoContainer">
                    <div className="seatInfoLabel">Section</div>
                    <div className="seatInfoLocation">{attendedEvent.section}</div>
                </div>
                <div className="seatInfoContainer">
                    <div className="seatInfoLabel">Row</div>
                    <div className="seatInfoLocation">{attendedEvent.row}</div>
                </div>
                <div className="seatInfoContainer">
                    <div className="seatInfoLabel">Seat</div>
                    <div className="seatInfoLocation">{attendedEvent.seat}</div>
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