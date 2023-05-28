<template>
  <div class="text-center">
    <v-pagination
      v-model="page"
      :length="pageInfo.totalPage"
      :total-visible="7"
      @input="changeVal"
    ></v-pagination>
  </div>
</template>

<script>
export default {
  props: {
    pageInfo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      page: 1,
    };
  },
  methods: {
    changeVal() {
      this.$emit('changePage', this.page);
    },
  },
};
</script>
