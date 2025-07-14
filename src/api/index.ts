import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://studium.cedartodo.uk/api/v1/",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
