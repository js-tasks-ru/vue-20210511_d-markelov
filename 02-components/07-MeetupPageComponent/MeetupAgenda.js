import MeetupAgendaItem from './MeetupAgendaItem.js';

const MeetupAgenda = {
  name: 'MeetupAgenda',

  components: {
    MeetupAgendaItem,
  },

  props: {
    agenda: {
      type: Array,
      required: true,
    },
  },

  template: `
    <div class="meetup-agenda">
      <meetup-agenda-item v-for="agenda_item in agenda" :agenda-item="agenda_item"></meetup-agenda-item>
    </div>`,
};

export default MeetupAgenda;
