import { API } from "../../../../backend";

export const createWorkshop = (userId, token, workshop) => {



    return fetch(`${API}/workshop/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: workshop
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const updateWorkshop = (userId, workshopId, token, workshop) => {



    return fetch(`${API}/workshop/${workshopId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: workshop
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const registerInWorkshop = (userId, token, workshopId) => {



    return fetch(`${API}/user/${userId}/workshop/${workshopId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const getworkshops = () => {
    return fetch(`${API}/workshops`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};



export const getWorkshop = (WorkshopId) => {
    return fetch(`${API}/workshop/${WorkshopId}`, {
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
