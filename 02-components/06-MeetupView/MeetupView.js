import MeetupCover from './MeetupCover.js';
import MeetupDescription from './MeetupDescription.js';
import MeetupAgenda from './MeetupAgenda.js';
import MeetupInfo from './MeetupInfo.js';
import { getImageUrlByImageId } from './data.js';

const MeetupView = {
  name: 'MeetupView',

  components:{
    MeetupCover,
    MeetupDescription,
    MeetupAgenda,
    MeetupInfo,
  },

  props:{
    meetup:{
      type: Object,
      required: true,
    },
  },

  computed:{
    bg(){
      return this.meetup.imageId ? getImageUrlByImageId(this.meetup.imageId) : null;
    },
    dt(){
      return new Date(this.meetup.date);
    }
  },

  template: `
    <div>
      <meetup-cover :title="meetup.title" :link="bg"/>
      <div class="container">
        <div class="meetup">
          <div class="meetup__content">
            <h3>Описание</h3>
            <meetup-description :description="meetup.description"/>

            <h3>Программа</h3>
            <meetup-agenda :agenda="meetup.agenda"/>

          </div>
          <div class="meetup__aside">
            <meetup-info :organizer="meetup.organizer" :place="meetup.place" :date="dt"/>
          </div>
        </div>
      </div>
    </div>`,
};

export default MeetupView;
