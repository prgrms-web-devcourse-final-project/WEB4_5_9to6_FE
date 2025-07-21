import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://studium.cedartodo.uk/api/v1/",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export const axiosNotApi = axios.create({
    baseURL: "https://studium.cedartodo.uk/",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});
