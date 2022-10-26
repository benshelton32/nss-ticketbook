import React, { useEffect, useState } from "react";
import { getUsersAttendedEvents } from "../../modules/attendedEventsManager,js";
import { AttendedEvent } from "./AttendedEvent";

export const AttendedEventsList = () => {
    const [initialAttendedEvents, setInitialAttendedEvents] = useState([])

    const getAttendedEvents = () => {
        getUsersAttendedEvents().then(attendedEvents => setInitialAttendedEvents(attendedEvents))
    }

    useEffect(() => {
        getAttendedEvents()
    },
        [])

    return (
        <section>
            <div>
                <h1>Attended Events</h1>
                {
                    initialAttendedEvents.map((attendedEvent) => (
                        <AttendedEvent attendedEvent={attendedEvent} key={attendedEvent.id} />
                    ))
                }
            </div>
        </section>
    )
}