<template>
  <div class="button-group" role="group">
    <slot />
    <!-- Эти кнопки должны передаваться через слот -->
    <!-- <button class="button-group__button button-group__button_active" type="button" aria-selected="true">Button1</button>
    <button class="button-group__button" type="button" aria-selected="false">Button2</button>
    <button class="button-group__button" type="button" aria-selected="false">Button3</button> -->
    <!-- Эти кнопки должны передаваться через слот -->
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'UiButtonGroup',

  props: {
    modelValue: {
      required: true,
    },
  },

  provide() {
    return {
      modelValue: computed(() => this.modelValue),
      setModelValue: this.setModelValue,
    };
  },

  emits: ['update:modelValue'],

  methods: {
    setModelValue(value) {
      this.$emit('update:modelValue', value);
    },
  },
};
</script>

<style scoped>
.button-group {
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  white-space: nowrap;
}
</style>
