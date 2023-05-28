<template>
  <tr>
    <td>{{ board.num }}</td>
    <td>{{ board.writer }}</td>
    <td>
      <span v-if="board.sublevel > 0">
        <span v-for="idx in board.sublevel" :key="idx"
          >&nbsp;&nbsp;&nbsp;&nbsp;</span
        ></span
      >
      <router-link
        :to="{ name: 'BoardDetailPage', params: { num: board.num } }"
        >{{ board.subject }}</router-link
      ><span v-if="board.count > 0" style="color: red"
        >[{{ board.count }}]</span
      >
    </td>
    <td>{{ dateFormat(board.regdate) }}</td>
  </tr>
</template>

<script>
export default {
  props: {
    board: {
      type: Object,
      required: true,
    },
  },
  methods: {
    dateFormat(value) {
      if (value == '') return '';
      let today = new Date(value);
      let year = today.getFullYear();
      let month = today.getMonth() + 1;
      let day = today.getDate();
      let hours = ('0' + today.getHours()).slice(-2);
      let minutes = ('0' + today.getMinutes()).slice(-2);
      let seconds = ('0' + today.getSeconds()).slice(-2);
      let timeString = hours + ':' + minutes + ':' + seconds;
      if (month < 10) {
        month = '0' + month;
      }
      if (day < 10) {
        day = '0' + day;
      }
      return year + '-' + month + '-' + day + ' ' + timeString;
    },
  },
};
</script>

<style></style>
