import axios from "axios";

const api = axios.create({
  baseURL: "https://real-world-nuxt-mock-server.herokuapp.com/api",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  timeout: 10000
});

/* export const getEvents = (perPage, page) =>
  api.get(`/events?_limit=${perPage}&_page=${page}`); */
export const getEvents = () => api.get("/events");
export const getCurrentEvent = id => api.get(`/events/${id}`);
export const postCurrentEvent = event => api.post("/events", event);
