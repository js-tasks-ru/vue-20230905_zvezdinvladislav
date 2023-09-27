import { defineComponent } from '../vendor/vue.esm-browser.js';
import MeetupView from './MeetupView.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from '../meetupService.js';

const Status = {
  DEFAULT: 'DEFAULT',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

export default defineComponent({
  name: 'PageMeetup',

  Status,

  components: {
    MeetupView,
    UiAlert,
    UiContainer,
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      status: Status.DEFAULT,
      meetup: null,
      error: null,
    };
  },

  watch: {
    meetupId() {
      this.fetchMeetup();
    },
  },

  mounted() {
    this.fetchMeetup();
  },

  methods: {
    async fetchMeetup() {
      this.status = Status.LOADING;
      this.meetup = null;
      this.error = null;

      try {
        this.meetup = await fetchMeetupById(this.meetupId);
        this.status = Status.SUCCESS;
      } catch (error) {
        this.status = Status.ERROR;
        this.error = error.message;
      }
    },
  },

  template: `
    <div class="page-meetup">
      <!-- meetup view -->
      <MeetupView :meetup="meetup" v-if="status === $options.Status.SUCCESS"/>

      <UiContainer v-if="status === $options.Status.LOADING">
        <UiAlert>Загрузка...</UiAlert>
      </UiContainer>

      <UiContainer v-if="status === $options.Status.ERROR">
        <UiAlert>{{ error }}</UiAlert>
      </UiContainer>
    </div>`,
});
