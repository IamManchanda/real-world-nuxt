<template>
  <div>
    <h1>Event Listings</h1>
    <event-card v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script>
import EventCard from "~/components/shared/EventCard.vue";

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
  async asyncData({ $axios, error }) {
    try {
      const { data: events } = await $axios.get(
        "https://real-world-nuxt-mock-server.herokuapp.com/api/events"
      );
      return { events };
    } catch (err) {
      error({
        statusCode: err.response.status,
        message: err.response.statusText
      });
    }
  },
  components: {
    EventCard
  }
};
</script>
