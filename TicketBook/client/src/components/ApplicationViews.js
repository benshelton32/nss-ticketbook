import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import { AttendedEventsList } from "./AttendedEvents/AttendedEventList";
import { AttendedEventDetail } from "./AttendedEvents/AttendedEventDetail";
import { AddAttendedEventForm } from "./AttendedEvents/AddAttendedEventForm";
import { EditAttendedEventForm } from "./AttendedEvents/EditAttendedEventForm";

export default function ApplicationViews({ isLoggedIn }) {
    return (
        <main>
            <Routes>
                <Route path="/">
                    <Route
                        index
                        element={isLoggedIn ? <Hello /> : <Navigate to="/login" />}
                    />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="myEvents" element={<AttendedEventsList />} />
                    <Route path="myEvents/create" element={<AddAttendedEventForm />} />
                    <Route path="myEvents/edit/:attendedEventId" element={<EditAttendedEventForm />} />
                    <Route path="myEvents/:attendedEventId" element={<AttendedEventDetail />} />

                    <Route path="*" element={<p>Whoops, nothing here...</p>} />
                </Route>
            </Routes>
        </main>
    );
}