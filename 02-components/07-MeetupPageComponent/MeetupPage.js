import MeetupView from './MeetupView.js';
import { MEETUP_ID, fetchMeetup } from './data.js';

const MeetupPage = {
  name: 'MeetupPage',

  components: {
    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
      default: MEETUP_ID,
    },
  },

  data() {
    return {
      meetup: null,
    };
  },

  created() {
    fetchMeetup(this.meetupId).then((data) => {
      this.meetup = data;
    });
  },

  template: `
    <div v-if="meetup">
      <meetup-view :meetup="meetup"/>
    </div>`,
};

export default MeetupPage;
