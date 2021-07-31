import { API, BASE_API } from '../../Utils/backend.js';

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
export const registerInWorkshop = (userId, token, workshopId) => {

    console.log(`userId:${userId},tokenId:${token},workshop id : ${workshopId}`);
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
export const registerInEvent = (userId, token, eventId) => {

    console.log(`userId:${userId},tokenId:${token},workshop id : ${eventId}`);
    return fetch(`${API}/user/${userId}/event/${eventId}`, {
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

export const registerInEventAsTeam=(emailId,token, eventId)=>{
    return fetch(`${API}/user/get-id`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`          
        },
        body:JSON.stringify({
            
            "email":emailId,
            "eventId":eventId
        
        })
    }).then(response=>{
        return response.json();
    }).catch(err=>{
        console.log(err);
    });
}
export const createTeam=(token,teamMembers,eventId,totalTeamMember,teamLeader)=>{
    return fetch(`${API}/user/create-team`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}` 
        },
        body:JSON.stringify({
            "teamMembers":teamMembers,
            "eventId":eventId,
            "totalTeamMember":totalTeamMember,
            "teamLeader":teamLeader
        })
    }).then(response=>{
        return response.json()
    }).catch(err=>{
        console.log(err)
    })
}