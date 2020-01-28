<template>
  <div class="page-container">
    <h2>Create an Event</h2>
    <template v-if="$v.$anyError">
      <p class="field error -text-error">
        Please fill out the required fields
      </p>
      <hr />
      <br />
    </template>

    <form @submit.prevent="createEvent">
      <base-select
        v-model="event.category"
        label="Select a Category"
        :options="categories"
        placeholder="Please Select a Category"
        class="field"
        :class="{ error: $v.event.category.$error }"
        @blur="$v.event.category.$touch()"
      />
      <template v-if="$v.event.category.$error">
        <p v-if="!$v.event.category.required" class="-text-error">
          Category is required.
        </p>
      </template>
      <h3>Name & describe your event</h3>
      <base-input
        v-model="event.title"
        type="text"
        label="Title"
        placeholder="Add an event title"
        class="field"
        :class="{ error: $v.event.title.$error }"
        @blur="$v.event.title.$touch()"
      />
      <template v-if="$v.event.title.$error">
        <p v-if="!$v.event.title.required" class="-text-error">
          Title is required.
        </p>
      </template>
      <base-input
        v-model="event.description"
        type="text"
        label="Description"
        placeholder="Add a description"
        class="field"
        :class="{ error: $v.event.description.$error }"
        @blur="$v.event.description.$touch()"
      />
      <template v-if="$v.event.description.$error">
        <p v-if="!$v.event.description.required" class="-text-error">
          Description is required.
        </p>
      </template>
      <h3>Where is your event?</h3>
      <base-input
        v-model="event.location"
        type="text"
        label="Location"
        placeholder="Add a location"
        class="field"
        :class="{ error: $v.event.location.$error }"
        @blur="$v.event.location.$touch()"
      />
      <template v-if="$v.event.location.$error">
        <p v-if="!$v.event.location.required" class="-text-error">
          Location is required.
        </p>
      </template>
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <client-only placeholder="Loading...">
          <datepicker
            v-model="event.date"
            placeholder="Select a date"
            :input-class="{ error: $v.event.date.$error }"
            @opened="$v.event.date.$touch()"
          />
        </client-only>
      </div>
      <template v-if="$v.event.date.$error">
        <p v-if="!$v.event.date.required" class="-text-error">
          Date is required.
        </p>
      </template>
      <base-select
        v-model="event.time"
        label="Select a Time"
        placeholder="Please Select a Time"
        :options="times"
        class="field"
        :class="{ error: $v.event.time.$error }"
        @blur="$v.event.time.$touch()"
      />
      <template v-if="$v.event.time.$error">
        <p v-if="!$v.event.time.required" class="-text-error">
          Time is required.
        </p>
      </template>
      <base-button
        type="submit"
        button-class="-fill-gradient -cursor-pointer"
        :disabled="$v.$anyError"
      >
        Submit
      </base-button>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import uuid from "uuid";
import { required } from "vuelidate/lib/validators";

export default {
  head() {
    return {
      title: "Create an Event",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "You can create a new event in your neighborhood"
        }
      ]
    };
  },
  data() {
    const times = [];
    for (let i = 1; i <= 24; i++) {
      times.push(i + ":00");
    }
    return {
      event: {},
      times
    };
  },
  mounted() {
    this.event = this.createFreshEvent();
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
      categories: state => state.categories.categories
    })
  },
  validations: {
    event: {
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required }
    }
  },
  methods: {
    async createEvent() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        try {
          const { event } = this;
          await this.$store.dispatch("events/createEvent", { event });
          this.$router.push({
            name: "events-id",
            params: { id: this.event.id }
          });
          this.event = this.createFreshEvent();
        } catch (error) {
          console.error(error);
        }
      }
    },
    createFreshEvent() {
      const { user } = this;
      return {
        id: uuid.v4(),
        user: user.name,
        category: "",
        organizer: user.name,
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
        attendees: []
      };
    }
  }
};
</script>
<style scoped>
.field {
  margin-bottom: 24px;
  padding: 6px 8px 12px;
}
</style>
