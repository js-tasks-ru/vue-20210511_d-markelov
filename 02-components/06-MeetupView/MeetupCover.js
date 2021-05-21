const MeetupCover = {
  name: 'MeetupCover',

  props:{
    title:{
      type: String,
    },
    link:{
      type: String,
    },
  },

  computed:{
    bgLink(){
      return this.link ? `--bg-url: url('${this.link}')` : '';
    }
  },

  template: `
    <div class="meetup-cover" :style="bgLink">
        <h1 class="meetup-cover__title">{{title}}</h1>
    </div>`,
};

export default MeetupCover;
