<template>
  <div>
    <slot v-for="item in localItems" :item="item" />
  </div>
</template>

<script>
export default {
  name: 'AppPagination',

  props: {
    page: Number,
    perPage: Number,
    items: Array,
  },

  computed: {
    localItems() {
      return this.items.slice((this.page - 1) * this.perPage, this.page * this.perPage);
    },
  },
};
</script>

<style></style>
