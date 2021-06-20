<template>
  <div class="meetups-list">
    <!-- Требуется scoped-slot для элементов списка -->
    <slot v-for="item in items" :item="item"> </slot>
  </div>
</template>

<script>
export default {
  name: 'ListView',

  props: {
    items: {
      type: Array,
      required: false,
    },
  },
};
</script>

<style scoped>
.meetups-list {
}
</style>
