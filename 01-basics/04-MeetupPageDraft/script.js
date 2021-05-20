import Vue from './vendor/vue.esm.browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 6;

/**
 * Возвращает ссылку на изображение по идентификатору, например, изображение митапа
 * @param imageId {number} - идентификатор изображения
 * @return {string} - ссылка на изображение
 */
function getImageUrlByImageId(imageId) {
  return `${API_URL}/images/${imageId}`;
}

/**
 * Словарь заголовков по умолчанию для всех типов пунктов программы
 */
const agendaItemDefaultTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

/**
 * Словарь иконок для для всех типов пунктов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

const app = new Vue({
  data() {
    return {
      rawMeetup: null,
    };
  },

  computed: {
    meetup() {
      return {
        ...this.rawMeetup,
        localDate: this.rawMeetup.date
          ? new Date(this.rawMeetup.date).toLocaleString(navigator.language, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          : 'Дата станет известна позже',

        backgroundImg: this.rawMeetup.imageId
          ? `--bg-url:url('https://course-vue.javascript.ru/api/images/${this.rawMeetup.imageId}')`
          : '',

        refinedAgenda: this.rawMeetup?.agenda.map((agenda) => {
          return {
            ...agenda,
            title: agenda.title ? agenda.title : agendaItemDefaultTitles[agenda.type],
            icon: `/assets/icons/icon-${agendaItemIcons[agenda.type]}.svg`,
          };
        }),
      };
    },
  },

  created() {
    this.getMetupInfo(1);
    console.log('cr: ', new Date().getUTCSeconds(), new Date().getMilliseconds());
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
            this.rawMeetup = data;
          });
      } catch (e) {
        if (e.response) {
          console.log('Server Error: ', e);
        } else if (e.request) {
          console.log('Network Error: ', e);
        } else {
          console.log('Client Error: ', e);
        }
      }
    },
  },

  template: `#app`,
});

app.$mount('#app');
