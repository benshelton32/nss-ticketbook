import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsersAttendedEvents } from "../../modules/attendedEventsManager";
import { AttendedEvent } from "./AttendedEvent";
import "./AttendedEvent.css";

export const AttendedEventsList = () => {
    const navigate = useNavigate()
    const [initialAttendedEvents, setInitialAttendedEvents] = useState(null)

    const getAttendedEvents = () => {
        getUsersAttendedEvents().then(setInitialAttendedEvents)
    }

    useEffect(() => {
        getAttendedEvents()
    },
        []
    )

    const renderEventsOrMessage = () => {
        if (initialAttendedEvents) {
            if (initialAttendedEvents.length > 0) {
                return <section>
                    <h1 className="eventListHeader">Attended Events</h1>

                    <div className="eventListContainer">
                        {
                            initialAttendedEvents.map((attendedEvent) => (
                                <AttendedEvent attendedEvent={attendedEvent} getAttendedEvents={getAttendedEvents} key={attendedEvent.id} />
                            ))
                        }
                    </div>
                </section>
            } else {
                return <div className="noEventContainer">
                    <div className="noEventMessage">Please, click on Add Event to start adding your events!</div>
                    <div><button id="noEventAddButton" className="btn btn-danger" onClick={() => { navigate(`/myEvents/create`) }}>Add Event</button></div>
                </div>
            }
        }
    }

    return renderEventsOrMessage()
}