<template>
  <form class="form meetup-form" @submit.prevent="submit">
    <div class="meetup-form__content">
      <fieldset class="form-section">
        <div class="form-group">
          <label>Название</label>
          <app-input v-model="localMeetup.title" />
        </div>
        <div class="form-group">
          <label>Дата</label>
          <date-input v-model="localMeetup.date" type="date" />
        </div>
        <div class="form-group">
          <label>Место</label>
          <app-input v-model="localMeetup.place" />
        </div>
        <div class="form-group">
          <label>Описание</label>
          <app-input v-model="localMeetup.description" multiline rows="3" />
        </div>
        <div class="form-group">
          <label>Изображение</label>
          <image-uploader v-model="localMeetup.imageId" />
        </div>
      </fieldset>

      <h3 class="form__section-title">Программа</h3>
      <meetup-agenda-item-form
        v-for="(agendaItem, index) in localMeetup.agenda"
        :key="agendaItem.id"
        class="mb-3"
        :agenda-item="agendaItem"
        @update:agendaItem="updateAgendaItem(index, $event)"
        @remove="removeAgendaItem(index)"
      />

      <div class="form-section_append">
        <button type="button" data-test="addAgendaItem" @click="addAgendaItem">+ Добавить этап программы</button>
      </div>
    </div>

    <div class="meetup-form__aside">
      <div class="meetup-form__aside_stick">
        <!-- data-test атрибуты используются для поиска нужного элемента в тестах, не удаляйте их -->
        <button class="button button_secondary button_block" type="button" data-test="cancel" @click="$emit('cancel')">
          Отмена
        </button>
        <button class="button button_primary button_block" type="submit" data-test="submit">{{ submitText }}</button>
      </div>
    </div>
  </form>
</template>

<script>
import MeetupAgendaItemForm from './MeetupAgendaItemForm.vue';
import AppInput from './AppInput';
import ImageUploader from './ImageUploader';
import DateInput from './DateInput';

let lastId = -1;
function createAgendaItem() {
  return {
    id: lastId--,
    startsAt: '00:00',
    endsAt: '00:00',
    type: 'other',
    title: null,
    description: null,
    speaker: null,
    language: null,
  };
}

export default {
  name: 'MeetupForm',

  components: {
    ImageUploader,
    MeetupAgendaItemForm,
    AppInput,
    DateInput,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },

    submitText: String,
  },

  data() {
    return {
      localMeetup: this.meetup,
    };
  },

  methods: {
    addAgendaItem() {
      let item;
      if (this.localMeetup.agenda.length > 0) {
        item = {
          ...createAgendaItem(),
          startsAt: this.localMeetup.agenda[this.localMeetup.agenda.length - 1].endsAt,
        };
      } else item = createAgendaItem();
      this.localMeetup.agenda.push(item);
    },

    updateAgendaItem(index, updatedItem) {
      this.localMeetup.agenda.splice(index, 1, updatedItem);
    },

    removeAgendaItem(index) {
      this.localMeetup.agenda.splice(index, 1);
    },

    submit() {
      this.$emit('submit', this.localMeetup);
    },
  },
};
</script>

<style scoped>
.meetup-form__aside {
  margin: 48px 0;
}

.meetup-form__aside_stick > .button {
  margin: 0 0 12px 0;
}

@media all and (min-width: 992px) {
  .meetup-form {
    display: flex;
    flex-direction: row;
  }

  .meetup-form__content {
    flex: 1 0 calc(100% - 320px);
  }

  .meetup-form__aside {
    flex: 1 0 320px;
    max-width: 320px;
    width: 100%;
    padding-left: 137px;
    margin: 0;
  }

  .meetup-form__aside_stick {
    position: sticky;
    top: 32px;
  }
}
</style>
