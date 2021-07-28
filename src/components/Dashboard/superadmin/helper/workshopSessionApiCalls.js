import { API } from "../../../../backend";

export const createWorkshopSession = (userId, token, workshopSession) => {



    return fetch(`${API}/workshopSession/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: workshopSession
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const updateWorkshopSession = (userId, workshopSessionId, token, workshopSession) => {



    return fetch(`${API}/workshopSession/${workshopSessionId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(workshopSession)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};




export const getWorkshopSession = (WorkshopSessionId) => {
    return fetch(`${API}/workshopSession/${WorkshopSessionId}`, {
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
export const getWorkshopSessions = () => {
    return fetch(`${API}/workshopSessions/`, {
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
