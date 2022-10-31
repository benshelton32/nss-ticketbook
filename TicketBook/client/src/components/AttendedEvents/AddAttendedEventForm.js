import './AttendedEventForm.css'
import { useEffect, useState } from "react"
import { addAttendedEvent } from "../../modules/attendedEventsManager"
import { useNavigate } from "react-router-dom"
import { getAllLeagues } from "../../modules/leagueManager"
import { getTeamsByLeagueId } from "../../modules/teamManager"
import { getStadiumByHomeTeamId } from '../../modules/stadiumManager'

export const AddAttendedEventForm = () => {

    const navigate = useNavigate()

    const [attendedEvent, updateAttendedEvent] = useState({
        leagueId: '',
        homeTeamId: '',
        awayTeamId: '',
        homeTeamScore: '',
        awayTeamScore: '',
        stadiumId: '',
        date: '',
        section: '',
        row: '',
        seat: '',
        overtime: false,
        lengthOfOvertime: null,
        notes: ''
    })

    const [leagues, setLeagues] = useState([])
    const [teamsFilteredByLeague, setTeamsFilteredByLeague] = useState([])
    const [stadium, setStadium] = useState({})

    useEffect(() => {
        getAllLeagues().then(leagues => setLeagues(leagues))
    }, [])

    useEffect(() => {
        if (attendedEvent.leagueId !== 0 && attendedEvent.leagueId !== '') {
            getTeamsByLeagueId(parseInt(attendedEvent.leagueId)).then(teams => setTeamsFilteredByLeague(teams))
        }
    }, [attendedEvent.leagueId])

    useEffect(() => {
        if (attendedEvent.homeTeamId !== 0 && attendedEvent.homeTeamId !== '') {
            getStadiumByHomeTeamId(attendedEvent.homeTeamId).then(stadium => setStadium(stadium))
        }
    }, [attendedEvent.homeTeamId])

    // useEffect(() => {
    //     const copy = { ...attendedEvent }
    //     copy.stadiumId = stadium.id
    //     updateAttendedEvent(copy)
    // }, [stadium])

    const handleAddEventButtonClick = (event) => {
        event.preventDefault()

        const attendedEventToSendToApi = {
            homeTeamId: parseInt(attendedEvent.homeTeamId),
            awayTeamId: parseInt(attendedEvent.awayTeamId),
            homeTeamScore: parseInt(attendedEvent.homeTeamScore),
            awayTeamScore: parseInt(attendedEvent.awayTeamScore),
            stadiumId: stadium.id,
            date: attendedEvent.date,
            section: attendedEvent.section,
            row: attendedEvent.row,
            seat: attendedEvent.seat,
            overtime: attendedEvent.overtime,
            lengthOfOvertime: attendedEvent.lengthOfOvertime,
            notes: attendedEvent.notes
        }

        return addAttendedEvent(attendedEventToSendToApi).then(navigate('./myEvents'))
    }

    return (
        <article className='eventFormContainer'>
            <form className='eventForm'>
                <h1>Add an Event</h1>
                <div className='leagueAndDateFormContainer'>
                    <div className='leagueFormContainer'>
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="league">League: </label>
                                <select
                                    value={attendedEvent.leagueId}
                                    required autoFocus
                                    className="form-control"
                                    id="eventFormControl"
                                    onChange={
                                        (event) => {
                                            const copy = { ...attendedEvent }
                                            copy.leagueId = event.target.value
                                            updateAttendedEvent(copy)
                                        }
                                    }>
                                    <option value="">Select League...</option>
                                    {
                                        leagues.map(league => {
                                            return <>
                                                {/* <option key={`league--${league.id}`} value={league.id}><img className="formTeamLogo" src={process.env.PUBLIC_URL + `${league.logo}`} />{league.abbreviation}</option> */}
                                                <option key={`league--${league.id}`} value={league.id}>{league.abbreviation}</option>
                                            </>
                                        })
                                    }
                                </select>
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
                                    value={attendedEvent.date}
                                    onChange={
                                        (event) => {
                                            const copy = { ...attendedEvent }
                                            copy.date = event.target.value
                                            updateAttendedEvent(copy)
                                        }
                                    } />
                            </div>
                        </fieldset>
                    </div>
                </div>
                {attendedEvent.leagueId !== 0 && attendedEvent.leagueId !== '' &&
                    <>
                        <h5 className='teamsFormHeader'>Game Information</h5>
                        <div className='teamFormContainer'>
                            <div className='homeTeamFormContainer'>
                                <fieldset>
                                    <div className="form-group">
                                        <label htmlFor="homeTeam">Home Team: </label>
                                        <select
                                            value={attendedEvent.homeTeamId}
                                            required autoFocus
                                            className="form-control"
                                            id="eventFormControl"
                                            onChange={
                                                (event) => {
                                                    const copy = { ...attendedEvent }
                                                    copy.homeTeamId = event.target.value
                                                    updateAttendedEvent(copy)
                                                }
                                            }>
                                            <option value="">Select Home Team...</option>
                                            {
                                                teamsFilteredByLeague.map(team => {
                                                    return <>
                                                        {/* <option key={`homeTeam--${team.id}`} value={team.id}><img className="formTeamLogo" src={process.env.PUBLIC_URL + `${team.logo}`} />{team.name}</option> */}
                                                        <option key={`homeTeam--${team.id}`} value={team.id}>{team.name}</option>
                                                    </>
                                                })
                                            }
                                        </select>
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
                                            value={attendedEvent.homeTeamScore}
                                            onChange={
                                                (event) => {
                                                    const copy = { ...attendedEvent }
                                                    copy.homeTeamScore = event.target.value
                                                    updateAttendedEvent(copy)
                                                }
                                            } />
                                    </div>
                                </fieldset>
                            </div>
                            <div className='awayTeamFormContainer'>
                                <fieldset>
                                    <div className="form-group">
                                        <label htmlFor="awayTeam">Away Team: </label>
                                        <select
                                            value={attendedEvent.awayTeamId}
                                            required autoFocus
                                            className="form-control"
                                            id="eventFormControl"
                                            onChange={
                                                (event) => {
                                                    const copy = { ...attendedEvent }
                                                    copy.awayTeamId = event.target.value
                                                    updateAttendedEvent(copy)
                                                }
                                            }>
                                            <option value="">Select Away Team...</option>
                                            {
                                                teamsFilteredByLeague.map(team => {
                                                    return <>
                                                        {/* <option key={`awayTeam--${team.id}`} value={team.id}><img className="formTeamLogo" src={process.env.PUBLIC_URL + `${team.logo}`} />{team.name}</option> */}
                                                        <option key={`awayTeam--${team.id}`} value={team.id}>{team.name}</option>
                                                    </>
                                                })
                                            }
                                        </select>
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
                                            value={attendedEvent.awayTeamScore}
                                            onChange={
                                                (event) => {
                                                    const copy = { ...attendedEvent }
                                                    copy.awayTeamScore = event.target.value
                                                    updateAttendedEvent(copy)
                                                }
                                            } />
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                        {attendedEvent.homeTeamId !== 0 && attendedEvent.homeTeamId !== '' &&
                            <div className='stadiumFormContainer'>
                                <fieldset>
                                    <div className="form-group">
                                        <label htmlFor="stadium" value={attendedEvent.stadiumId}>Stadium: {stadium.name}</label>
                                    </div>
                                </fieldset>
                            </div>}
                        {/* <div className='dateFormContainer'>
                            <fieldset>
                                <div className="form-group">
                                    <label htmlFor="date">Date:</label>
                                    <input
                                        required
                                        type="date"
                                        className="form-control"
                                        id="eventFormControl"
                                        placeholder="Enter Date.."
                                        value={attendedEvent.date}
                                        onChange={
                                            (event) => {
                                                const copy = { ...attendedEvent }
                                                copy.date = event.target.value
                                                updateAttendedEvent(copy)
                                            }
                                        } />
                                </div>
                            </fieldset>
                        </div> */}
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
                                        value={attendedEvent.section}
                                        onChange={
                                            (event) => {
                                                const copy = { ...attendedEvent }
                                                copy.section = event.target.value
                                                updateAttendedEvent(copy)
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
                                        value={attendedEvent.row}
                                        onChange={
                                            (event) => {
                                                const copy = { ...attendedEvent }
                                                copy.row = event.target.value
                                                updateAttendedEvent(copy)
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
                                        value={attendedEvent.seat}
                                        onChange={
                                            (event) => {
                                                const copy = { ...attendedEvent }
                                                copy.seat = event.target.value
                                                updateAttendedEvent(copy)
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
                                        value={attendedEvent.notes}
                                        onChange={
                                            (event) => {
                                                const copy = { ...attendedEvent }
                                                copy.notes = event.target.value
                                                updateAttendedEvent(copy)
                                            }
                                        } />
                                </div>
                            </fieldset>
                        </div>
                        <div className="buttonRow">
                            <button
                                onClick={(clickEvent) => handleAddEventButtonClick(clickEvent)}
                                className="btn btn-danger"
                                id="addEventButton">
                                Add Event
                            </button>

                            <button
                                onClick={() => navigate("/myEvents")}
                                className="btn btn-secondary"
                                id="cancelButton">
                                Cancel</button>
                        </div>
                    </>
                }
            </form>
        </article>
    )

}