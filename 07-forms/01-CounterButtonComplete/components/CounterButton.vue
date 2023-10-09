<template>
  <button @click="incCount">{{ localCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      localCount: undefined,
    };
  },

  emits: ['update:count', 'updateLocal'],

  watch: {
    count: {
      immediate: true,
      handler() {
        this.localCount = this.count;
      },
    },

    localCount: {
      handler() {
        this.$emit('update:count', this.localCount);
      },
    },
  },

  methods: {
    incCount() {
      this.localCount++;
      this.$emit('updateLocal', this.localCount);
    },
  },
};
</script>
