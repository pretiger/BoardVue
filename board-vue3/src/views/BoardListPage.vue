<template>
  <v-row>
    <v-col cols="12" style="text-align: center">
      <h1>Board List</h1>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="2">
      <v-select
        v-model="keyword"
        label="Search Key Select"
        :items="items"
        item-title=""
        variant="outlined"
      />
    </v-col>
    <v-col cols="8">
      <v-text-field type="text" v-model="search" />
    </v-col>
    <v-col align-self="center">
      <v-btn type="button" color="blue" @click="searchItem">Search</v-btn>
    </v-col>
  </v-row>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">Number</th>
        <th class="text-left">Writer</th>
        <th class="text-left">Subject</th>
        <th class="text-left">Regdate</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="board in boards" :key="board.num">
        <BoardList :board="board" />
      </tr>
    </tbody>
  </v-table>
  <div class="text-center">
    <v-pagination
      v-model="pageInfo.curPage"
      :length="pageInfo.totalPage"
      :total-visible="5"
      @click="() => changePage(pageInfo.curPage, keyword, search)"
    ></v-pagination>
  </div>
</template>
<script setup>
import BoardList from '@/components/BoardList.vue';
import { ref } from 'vue';
let boards = ref([]);
let pageInfo = ref({});
let items = ['ALL', 'Writer', 'Subject', 'Content'];
let keyword = ref('ALL');
let search = ref('');
const getPage = (num, search, keyword) => {
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
      console.log(data);
      boards.value = data.list;
      pageInfo.value = data.page;
    });
};
getPage(1, '', '');
const changePage = (num, keyword, search) => getPage(num, keyword, search);
const searchItem = () => {
  console.log(keyword.value, search.value);
  changePage(1, keyword.value, search.value);
};
</script>
