<template>
  <button type="button" @click="increment">{{ localCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',
  
  model: {
    prop: 'count',
    event: 'increment',
  },

  props: {
    count: { type: Number, default: 0 },
  },

  data() {
    return {
      localCount: this.count,
    };
  },

  watch: {
    count: {
      handler(newValue) {
        this.localCount = newValue;
      },
    },

    localCount: {
      handler(newValue) {
        this.$emit('increment', newValue);
      },
    },
  },

  methods: {
    increment() {
      this.localCount++;
    },
  },
};
</script>
