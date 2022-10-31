import { getToken } from "./authManager";

const _apiUrl = "/api/Stadium";

export const getAllStadiums = () => {
    return fetch(_apiUrl)
        .then((res) => res.json())
};

export const getStadiumById = (stadiumId) => {
    return fetch(_apiUrl + `/${stadiumId}`)
        .then((res) => res.json())
};

export const getStadiumByLeagueId = (leagueId) => {
    return fetch(_apiUrl + `/ByLeague/${leagueId}`)
        .then((res) => res.json())
};

export const getStadiumByHomeTeamId = (homeTeamId) => {
    return fetch(_apiUrl + `/ByHomeTeam/${homeTeamId}`)
        .then((res) => res.json())
};