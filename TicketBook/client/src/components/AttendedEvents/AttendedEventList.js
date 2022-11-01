import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsersAttendedEvents, getAllAttendedEvents } from "../../modules/attendedEventsManager";
import { AttendedEvent } from "./AttendedEvent";
import "./AttendedEvent.css";

export const AttendedEventsList = () => {
    const navigate = useNavigate()
    const [initialAttendedEvents, setInitialAttendedEvents] = useState([])

    const getAttendedEvents = () => {
        getUsersAttendedEvents().then(setInitialAttendedEvents)
    }

    // const getAttendedEvents = () => {
    //     getAllAttendedEvents().then(attendedEvents => setInitialAttendedEvents(attendedEvents))
    // }

    useEffect(() => {
        getAttendedEvents()
    },
        []
    )

    return (
        <>
            {initialAttendedEvents.length > 0 ?
                <section>
                    <h1 className="eventListHeader">Attended Events</h1>

                    <div className="eventListContainer">
                        {
                            initialAttendedEvents.map((attendedEvent) => (
                                <AttendedEvent attendedEvent={attendedEvent} getAttendedEvents={getAttendedEvents} key={attendedEvent.id} />
                            ))
                        }
                    </div>
                </section>
                : <div className="noEventContainer">
                    <div className="noEventMessage">Please, click on Add Event to start adding your events!</div>
                    <div><button id="noEventAddButton" className="btn btn-danger" onClick={() => { navigate(`/myEvents/create`) }}>Add Event</button></div>
                </div>}
        </>
    )
}