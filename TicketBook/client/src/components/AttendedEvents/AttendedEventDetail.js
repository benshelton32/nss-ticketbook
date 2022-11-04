import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { deleteAttendedEvent, getAttendedEventById } from "../../modules/attendedEventsManager"
import "./AttendedEventDetail.css";

export const AttendedEventDetail = () => {
    const [attendedEvent, setAttendedEvent] = useState({})
    const { attendedEventId } = useParams()
    const navigate = useNavigate()

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const toggleDeleteModal = () => {
        setShowDeleteModal(!showDeleteModal)
    }

    const getAttendedEvent = (eventId) => {
        getAttendedEventById(eventId).then(event => {
            setAttendedEvent(event)
        })
    }

    useEffect(() => {
        getAttendedEvent(attendedEventId)
    }, [])

    return (
        <>
            <article className="articleContainer">
                <div className="detailViewContainer">
                    <header className="headerAndButtonsContainer">
                        <h1>Game Details</h1>
                        <div className="buttonsDetailsContainer">
                            <div className="detailsEditButton">
                                <button className="btn btn-outline-dark" id="detailsEditButton" onClick={() => { navigate(`/myEvents/edit/${attendedEventId}`) }}>Edit</button>
                            </div>
                            <div className="detailsDeleteButton">
                                <button onClick={() => { toggleDeleteModal() }}
                                    className="btn btn-danger" id="detailsDeleteButton">Delete</button>
                            </div>
                        </div>
                    </header>
                    <section className="gameDetailsContainer">
                        <aside className="stadiumAndTicketInfoContainer">
                            <div className="stadiumAndDateContainer">
                                <div><h5>Date and Location</h5></div>
                                <div className="date"> Date: {new Date(attendedEvent.date).toLocaleDateString()}</div>
                                <div className="stadiumName"> Stadium: {attendedEvent.stadium?.name}</div>
                                <div className="stadiumLocation">Location: {attendedEvent.stadium?.location}</div>
                            </div>
                            <div className="ticketInfoContainer">
                                <div><h5>Seat Information</h5></div>
                                <div>Section: {attendedEvent.section}</div>
                                <div>Row: {attendedEvent.row}</div>
                                <div>Seat: {attendedEvent.seat}</div>
                            </div>
                        </aside>
                        <div className="gameInfoAndNotesContainer">
                            <div className="gameInfoContainer">
                                {attendedEvent.homeTeamScore > attendedEvent.awayTeamScore &&
                                    <>
                                        <div className="detailsTeamContainer">
                                            <div className="detailsTeamNameAndLogoContainer">
                                                <div className="detailsHomeOrAwayContainer">
                                                    <div className="detailsHomeOrAwayLabel">HOME</div>
                                                </div>
                                                <div className="detailsTeamLogoContainer"><img className="detailsTeamLogo" src={attendedEvent.homeTeam?.logo} alt={`${attendedEvent.homeTeam?.name} logo`} /></div>
                                                <div className="deatilsWinningTeamName">{attendedEvent.homeTeam?.name}</div>
                                            </div>
                                            <div className="detailsWinningTeamScore">{attendedEvent.homeTeamScore}</div>
                                        </div>
                                        <div className="finalContainer">
                                            <div className="final"><img className="deatilsFinalArrow" src={'/Logos/Arrows/HomeWinArrow.png'} alt={'left-facing arrow'} />Final</div>
                                        </div>
                                        <div className="detailsTeamContainer">
                                            <div className="detailsTeamScore">{attendedEvent.awayTeamScore}</div>
                                            <div className="detailsTeamNameAndLogoContainer">
                                                <div className="detailsHomeOrAwayContainer">
                                                    <div className="detailsHomeOrAwayLabel">AWAY</div>
                                                </div>
                                                <div className="detailsTeamLogoContainer"><img className="detailsTeamLogo" src={attendedEvent.awayTeam?.logo} alt={`${attendedEvent.awayTeam?.name} logo`} /></div>
                                                <div className="deatilsTeamName">{attendedEvent.awayTeam?.name}</div>
                                            </div>
                                        </div>
                                    </>}
                                {attendedEvent.homeTeamScore < attendedEvent.awayTeamScore &&
                                    <>
                                        <div className="detailsTeamContainer">
                                            <div className="detailsTeamNameAndLogoContainer">
                                                <div className="detailsHomeOrAwayContainer">
                                                    <div className="detailsHomeOrAwayLabel">HOME</div>
                                                </div>
                                                <div className="detailsTeamLogoContainer"><img className="detailsTeamLogo" src={attendedEvent.homeTeam?.logo} alt={`${attendedEvent.homeTeam?.name} logo`} /></div>
                                                <div className="deatilsTeamName">{attendedEvent.homeTeam?.name}</div>
                                            </div>
                                            <div className="detailsTeamScore">{attendedEvent.homeTeamScore}</div>
                                        </div>
                                        <div className="finalContainer">
                                            <div className="final">Final<img className="deatilsFinalArrow" src={'/Logos/Arrows/AwayWinArrow.png'} alt={'right-facing arrow'} /></div>
                                        </div>
                                        <div className="detailsTeamContainer">
                                            <div className="detailsWinningTeamScore">{attendedEvent.awayTeamScore}</div>
                                            <div className="detailsTeamNameAndLogoContainer">
                                                <div className="detailsHomeOrAwayContainer">
                                                    <div className="detailsHomeOrAwayLabel">AWAY</div>
                                                </div>
                                                <div className="detailsTeamLogoContainer"><img className="detailsTeamLogo" src={attendedEvent.awayTeam?.logo} alt={`${attendedEvent.awayTeam?.name} logo`} /></div>
                                                <div className="deatilsWinningTeamName">{attendedEvent.awayTeam?.name}</div>
                                            </div>
                                        </div>
                                    </>}
                                {attendedEvent.homeTeamScore === attendedEvent.awayTeamScore &&
                                    <>
                                        <div className="detailsTeamContainer">
                                            <div className="detailsTeamNameAndLogoContainer">
                                                <div className="detailsHomeOrAwayContainer">
                                                    <div className="detailsHomeOrAwayLabel">HOME</div>
                                                </div>
                                                <div className="detailsTeamLogoContainer"><img className="detailsTeamLogo" src={attendedEvent.homeTeam?.logo} alt={`${attendedEvent.homeTeam?.name} logo`} /></div>
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
                                                <div className="detailsHomeOrAwayContainer">
                                                    <div className="detailsHomeOrAwayLabel">AWAY</div>
                                                </div>
                                                <div className="detailsTeamLogoContainer"><img className="detailsTeamLogo" src={attendedEvent.awayTeam?.logo} alt={`${attendedEvent.awayTeam?.name} logo`} /></div>
                                                <div className="deatilsTeamName">{attendedEvent.awayTeam?.name}</div>
                                            </div>
                                        </div>
                                    </>}
                            </div>
                            <div className="notesContainer">
                                <div><h3>Notes</h3></div>
                                <div>{attendedEvent.notes}</div>
                            </div>
                        </div>
                    </section>
                </div>
            </article>

            <Modal isOpen={showDeleteModal} toggle={() => setShowDeleteModal(!showDeleteModal)}>
                <ModalHeader toggle={toggleDeleteModal} charcode="X">Delete Event</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete this {attendedEvent.homeTeam?.name} vs. {attendedEvent.awayTeam?.name} game?
                    This action cannot be undone.
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" id="detailsModalDeleteButton" onClick={() => {
                        deleteAttendedEvent(attendedEventId).then(() => { toggleDeleteModal(); }).then(() => {navigate('/myEvents')})
                    }}>Delete</button>{' '}
                    <button className="btn btn-secondary" id="detailsModalCancelButton" onClick={toggleDeleteModal}>Cancel</button>
                </ModalFooter>
            </Modal>
        </>
    )
}