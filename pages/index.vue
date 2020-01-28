<template>
  <div class="page-container">
    <h1>Event Listings</h1>
    <event-card v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script>
import EventCard from "~/components/shared/EventCard";
import { mapState } from "vuex";

export default {
  head() {
    return {
      title: "Event Listings",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Where you can find all the real world events taking place in your neighborhood"
        }
      ]
    };
  },
  async fetch({ store, error }) {
    try {
      await store.dispatch("events/fetchEvents");
    } catch (err) {
      error({
        statusCode: err.response.status,
        message: err.response.statusText
      });
    }
  },
  components: {
    EventCard
  },
  computed: {
    ...mapState({
      events: state => state.events.events
    })
  }
};
</script>
