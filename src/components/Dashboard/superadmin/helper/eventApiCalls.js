import { API } from "../../../../backend";

export const createEvent = (userId, token, event) => {

    // console.log(event.studentCoordinator)

    return fetch(`${API}/event/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: event
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const updateEvent = (userId, eventId, token, event) => {

    // console.log(event.studentCoordinator)

    return fetch(`${API}/event/${eventId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: event
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const getevents = () => {
    return fetch(`${API}/events`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};



export const getEvent = (EventId) => {
    return fetch(`${API}/event/${EventId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",

        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
