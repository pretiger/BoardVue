<template>
  <div>
    <h1>Board List</h1>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Num</th>
            <th class="text-left">Writer</th>
            <th class="text-left">Subject</th>
            <th class="text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          <BoardList v-for="board in boards" :key="board.num" :board="board" />
        </tbody>
      </template>
    </v-simple-table>
    <Pagenation :pageInfo="pageInfo" @changePage="changePage" />
  </div>
</template>

<script>
import Pagenation from '@/components/PagenationView.vue';
import BoardList from '@/components/BoardList.vue';
export default {
  components: { Pagenation, BoardList },
  data() {
    return {
      boards: [],
      pageInfo: {},
    };
  },
  created() {
    this.changePage(1);
  },
  methods: {
    changePage(changeVal) {
      fetch('http://localhost/?curPage=' + changeVal)
        .then((res) => res.json())
        .then((data) => {
          this.boards = data.dto;
          this.pageInfo = data.page;
        });
    },
  },
};
</script>

<style></style>
