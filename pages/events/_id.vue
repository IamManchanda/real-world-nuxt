<template>
  <div>
    <div class="event-header">
      <span class="eyebrow">
        @{{ event.time }} on {{ parsedDate(event.date) }}
      </span>
      <h1 class="title">{{ event.title }}</h1>
      <h5>Organized by {{ event.organizer }}</h5>
      <h5>Category: {{ event.category }}</h5>
    </div>
    <base-icon name="map">
      <h2>Location</h2>
    </base-icon>
    <address>{{ event.location }}</address>
    <h2>Event details</h2>
    <p>{{ event.description }}</p>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  head() {
    return {
      title: this.event.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `What you need to know about ${this.event.title}`
        }
      ]
    };
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch("events/fetchCurrentEvent", {
        id: params.id
      });
    } catch (err) {
      error({
        statusCode: err.response.status,
        message: err.response.statusText
      });
    }
  },
  computed: {
    ...mapState({
      event: state => state.events.event
    })
  },
  methods: {
    parsedDate(date) {
      const eventDate = new Date(date);
      const [firstStr, ...restStr] = eventDate.toDateString().split(" ");
      return `${firstStr}, ${restStr.join(" ")}`;
    }
  }
};
</script>
