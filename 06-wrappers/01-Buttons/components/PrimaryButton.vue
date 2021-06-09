<template>
  <base-button class="button_primary" :tag="tag" :block="block" v-bind="$attrs" v-on="$listeners"><slot /></base-button>
</template>

<script>
import BaseButton from './BaseButton.vue';
export default {
  name: 'PrimaryButton',

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
.button_primary {
  background-color: var(--blue);
  border-color: var(--blue);
  color: var(--white);
}

.button_primary:hover {
  background-color: var(--blue-light);
  border-color: var(--blue-light);
}
</style>
