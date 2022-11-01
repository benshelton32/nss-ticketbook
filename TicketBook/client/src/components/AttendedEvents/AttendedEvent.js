import { Navigate } from "react-router-dom"
import { Button, Card, CardBody, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { deleteAttendedEvent, getAttendedEventById } from "../../modules/attendedEventsManager"

export const AttendedEvent = ({ attendedEvent, getAttendedEvents }) => {

    const navigate = useNavigate()

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const toggleDeleteModal = () => {
        setShowDeleteModal(!showDeleteModal)
    }

    return (
        <>
            <section className="eventContainer">
                <header className="dateAndLocationContainer">
                    <div className="eventDate">{new Date(attendedEvent.date).toLocaleDateString()}</div>
                    <div className="stadiumName">{attendedEvent.stadium.name}</div>
                    <div className="stadiumLocation">{attendedEvent.stadium.location}</div>
                </header>

                <section className="teamAndScoreContainer">
                    {attendedEvent.homeTeamScore > attendedEvent.awayTeamScore &&
                        <>
                            <div className="teamContainer">
                                <div className="teamLabel">HOME</div>
                                <div className="teamLogoContainer"><img className="teamLogo" src={attendedEvent.homeTeam.logo} alt={`${attendedEvent.homeTeam.name} logo`} /></div>
                                {/* <div className="teamAbbreviation">{attendedEvent.homeTeam.abbreviation}</div> */}
                                <div className="winningTeamScore">{attendedEvent.homeTeamScore}</div>
                                <div className="winningTeamAbbreviation">{attendedEvent.homeTeam.abbreviation}</div>
                            </div>
                            <div className="finalAndOvertimeContainer">
                                <div className="homeWinFinal"><img className="finalArrow" src={'/Logos/Arrows/HomeWinArrow.png'} alt={'left-facing arrow'} />Final</div>
                            </div>
                            <div className="teamContainer">
                                <div className="teamLabel">AWAY</div>
                                {/* <div>{attendedEvent.awayTeam.abbreviation}</div> */}
                                <div className="teamLogoContainer"><img className="teamLogo" src={attendedEvent.awayTeam.logo} alt={`${attendedEvent.awayTeam.name} logo`} /></div>
                                <div className="teamScore">{attendedEvent.awayTeamScore}</div>
                                <div className="teamAbbreviation">{attendedEvent.awayTeam.abbreviation}</div>
                            </div>
                        </>}
                    {attendedEvent.homeTeamScore < attendedEvent.awayTeamScore &&
                        <>
                            <div className="teamContainer">
                                <div className="teamLabel">HOME</div>
                                <div className="teamLogoContainer"><img className="teamLogo" src={attendedEvent.homeTeam.logo} alt={`${attendedEvent.homeTeam.name} logo`} /></div>
                                {/* <div className="teamAbbreviation">{attendedEvent.homeTeam.abbreviation}</div> */}
                                <div className="teamScore">{attendedEvent.homeTeamScore}</div>
                                <div className="teamAbbreviation">{attendedEvent.homeTeam.abbreviation}</div>
                            </div>
                            <div className="finalAndOvertimeContainer">
                                <div className="awayWinFinal">Final<img className="finalArrow" src={'/Logos/Arrows/AwayWinArrow.png'} alt={'right-facing arrow'} /></div>
                            </div>
                            <div className="teamContainer">
                                <div className="teamLabel">AWAY</div>
                                {/* <div>{attendedEvent.awayTeam.abbreviation}</div> */}
                                <div className="teamLogoContainer"><img className="teamLogo" src={attendedEvent.awayTeam.logo} alt={`${attendedEvent.awayTeam.name} logo`} /></div>
                                <div className="winningTeamScore">{attendedEvent.awayTeamScore}</div>
                                <div className="winningTeamAbbreviation">{attendedEvent.awayTeam.abbreviation}</div>
                            </div>
                        </>}
                    {attendedEvent.homeTeamScore === attendedEvent.awayTeamScore &&
                        <>
                            <div className="teamContainer">
                                <div className="teamLabel">HOME</div>
                                <div className="teamLogoContainer"><img className="teamLogo" src={attendedEvent.homeTeam.logo} alt={`${attendedEvent.homeTeam.name} logo`} /></div>
                                {/* <div className="teamAbbreviation">{attendedEvent.homeTeam.abbreviation}</div> */}
                                <div className="teamScore">{attendedEvent.homeTeamScore}</div>
                                <div className="teamAbbreviation">{attendedEvent.homeTeam.abbreviation}</div>
                            </div>
                            <div className="finalAndOvertimeContainer">
                                <div className="tieFinal">Final</div>
                            </div>
                            <div className="teamContainer">
                                <div className="teamLabel">AWAY</div>
                                {/* <div>{attendedEvent.awayTeam.abbreviation}</div> */}
                                <div className="teamLogoContainer"><img className="teamLogo" src={attendedEvent.awayTeam.logo} alt={`${attendedEvent.awayTeam.name} logo`} /></div>
                                <div className="teamScore">{attendedEvent.awayTeamScore}</div>
                                <div className="teamAbbreviation">{attendedEvent.awayTeam.abbreviation}</div>
                            </div>
                        </>}
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
                        <button className="btn btn-outline-dark" id="eventListDetailsButton" onClick={() => { navigate(`/myEvents/${attendedEvent.id}`) }}>Details</button>
                        {/* <Button onClick={() => navigate(`/myEvents/${attendedEvent.id}`)}>Details</Button> */}
                    </div>
                    <div className="deleteButton">
                        <button className="btn btn-outline-dark" id="eventListDeleteButton" onClick={() => { toggleDeleteModal() }}>Delete</button>
                    </div>
                </footer>
            </section>

            <Modal className="deleteModal" isOpen={showDeleteModal} toggle={() => setShowDeleteModal(!showDeleteModal)}>
                <ModalHeader toggle={toggleDeleteModal} charcode="X">Delete Event</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete this {attendedEvent.homeTeam?.name} vs. {attendedEvent.awayTeam?.name} game?
                    This action cannot be undone.
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" id="eventModalDeleteButton" onClick={() => {
                        deleteAttendedEvent(attendedEvent.id).then(() => { toggleDeleteModal(); }).then(getAttendedEvents())
                    }}>Delete</button>{' '}
                    <button className="btn btn-secondary" onClick={toggleDeleteModal}>Cancel</button>
                </ModalFooter>
            </Modal>
        </>
    )
}