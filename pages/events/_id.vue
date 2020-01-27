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
import { getCurrentEvent } from "~/services/EventService";

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
  async asyncData({ $axios, error, params }) {
    try {
      const { data: event } = await getCurrentEvent(params.id);
      return { event };
    } catch (err) {
      error({
        statusCode: err.response.status,
        message: err.response.statusText
      });
    }
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
