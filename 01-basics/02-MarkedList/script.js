import Vue from './vendor/vue.esm.browser.js';

const emails = [
  'Eliseo@gardner.biz',
  'Jayne_Kuhic@sydney.com',
  'Nikita@garfield.biz',
  'Lew@alysha.tv',
  'Hayden@althea.biz',
  'Presley.Mueller@myrl.com',
  'Dallas@ole.me',
  'Mallory_Kunze@marie.org',
  'Meghan_Littel@rene.us',
  'Carmen_Keeling@caroline.name',
  'Veronica_Goodwin@timmothy.net',
  'Oswald.Vandervort@leanne.org',
  'Kariane@jadyn.tv',
  'Nathan@solon.io',
  'Maynard.Hodkiewicz@roberta.com',
  'Christine@ayana.info',
  'Preston_Hudson@blaise.tv',
  'Vincenza_Klocko@albertha.name',
  'Madelynn.Gorczany@darion.biz',
  'Mariana_Orn@preston.org',
  'Noemie@marques.me',
  'Khalil@emile.co.uk',
  'Sophia@arianna.co.uk',
  'Jeffery@juwan.us',
  'Isaias_Kuhic@jarrett.net',
];

const app = new Vue({
  data() {
    return {
      mails: emails,
      search: '',
    };
  },

  computed: {
    filteredEmails() {
      return this.mails.map((mail) => {
        if (this.search.length > 0 && mail.toLowerCase().includes(this.search.toLowerCase())) {
          return { email: mail, mark: true };
        } else {
          return { email: mail, mark: false };
        }
      });
    },
  },

  template: `
    <div>
      <input v-model='search' type="text" placeholder='search email'/>
      <ul>
        <li v-for="email in filteredEmails" v-bind:class="{marked: email.mark}">{{ email.email }}</li>
      </ul>
    </div>
  `,
});

app.$mount('#app');
