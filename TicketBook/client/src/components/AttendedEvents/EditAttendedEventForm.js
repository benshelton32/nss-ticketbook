import './AttendedEventForm.css'
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAttendedEventById, updateAttendedEvent } from "../../modules/attendedEventsManager"

export const EditAttendedEventForm = () => {
    const navigate = useNavigate()
    const { attendedEventId } = useParams()
    const [initialAttendedEvent, setInitialAttendedEvent] = useState({})
    const [editedAttendedEvent, updateEditedAttendedEvent] = useState({
        id: attendedEventId,
        userId: initialAttendedEvent.userId,
        homeTeamId: initialAttendedEvent.homeTeamId,
        awayTeamId: initialAttendedEvent.awayTeamId,
        homeTeamScore: '',
        awayTeamScore: '',
        stadiumId: initialAttendedEvent.stadiumId,
        date: '',
        section: '',
        row: '',
        seat: '',
        overtime: false,
        lengthOfOvertime: null,
        notes: ''
    })

    const getSelectedAttendedEvent = () => {
        getAttendedEventById(attendedEventId).then(event => setInitialAttendedEvent(event))
    }

    useEffect(() => {
        getSelectedAttendedEvent()
    }, [])

    useEffect(() => {
        updateEditedAttendedEvent(structuredClone(initialAttendedEvent))
    }, [initialAttendedEvent])

    const handleEditEventButtonClick = (event) => {
        event.preventDefault()

        const attendedEventToSendToApi = {
            id: editedAttendedEvent.id,
            userId: editedAttendedEvent.userId,
            homeTeamId: editedAttendedEvent.homeTeamId,
            awayTeamId: editedAttendedEvent.awayTeamId,
            homeTeamScore: parseInt(editedAttendedEvent.homeTeamScore),
            awayTeamScore: parseInt(editedAttendedEvent.awayTeamScore),
            stadiumId: editedAttendedEvent.stadiumId,
            date: editedAttendedEvent.date,
            section: editedAttendedEvent.section,
            row: editedAttendedEvent.row,
            seat: editedAttendedEvent.seat,
            overtime: editedAttendedEvent.overtime,
            lengthOfOvertime: editedAttendedEvent.lengthOfOvertime,
            notes: editedAttendedEvent.notes
        }

        updateAttendedEvent(attendedEventToSendToApi).then(() => { navigate(`/myEvents/${attendedEventId}`) })
    }

    return (
        <article className='eventFormContainer'>
            <form className='eventForm'>
                <h1>Edit Event</h1>
                <div className='leagueAndDateFormContainer'>
                    <div className='leagueFormContainer'>
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="league">League: </label>
                                <div className="teamNameAndLogoFormContainer">
                                    <img className="formTeamLogo" src={initialAttendedEvent.homeTeam?.league?.logo} alt={`${initialAttendedEvent.homeTeam?.league?.name}`} />
                                    <label className="teamNameForm">{initialAttendedEvent.homeTeam?.league?.abbreviation}</label>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div className='dateFormContainer'>
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="date">Date:</label>
                                <input
                                    required
                                    type="date"
                                    className="form-control"
                                    id="eventFormControl"
                                    placeholder="Enter Date.."
                                    defaultValue={initialAttendedEvent?.date ? new Date(initialAttendedEvent.date).toISOString().split('T')[0] : null}
                                    // value={editedAttendedEvent.date}
                                    onChange={
                                        (event) => {
                                            const copy = { ...editedAttendedEvent }
                                            copy.date = event.target.value
                                            updateEditedAttendedEvent(copy)
                                        }
                                    } />
                            </div>
                        </fieldset>
                    </div>
                </div>
                <h5 className='teamsFormHeader'>Game Information</h5>
                <div className='teamFormContainer'>
                    <div className='homeTeamFormContainer'>
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="homeTeam">Home Team:</label>
                                <div className="teamNameAndLogoFormContainer">
                                    <img className="formTeamLogo" src={initialAttendedEvent.homeTeam?.logo} alt={`${initialAttendedEvent.homeTeam?.name}`} />
                                    <label className="teamNameForm">{initialAttendedEvent.homeTeam?.name}</label>
                                </div>
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="homeTeamScore">Score:</label>
                                <input
                                    required
                                    type="number"
                                    className="form-control"
                                    id="eventFormControl"
                                    placeholder="Enter Home Score.."
                                    defaultValue={initialAttendedEvent.homeTeamScore}
                                    // value={editedAttendedEvent.homeTeamScore}
                                    onChange={
                                        (event) => {
                                            const copy = { ...editedAttendedEvent }
                                            copy.homeTeamScore = event.target.value
                                            updateEditedAttendedEvent(copy)
                                        }
                                    } />
                            </div>
                        </fieldset>
                    </div>
                    <div className='awayTeamFormContainer'>
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="awayTeam">Away Team:</label>
                                <div className="teamNameAndLogoFormContainer">
                                    <img className="formTeamLogo" src={initialAttendedEvent.awayTeam?.logo} alt={`${initialAttendedEvent.awayTeam?.name}`} />
                                    <label className="teamNameForm">{initialAttendedEvent.awayTeam?.name}</label>
                                </div>
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="awayTeamScore">Score:</label>
                                <input
                                    required
                                    type="number"
                                    className="form-control"
                                    id="eventFormControl"
                                    placeholder="Enter Away Score.."
                                    defaultValue={initialAttendedEvent.awayTeamScore}
                                    // value={editedAttendedEvent.awayTeamScore}
                                    onChange={
                                        (event) => {
                                            const copy = { ...editedAttendedEvent }
                                            copy.awayTeamScore = event.target.value
                                            updateEditedAttendedEvent(copy)
                                        }
                                    } />
                            </div>
                        </fieldset>
                    </div>
                </div>
                <div className='stadiumFormContainer'>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="stadium">Stadium: {initialAttendedEvent.stadium?.name}</label>
                        </div>
                    </fieldset>
                </div>
                <h5 className='ticketInfoFormHeader'>Ticket Information</h5>
                <div className='ticketInfoFormContainer'>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="section">Section:</label>
                            <input
                                required
                                type="text"
                                className="form-control"
                                id="eventFormControl--ticketInfo"
                                placeholder="Enter Section.."
                                defaultValue={initialAttendedEvent.section}
                                // value={editedAttendedEvent.section}
                                onChange={
                                    (event) => {
                                        const copy = { ...editedAttendedEvent }
                                        copy.section = event.target.value
                                        updateEditedAttendedEvent(copy)
                                    }
                                } />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group--ticketInfo">
                            <label htmlFor="row">Row:</label>
                            <input
                                required
                                type="text"
                                className="form-control"
                                id="eventFormControl--ticketInfo"
                                placeholder="Enter Row.."
                                defaultValue={initialAttendedEvent.row}
                                // value={editedAttendedEvent.row}
                                onChange={
                                    (event) => {
                                        const copy = { ...editedAttendedEvent }
                                        copy.row = event.target.value
                                        updateEditedAttendedEvent(copy)
                                    }
                                } />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="seat">Seat:</label>
                            <input
                                required
                                type="text"
                                className="form-control"
                                id="eventFormControl--ticketInfo"
                                placeholder="Enter Seat.."
                                defaultValue={initialAttendedEvent.seat}
                                // value={editedAttendedEvent.seat}
                                onChange={
                                    (event) => {
                                        const copy = { ...editedAttendedEvent }
                                        copy.seat = event.target.value
                                        updateEditedAttendedEvent(copy)
                                    }
                                } />
                        </div>
                    </fieldset>
                </div>
                <div className='notesFormContainer'>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="notes">Notes:</label>
                            <textarea
                                required
                                type="text"
                                className="form-control"
                                id="eventFormControl"
                                placeholder="Enter Notes.."
                                rows="5"
                                defaultValue={initialAttendedEvent.notes}
                                // value={editedAttendedEvent.notes}
                                onChange={
                                    (event) => {
                                        const copy = { ...editedAttendedEvent }
                                        copy.notes = event.target.value
                                        updateEditedAttendedEvent(copy)
                                    }
                                } />
                        </div>
                    </fieldset>
                </div>
                <div className="buttonRow">
                    <button
                        onClick={handleEditEventButtonClick}
                        className="btn btn-danger"
                        id="addEventButton">
                        Save Event
                    </button>

                    <button
                        onClick={() => { navigate(`/myEvents/${attendedEventId}`) }}
                        className="btn btn-secondary"
                        id="cancelButton">
                        Cancel</button>
                </div>
            </form>
        </article>
    )
}