<template>
  <div class="pagination-container">
    <slot v-for="(item, index) in itemsOnPage" :item="item" />
  </div>
</template>

<script>
export default {
  name: 'UiPaginationView',

  props: {
    page: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },

    perPage: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },

    items: {
      type: Array,
      required: true,
    },
  },

  computed: {
    itemsOnPage() {
      const startItem = (this.page - 1) * this.perPage;
      const endItem = startItem + this.perPage;

      return this.items.slice(startItem, endItem);
    },
  },
};
</script>

<style></style>
