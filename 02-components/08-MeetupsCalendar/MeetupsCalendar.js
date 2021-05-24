/*
  Полезные функции по работе с датой можно описать вне Vue компонента
 */
import {getLocalMY, makeMonthDaysArr} from './date.js'

const MeetupsCalendar = {
  name: 'MeetupsCalendar',

  props:{
    meetups:{
      type: Array,
      required: true,
    },
  },

  data(){
    return {
      date: new Date(),
    }
  },

  computed:{
    dateString(){
      return getLocalMY(this.date)
    },
    daysArr(){
      return makeMonthDaysArr(this.date).sort((a, b) => a.date.valueOf() - b.date.valueOf()).map((dt) => {
        return {
          ...dt,
          val: dt.date.valueOf(),
          dayOfWeek: dt.date.getDay(),
          dayOfMonth: dt.date.getDate(),
          class: dt.inactive ? "rangepicker__cell rangepicker__cell_inactive" : "rangepicker__cell",
          meetups: this.meetups.filter(
            (meetup) => new Date(
              new Date(meetup.date).getUTCFullYear(), 
              new Date(meetup.date).getUTCMonth(), 
              new Date(meetup.date).getUTCDate(), 
              new Date(meetup.date).getUTCHours()+ new Date().getTimezoneOffset()/60
            ).valueOf() === new Date(
              new Date(dt.date).getUTCFullYear(), 
              new Date(dt.date).getUTCMonth(), 
              new Date(dt.date).getUTCDate(), 
              new Date(dt.date).getUTCHours()
            ).valueOf())
        };
      })
    },
  },

  methods:{
    changeMonth(num){
      this.date = new Date(this.date.getFullYear(), this.date.getMonth() + num, 1)
    },

  },

  template: `
  <div class="rangepicker">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button class="rangepicker__selector-control-left" @click="changeMonth(-1)"></button>
          <div>{{dateString}}</div>
          <button class="rangepicker__selector-control-right" @click="changeMonth(1)"></button>
        </div>
      </div>
      <div class="rangepicker__date-grid">
        <div v-for="dt in daysArr" :class="dt.class">
          {{ dt.dayOfMonth }}
          <a v-for="meetup in dt.meetups" class="rangepicker__event">{{meetup.title}}</a>
        </div>
      </div>
    </div>
  </div>`,
};

export default MeetupsCalendar;