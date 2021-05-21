const CounterButton = {
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  methods: {
    increment() {
      this.$emit('increment', this.count + 1);
    },
  },

  template: `<button @click="increment()" type="button">{{ count }}</button>`,
};

export default CounterButton;
