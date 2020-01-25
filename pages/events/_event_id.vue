<template>
  <div>
    <h1>Event: #{{ eventId }}</h1>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: `Event: #${this.eventId}`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `What you need to know about event #${this.eventId}`
        }
      ]
    };
  },
  computed: {
    eventId() {
      return this.$route.params["event_id"];
    }
  }
};
</script>
