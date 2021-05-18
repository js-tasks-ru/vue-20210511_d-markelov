import Vue from './vendor/vue.esm.browser.js';

// Требуется создать Vue приложение

const app = new Vue({
  data() {
    return {
      count: 0,
    }
  },
  methods: {
    incrementCount() {
      this.count++
    }
  },
  template: `
        <button  @click="incrementCount">{{ this.count }}</button>
    `
});

app.$mount('#app');
