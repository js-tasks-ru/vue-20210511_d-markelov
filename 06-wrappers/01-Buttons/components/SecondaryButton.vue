<template>
  <base-button class="button_secondary" :tag="tag" :block="block" v-bind="$attrs" v-on="$listeners"><slot /></base-button>
</template>

<script>
import BaseButton from './BaseButton.vue';
export default {
  name: 'SecondaryButton',

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
.button_secondary {
  background-color: var(--white);
  border-color: var(--blue);
  color: var(--blue);
}

.button_secondary:hover {
  border-color: var(--blue-light);
}
</style>
