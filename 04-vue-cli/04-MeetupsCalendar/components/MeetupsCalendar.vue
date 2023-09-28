<template>
  <div class="calendar-view">
    <div class="calendar-view__controls">
      <div class="calendar-view__controls-inner">
        <button
          @click="decMonth"
          class="calendar-view__control-left"
          type="button"
          aria-label="Previous month"
        ></button>
        <div class="calendar-view__date">{{ formatMonthYearName(date) }}</div>
        <button @click="incMonth" class="calendar-view__control-right" type="button" aria-label="Next month"></button>
      </div>
    </div>

    <div class="calendar-view__grid">
      <div
        v-for="item in currentMonth"
        class="calendar-view__cell"
        :class="{ 'calendar-view__cell_inactive': !item.active }"
        tabindex="0"
      >
        <div class="calendar-view__cell-day">{{ item.fulldate.date }}</div>
        <div class="calendar-view__cell-content">
          <a v-for="meetup in item.meetups" :href="`/meetups/${meetup.id}`" class="calendar-event">
            {{ meetup.title }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeetupsCalendar',

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      date: new Date(),
    };
  },

  computed: {
    currentMonth() {
      // Получаем количество дней в текущем месяце
      const currentMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
      const currentMonthDatesCount = currentMonth.getDate();

      // формируем массив объектов дат для текущего месяца
      const datesArrCurrent = [];
      for (let i = 1; i <= currentMonthDatesCount; i++) {
        datesArrCurrent.push({
          fulldate: {
            year: currentMonth.getFullYear(),
            month: currentMonth.getMonth(),
            date: i,
          },
          active: true,
        });
      }

      // проверяем на какой день недели выпадает начало месяца и добавляем к нашему массиву
      const firstDateDayOfWeek = new Date(
        this.date.getFullYear(),
        this.date.getMonth(),
        datesArrCurrent[0].fulldate.date,
      ).getDay();

      const datesArrPrev = [];

      if (firstDateDayOfWeek >= 0) {
        const prevMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
        const prevMonthDatesCount = prevMonth.getDate();
        const prevMonthLastDayOfWeek = prevMonth.getDay();

        for (let i = prevMonthDatesCount; i >= prevMonthDatesCount - (prevMonthLastDayOfWeek - 1); i--) {
          datesArrPrev.push({
            fulldate: {
              year: prevMonth.getFullYear(),
              month: prevMonth.getMonth(),
              date: i,
            },
            active: false,
          });
        }
      }
      datesArrPrev.reverse();

      // проверяем на какой день недели выпадает конец месяца и добавляем к нашему массиву
      const lastDateDayOfWeek = new Date(
        this.date.getFullYear(),
        this.date.getMonth(),
        datesArrCurrent[datesArrCurrent.length - 1].fulldate.date,
      ).getDay();

      const datesArrNext = [];

      if (lastDateDayOfWeek >= 1) {
        const nextMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1);
        // const nextMonthDatesCount = nextMonth.getDate();
        // const nextMonthLastDayOfWeek = nextMonth.getDay();

        for (let i = 1; i <= 7 - lastDateDayOfWeek; i++) {
          datesArrNext.push({
            fulldate: {
              year: nextMonth.getFullYear(),
              month: nextMonth.getMonth(),
              date: i,
            },
            active: false,
          });
        }
      }

      // формируем общий массив
      const datesArr = [...datesArrPrev, ...datesArrCurrent, ...datesArrNext];

      const datesWithMeetups = datesArr.map((item) => {
        const meetups = this.meetups.filter((meetup) => {
          const meetupFullDate = this.formatFullDate(meetup.date);

          return (
            meetupFullDate ==
            `${item.fulldate.date < 10 ? '0' + item.fulldate.date : item.fulldate.date}.${
              item.fulldate.month + 1 < 10 ? '0' + (item.fulldate.month + 1) : item.fulldate.month + 1
            }.${item.fulldate.year}`
          );
        });

        return {
          ...item,
          meetups,
        };
      });

      return datesWithMeetups;
    },
  },

  methods: {
    formatMonthYearName(timestamp) {
      return new Date(timestamp).toLocaleString(navigator.language, {
        year: 'numeric',
        month: 'long',
      });
    },

    formatFullDate(timestamp) {
      return new Date(timestamp).toLocaleString(navigator.language, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    },
    formatAsIsoDate(timestamp) {
      return new Date(timestamp).toISOString().substring(0, 10);
    },

    incMonth() {
      const currentMonth = this.date.getMonth();
      this.date = new Date(this.date.setMonth(currentMonth + 1));
    },

    decMonth() {
      const currentMonth = this.date.getMonth();
      this.date = new Date(this.date.setMonth(currentMonth - 1));
    },
  },
};
</script>

<style scoped>
.calendar-view {
}

.calendar-view__controls {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.calendar-view__controls-inner {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}

.calendar-view__controls-inner button {
  border: none;
  padding: 0;
}

.calendar-view__control-left,
.calendar-view__control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('@/assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.calendar-view__control-left:hover,
.calendar-view__control-right:hover {
  opacity: 0.8;
}

.calendar-view__control-right {
  transform: rotate(180deg);
}

.calendar-view__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.calendar-view__grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.calendar-view__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.calendar-view__cell.calendar-view__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .calendar-view__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .calendar-view__grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .calendar-view__cell {
    height: 144px;
  }

  .calendar-view__cell:nth-child(7n + 1) {
    border-left: none;
  }
}

.calendar-event {
  --max-lines: 2;
  --line-height: 16px;

  display: block;
  text-align: left;
  text-decoration: none;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  line-height: var(--line-height);
  color: var(--white);
  padding: 4px 6px;
  border-radius: 2px;
  background-color: var(--blue);
  margin-top: 4px;
}

@media all and (min-width: 767px) {
  .calendar-event {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: calc(var(--max-lines) * var(--line-height) + 6px);
  }
}
</style>
