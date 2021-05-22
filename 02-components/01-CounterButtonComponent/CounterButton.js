const CounterButton = {
  name: 'CounterButton',


  model: {
    prop: 'count',
    event: 'click'
  },

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  template: `<button 
    :value="count"
    @click="$emit('increment', count + 1)"
    type="button">{{ count }}</button>`,
};

export default CounterButton;
