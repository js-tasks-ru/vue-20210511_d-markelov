<template>
  <div>
    <button :value="count" type="button" @click="$emit('increment', count + 1)">
      {{ count }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'CounterButton',

  model: {
    prop: 'count',
    event: 'increment',
  },

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style></style>
