<template>
  <DIV class="form-section form-section_inner">
    <button type="button" class="remove-button" @click="$emit('remove')">
      <app-icon icon="trash" />
    </button>

    <form-group>
      <dropdown-button v-model="localAgendaItem.type" title="Тип" :options="$options.agendaItemTypeOptions" />
    </form-group>

    <div class="form__row">
      <div class="form__col">
        <form-group label="Начало">
          <app-input v-model="localAgendaItem.startsAt" type="time" placeholder="00:00" />
        </form-group>
      </div>
      <div class="form__col">
        <form-group label="Окончание">
          <app-input v-model="localAgendaItem.endsAt" type="time" placeholder="00:00" />
        </form-group>
      </div>
    </div>

    <form-group
      v-for="agendaItemField in $options.fieldSpecifications[localAgendaItem.type]"
      :key="agendaItemField.field"
      :label="agendaItemField.title"
    >
      <component
        :is="agendaItemField.component"
        :[agendaItemField.model.prop]="localAgendaItem[agendaItemField.field]"
        v-bind="agendaItemField.props"
        @[agendaItemField.model.event]="localAgendaItem[agendaItemField.field] = $event"
      />
    </form-group>
  </DIV>
</template>

<script>
import AppInput from './AppInput';
import DropdownButton from './DropdownButton';
import AppIcon from './AppIcon';
import FormGroup from './FormGroup';
import {
  getAgendaItemsFieldSpecifications,
  getAgendaItemTypeOptions,
  getAgendaItemLanguageOptions,
} from '../MeetupService';

export default {
  name: 'MeetupAgendaItemForm',

  components: { FormGroup, AppIcon, AppInput, DropdownButton },

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  agendaItemTypeOptions: getAgendaItemTypeOptions(),
  fieldSpecifications: getAgendaItemsFieldSpecifications(),
  languageOptions: getAgendaItemLanguageOptions(),

  data() {
    return {
      localAgendaItem: { ...this.agendaItem },
      agendaItemTypeOptions: getAgendaItemTypeOptions(),
      fieldSpecifications: getAgendaItemsFieldSpecifications(),
      languageOptions: getAgendaItemLanguageOptions(),
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
      this.localAgendaItem.endsAt = `${((Math.floor(newEndTime / 60) + 24) % 24)
        .toString()
        .padStart(2, '0')}:${Math.abs(newEndTime % 60)
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
