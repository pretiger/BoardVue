<template>
  <div class="text-center">
    <!-- {{ select }} {{ keyword }} -->
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
    // select: {
    //   type: String,
    //   required: true,
    // },
    // keyword: {
    //   type: String,
    //   required: true,
    // },
  },
  data() {
    return {
      page: 1,
    };
  },
  methods: {
    changeVal() {
      // console.log(
      //   '11111111page',
      //   this.page,
      //   'keyword',
      //   this.keyword,
      //   'search',
      //   this.search
      // );
      this.$emit('changePage', this.page, '', '');
      // this.$emit('changePage', this.page, this.search, this.keyword);
    },
  },
};
</script>
