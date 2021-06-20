<script>
export default {
  name: 'NodesPagination',

  props: {
    page: Number,
    perPage: Number,
  },

  render: function (h) {
    return this.$slots.default
      ? h('div', this.$slots.default.slice((this.page - 1) * this.perPage, this.page * this.perPage))
      : null;
  },
};
</script>
