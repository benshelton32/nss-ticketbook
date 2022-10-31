import React, { useEffect, useState } from "react";
import { getUsersAttendedEvents, getAllAttendedEvents } from "../../modules/attendedEventsManager";
import { AttendedEvent } from "./AttendedEvent";
import "./AttendedEvent.css";

export const AttendedEventsList = () => {
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
        <section>
            <h1 className="eventListHeader">Attended Events</h1>

            <div className="eventListContainer">
                {
                    initialAttendedEvents.map((attendedEvent) => (
                        <AttendedEvent attendedEvent={attendedEvent} key={attendedEvent.id} />
                    ))
                }
            </div>
        </section>
    )
}