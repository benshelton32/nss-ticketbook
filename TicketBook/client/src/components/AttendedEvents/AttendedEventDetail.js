import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAttendedEventById } from "../../modules/attendedEventsManager"
import "./AttendedEventDetail.css";

export const AttendedEventDetail = () => {
    const [attendedEvent, setAttendedEvent] = useState({})
    const { attendedEventId } = useParams()
    const navigate = useNavigate()

    const getAttendedEvent = (eventId) => {
        getAttendedEventById(eventId).then(event => {
            setAttendedEvent(event)
        })
    }

    useEffect(() => {
        getAttendedEvent(attendedEventId)
    }, [])

    return (
        <article className="articleContainer">
            <header className="headerAndButtonsContainer">
                <h1>Game Details</h1>
                <div className="buttonsDetailsContainer">
                    <div className="detailsEditButton">
                        <button onClick={() => { navigate(`/myEvents/edit/${attendedEventId}`) }}>Edit</button>
                        {/* <Button onClick={() => navigate(`/myEvents/${attendedEvent.id}`)}>Details</Button> */}
                    </div>
                    <div className="detailsDeleteButton">
                        <button>Delete</button>
                    </div>
                </div>
            </header>
            <section className="gameDetailsContainer">
                <aside className="stadiumAndTicketInfoContainer">
                    <div className="stadiumAndDateContainer">
                        <div className="date"> Date: {new Date(attendedEvent.date).toLocaleDateString()}</div>
                        <div className="stadiumName"> Stadium: {attendedEvent.stadium?.name}</div>
                        <div className="stadiumLocation">Location: {attendedEvent.stadium?.location}</div>
                    </div>
                    <div className="ticketInfoContainer">
                        <div>Section: {attendedEvent.section}</div>
                        <div>Row: {attendedEvent.row}</div>
                        <div>Seat: {attendedEvent.seat}</div>
                    </div>
                </aside>
                <div className="gameInfoAndNotesContainer">
                    <div className="gameInfoContainer">
                        <div className="detailsTeamContainer">
                            <div className="detailsTeamNameAndLogoContainer">
                                <div className="detailsTeamLogoContainer"><img className="detailsTeamLogo" src={attendedEvent.homeTeam?.logo} /></div>
                                <div className="deatilsTeamName">{attendedEvent.homeTeam?.name}</div>
                            </div>
                            <div className="detailsTeamScore">{attendedEvent.homeTeamScore}</div>
                        </div>
                        <div className="finalContainer">
                            <div className="final">Final</div>
                        </div>
                        <div className="detailsTeamContainer">
                            <div className="detailsTeamScore">{attendedEvent.awayTeamScore}</div>
                            <div className="detailsTeamNameAndLogoContainer">
                                <div className="detailsTeamLogoContainer"><img className="detailsTeamLogo" src={attendedEvent.awayTeam?.logo} /></div>
                                <div className="deatilsTeamName">{attendedEvent.awayTeam?.name}</div>
                            </div>
                        </div>
                    </div>
                    <div className="notesContainer">
                        <div><h3>Notes</h3></div>
                        <div>{attendedEvent.notes}</div>
                    </div>
                </div>
            </section>
        </article>
    )
}