<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select
      :value="value"
      v-bind="$attrs"
      v-on="listeners"
      @input="updateValue"
    >
      <option value disabled>{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option"
        :selected="option === value"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    options: {
      type: Array,
      required: true
    },
    placeholder: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    value: {
      type: [String, Number],
      default: ""
    }
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue
      };
    }
  },
  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value);
    }
  }
};
</script>
