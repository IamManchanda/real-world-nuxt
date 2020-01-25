<template>
  <div class="app">
    <nav-bar />
    <nuxt/>
  </div>
</template>

<script>
import NavBar from "~/components/navigation/NavBar.vue";

export default {
  components: {
    NavBar,
  },
};
</script>
