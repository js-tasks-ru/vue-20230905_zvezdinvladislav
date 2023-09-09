import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение
const App = defineComponent({
  name: 'App',
  data() {
    return {
      firstArg: null,
      secondArg: null,
      action: null,
    };
  },

  computed: {
    result() {
      switch (this.action) {
        case 'sum':
          return this.firstArg + this.secondArg;
          break;
        case 'subtract':
          return this.firstArg - this.secondArg;
          break;
        case 'multiply':
          return this.firstArg * this.secondArg;
          break;
        case 'divide':
          return this.firstArg / this.secondArg;
          break;
      }
    },
  },
});

const app = createApp(App);
const vm = app.mount('#app');

window.vm = vm;
