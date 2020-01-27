<template>
  <div class="app">
    <nav-bar />
    <nuxt />
  </div>
</template>

<script>
import NavBar from "~/components/navigation/NavBar";

export default {
  head() {
    return {
      titleTemplate: "%s | Real World Events",
      title: "Welcome",
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
  components: {
    NavBar
  }
};
</script>
