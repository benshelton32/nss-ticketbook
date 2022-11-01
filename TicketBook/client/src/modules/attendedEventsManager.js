import { getToken } from "./authManager";

const _apiUrl = "/api/AttendedEvent";

export const getAllAttendedEvents = () => {
    return fetch(_apiUrl)
        .then((res) => res.json())
};

export const getUsersAttendedEvents = () => {
    return getToken().then((token) => {
        return fetch(_apiUrl + '/CurrentUsersEvents', {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Error("An unknown error occured");
                }
            })
    })
};

// export const addAttendedEvent = (attendedEvent) => {
//     return fetch(_apiUrl, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(attendedEvent),
//     });
// };

export const addAttendedEvent = (attendedEvent) => {
    return getToken().then((token) => {
        return fetch(_apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(attendedEvent),
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else if (resp.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error(
                    "An unknown error occurred while trying to save new event.",
                );
            }
        });
    });;
};

export const getAttendedEventById = (eventId) => {
    return fetch(_apiUrl + `/${eventId}`)
        .then((res) => res.json())
};

export const updateAttendedEvent = (attendedEvent) => {
    return fetch(_apiUrl + `/${attendedEvent.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(attendedEvent),
    });
};

export const deleteAttendedEvent = (eventId) => {
    return getToken().then((token) => {
        return fetch(_apiUrl + `/${eventId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    })
}