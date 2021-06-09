<template>
  <base-button class="button_danger" :tag="tag" :block="block" v-bind="$attrs" v-on="$listeners"><slot /></base-button>
</template>

<script>
import BaseButton from './BaseButton.vue';

export default {
  name: 'DangerButton',

  components: {
    BaseButton,
  },

  inheritAttrs: false,

  props: {
    block: Boolean,
    tag: {
      type: String,
      default: 'button',
    },
  },
};
</script>

<style scoped>
.button_danger {
  background-color: var(--white);
  border-color: var(--red);
  color: var(--red);
}

.button_danger:hover {
  border-color: var(--red-light);
}
</style>
