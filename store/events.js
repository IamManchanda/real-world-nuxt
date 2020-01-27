import {
  getEvents,
  getCurrentEvent,
  postCurrentEvent
} from "@/services/EventService.js";

export const state = () => ({
  events: [],
  event: {},
  eventsTotal: 0
});

export const mutations = {
  ADD_CURRENT_EVENT(currentState, { event }) {
    currentState.events.push(event);
  },
  SET_CURRENT_EVENT(currentState, { event }) {
    currentState.event = event;
  },
  SET_EVENTS(currentState, { events }) {
    currentState.events = events;
  },
  SET_EVENTS_TOTAL(currentState, { eventsTotal }) {
    currentState.eventsTotal = eventsTotal;
  }
};

export const actions = {
  async createEvent({ commit, dispatch }, { event }) {
    try {
      await postCurrentEvent(event);
      commit("ADD_CURRENT_EVENT", { event });
    } catch (error) {
      console.error(error);
    }
  },
  async fetchEvents({ commit, dispatch, state }) {
    try {
      const { data: events, headers } = await getEvents();
      const eventsTotal = parseInt(headers["x-total-count"]);
      commit("SET_EVENTS_TOTAL", { eventsTotal });
      commit("SET_EVENTS", { events });
    } catch (error) {
      console.error(error);
    }
  },
  async fetchCurrentEvent({ commit, getters }, { id }) {
    const event = getters.getEventById(id);
    if (event) {
      commit("SET_CURRENT_EVENT", { event });
      return event;
    } else {
      const { data: eventFromApi } = await getCurrentEvent(id);
      commit("SET_CURRENT_EVENT", { event: eventFromApi });
      return eventFromApi;
    }
  }
};

export const getters = {
  getEventById: state => id => state.events.find(event => event.id == id)
};
