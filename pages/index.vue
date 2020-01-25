<template>
  <div>
    <h1>Event Listings</h1>
    {{ events }}
  </div>
</template>

<script>
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
  async asyncData({ $axios }) {
    const response = await $axios.get("http://localhost:3000/api/events");
    const { data: events } = response;
    return {
      events
    };
  }
};
</script>
