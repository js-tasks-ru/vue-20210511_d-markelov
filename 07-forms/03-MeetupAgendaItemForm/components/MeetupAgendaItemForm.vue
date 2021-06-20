<template>
  <div class="form-section form-section_inner">
    <button type="button" class="remove-button" @click="$emit('remove')">
      <app-icon icon="trash" />
    </button>

    <form-group>
      <select v-model="localAgendaItem.type" class="form-control" title="Тип">
        <option v-for="type in agendaItemTypes" :key="type.value" :value="type.value">{{ type.text }}</option>
      </select>
    </form-group>

    <form-group inline label="Начало">
      <date-input v-model="localAgendaItem.startsAt" type="time" placeholder="00:00" />
    </form-group>
    <form-group inline label="Окончание">
      <date-input v-model="localAgendaItem.endsAt" type="time" placeholder="00:00" />
    </form-group>

    <form-group :label="titleLabel">
      <app-input v-model="localAgendaItem.title" />
    </form-group>

    <form-group v-if="localAgendaItem.type === 'talk'" label="Докладчик">
      <app-input v-model="localAgendaItem.speaker" />
    </form-group>

    <form-group v-if="['talk', 'other'].includes(localAgendaItem.type)" label="Описание">
      <app-input v-model="localAgendaItem.description" multiline />
    </form-group>

    <form-group v-if="localAgendaItem.type === 'talk'" label="Язык">
      <select v-model="localAgendaItem.language" class="form-control">
        <option v-for="lang in talkLanguages" :key="lang.value" :value="lang.value">{{ lang.text }}</option>
      </select>
    </form-group>
  </div>
</template>

<script>
import AppIcon from './AppIcon';
import AppInput from './AppInput';
import DateInput from './DateInput';
import FormGroup from './FormGroup';

const getAgendaItemTypes = () => [
  { value: 'registration', text: 'Регистрация' },
  { value: 'opening', text: 'Открытие' },
  { value: 'break', text: 'Перерыв' },
  { value: 'coffee', text: 'Coffee Break' },
  { value: 'closing', text: 'Закрытие' },
  { value: 'afterparty', text: 'Afterparty' },
  { value: 'talk', text: 'Доклад' },
  { value: 'other', text: 'Другое' },
];

const getTalkLanguages = () => [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

export default {
  name: 'MeetupAgendaItemForm',

  components: { AppIcon, FormGroup, AppInput, DateInput },

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      localAgendaItem: { ...this.agendaItem },
      agendaItemTypes: getAgendaItemTypes(),
      talkLanguages: getTalkLanguages(),
      tmp: null,
    };
  },

  computed: {
    titleLabel() {
      return this.localAgendaItem.type === 'talk'
        ? 'Тема'
        : this.localAgendaItem.type === 'other'
        ? 'Заголовок'
        : 'Нестандартный текст (необязательно)';
    },

    startsAt() {
      return this.localAgendaItem.startsAt;
    },
  },

  watch: {
    localAgendaItem: {
      deep: true,
      handler: function (newVal) {
        if (JSON.stringify(newVal) !== JSON.stringify(this.agendaItem)) {
          this.$emit('update:agendaItem', newVal);
        }
      },
    },

    startsAt: function (newVal, oldVal) {
      const newStartTime = this.getIntHH(newVal) * 60 + this.getIntMM(newVal);
      const oldStartTime = this.getIntHH(oldVal) * 60 + this.getIntMM(oldVal);
      const startDiff = newStartTime - oldStartTime;
      const oldEndTime = this.getIntHH(this.localAgendaItem.endsAt) * 60 + this.getIntMM(this.localAgendaItem.endsAt);
      const newEndTime = oldEndTime + startDiff;
      this.localAgendaItem.endsAt = `${((Math.floor(newEndTime / 60) + 24) % 24).toString().padStart(2, '0')}:${(
        newEndTime % 60
      )
        .toString()
        .padStart(2, '0')}`;
    },
  },

  methods: {
    getIntHH(val) {
      return Number.parseInt(val.split(':')[0]);
    },

    getIntMM(val) {
      return Number.parseInt(val.split(':')[1]);
    },
  },
};
</script>

<style></style>
