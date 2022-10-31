import { getToken } from "./authManager";

const _apiUrl = "/api/League";

export const getAllLeagues = () => {
    return fetch(_apiUrl)
        .then((res) => res.json())
};

export const getLeagueById = (leagueId) => {
    return fetch(_apiUrl + `/${leagueId}`)
        .then((res) => res.json())
};