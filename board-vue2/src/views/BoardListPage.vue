<template>
  <div>
    <h1>Board List</h1>
    <v-row align="center">
      <v-col class="d-flex" cols="2">
        <v-select
          v-model="search"
          :items="items"
          label="Select Keyword"
          dense
          outlined
        ></v-select>
      </v-col>
      <v-col class="d-flex" cols="6">
        <v-text-field v-model="keyword" />
      </v-col>
      <v-col class="d-flex" cols="2">
        <v-btn depressed color="primary" @click="searchItem"> Search </v-btn>
      </v-col>
    </v-row>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left" style="font-size: 18px">Num</th>
            <th class="text-left" style="font-size: 18px">Writer</th>
            <th class="text-left" style="font-size: 18px">Subject</th>
            <th class="text-left" style="font-size: 18px">Date</th>
          </tr>
        </thead>
        <tbody>
          <BoardList v-for="board in boards" :key="board.num" :board="board" />
        </tbody>
      </template>
    </v-simple-table>
    <v-pagination
      v-model="page"
      :length="pageInfo.totalPage"
      :total-visible="7"
      @input="changeVal"
    ></v-pagination>
  </div>
</template>

<script>
import BoardList from '@/components/BoardList.vue';
export default {
  components: { BoardList },
  data() {
    return {
      boards: [],
      pageInfo: {},
      items: ['ALL', 'Writer', 'Subject', 'Content'],
      search: 'ALL',
      keyword: '',
      page: 1,
    };
  },
  created() {
    this.changePage(1, '', '');
  },
  methods: {
    changePage(num, search, keyword) {
      fetch(
        'http://localhost/?curPage=' +
          num +
          '&searchkey=' +
          search +
          '&keyword=' +
          keyword
      )
        .then((res) => res.json())
        .then((data) => {
          this.boards = data.list;
          this.pageInfo = data.page;
        });
    },
    searchItem() {
      this.changePage(1, this.search, this.keyword);
    },
    changeVal() {
      this.changePage(this.page, this.search, this.keyword);
    },
  },
};
</script>

<style></style>
