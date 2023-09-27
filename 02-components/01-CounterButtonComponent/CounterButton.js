import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'CounterButton',

  // Компонент должен иметь входной параметр и порождать событие
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
  emits: ['update:count'],

  methods: {
    incCount(value) {
      let incValue = value + 1;
      this.$emit('update:count', incValue);
    },
  },

  template: `<button type="button" @click="incCount(count)">{{ count }}</button>`,
});
