import Vue from './vendor/vue.esm.browser.js';

const app = new Vue({
  data() {
    return {
      selectedMeetupId: 1,
      selectedMeetupInfo: {},
    };
  },

  watch: {
    selectedMeetupId: {
      immediate: true,
      handler: function (newVal) {
        this.getMetupInfo(newVal);
      },
    },
  },

  methods: {
    async getMetupInfo(id) {
      try {
        const url = `https://course-vue.javascript.ru/api/meetups/${id}`;
        await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((data) => {
            this.selectedMeetupInfo = data;
          });
      } catch (e) {
        if (e.response) {
          // client received an error response (5xx, 4xx)
          console.log('Server Error: ', e);
        } else if (e.request) {
          // client never received a response, or request never left
          console.log('Network Error: ', e);
        } else {
          console.log('Client Error: ', e);
        }
      }
    },
  },

  template: `
    <div>
    <span v-for="id in 5">
        <input type="radio" name="meetUpTitleRadio" :id="'R'+id" :value="id" v-model="selectedMeetupId">
        <label :for="'R'+id">{{ id }}</label>
    </span>
    <hr/>
    <h1>{{ selectedMeetupInfo.title }}</h1>
    </div>
  `,
});

app.$mount('#app');
