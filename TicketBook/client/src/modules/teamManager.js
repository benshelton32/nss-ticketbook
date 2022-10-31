import { getToken } from "./authManager";

const _apiUrl = "/api/Team";

export const getAllTeams = () => {
    return fetch(_apiUrl)
        .then((res) => res.json())
};

export const getTeamById = (teamId) => {
    return fetch(_apiUrl + `/${teamId}`)
        .then((res) => res.json())
};

export const getTeamsByLeagueId = (leagueId) => {
    return fetch(_apiUrl + `/ByLeague/${leagueId}`)
        .then((res) => res.json())
};