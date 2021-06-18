<template>
  <app-input v-model="refinedDT" v-bind="$attrs" :type="type">
    <template v-for="slotName of Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>
  </app-input>
</template>

<script>
import AppInput from './AppInput';
import moment from 'moment';

export default {
  name: 'DateInput',

  components: { AppInput },

  inheritAttrs: false,

  model: {
    prop: 'value',
    event: 'change',
  },

  props: {
    type: {
      type: String,
      default: 'date',
      validator: (val) => {
        return ['date', 'time', 'datetime-local'].includes(val);
      },
    },

    value: [String, Date, Number],
  },

  computed: {
    refinedDT: {
      get() {
        const valType = typeof this.value;
        if (valType === 'object' || valType === 'number') {
          switch (this.type) {
            case 'date':
              return new Date(this.value).toISOString().split('T')[0];
            case 'time':
              if (this.$attrs.step) {
                if (this.$attrs.step % 60 == 0) {
                  return new Date(this.value).toISOString().split('T')[1].slice(0, 5);
                } else {
                  return new Date(this.value).toISOString().split('T')[1].slice(0, 8);
                }
              } else {
                return new Date(this.value).toISOString().split('T')[1].slice(0, 5);
              }
            case 'datetime-local':
              return new Date(this.value).toISOString().slice(0, 16);
            default:
              break;
          }
        } else if (valType === 'string') {
          return this.value;
        }
        return null;
      },

      set(val) {
        let refinedVal = val;
        if (this.isValid(val)) {
          refinedVal = this.transformDT(val);
        } else {
          refinedVal = null;
        }
        this.val = refinedVal;
        this.$emit('change', refinedVal);
      },
    },
  },

  methods: {
    isValid(val) {
      switch (this.type) {
        case 'date':
          return moment(val, 'yyyy-mm-dd').isValid();
        case 'time':
          return moment(val, 'hh:mm').isValid() || moment(val, 'hh:mm:ss').isValid();
        case 'datetime-local':
          return moment(val, moment.ISO_8601).isValid();
        default:
          return false;
      }
    },

    transformDT(val) {
      let refinedVal = val;
      if (this.type === 'datetime-local') {
        refinedVal = new Date(refinedVal);
        refinedVal = new Date(
          refinedVal.setHours(refinedVal.getHours() - refinedVal.getTimezoneOffset() / 60, refinedVal.getMinutes()),
        );
      }
      if (this.type === 'time') {
        const hour = val.split(':')[0];
        const minute = val.split(':')[1];
        const tzOffset = new Date(this.value).getTimezoneOffset() / 60;
        if (val.length === 5) {
          refinedVal = new Date(this.value);
          refinedVal = new Date(refinedVal.setHours(hour - tzOffset, minute));
        } else if (val.length === 8) {
          const second = val.split(':')[2];
          refinedVal = new Date(this.value);
          refinedVal = new Date(refinedVal.setHours(hour - tzOffset, minute, second));
        }
      }
      if (typeof this.value === 'number') {
        refinedVal = new Date(refinedVal).getTime();
      } else if (typeof this.value === 'object') {
        refinedVal = new Date(refinedVal);
      }
      return refinedVal;
    },
  },
};
</script>
