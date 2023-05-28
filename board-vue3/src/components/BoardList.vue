<template>
  <td>{{ props.board.num }}</td>
  <td>{{ props.board.writer }}</td>
  <td>
    <span v-if="props.board.sublevel > 0">
      <span v-for="(sub, idx) in props.board.sublevel" :key="idx"
        >&nbsp;&nbsp;&nbsp;&nbsp;</span
      > </span
    ><router-link :to="{ name: 'detail', params: { num: props.board.num } }">{{
      props.board.subject
    }}</router-link>
    <span style="color: red" v-if="props.board.count > 0"
      >[{{ props.board.count }}]</span
    >
  </td>
  <td>{{ dateFormat(props.board.regdate) }}</td>
</template>
<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  board: {
    type: Object,
    required: true,
  },
});
const dateFormat = (value) => {
  if (value === '') return '';
  let today = new Date(value);
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();
  let hours = ('0' + today.getHours()).slice(-2);
  let minutes = ('0' + today.getMinutes()).slice(-2);
  let seconds = ('0' + today.getSeconds()).slice(-2);
  let timeString = hours + ':' + minutes + ':' + seconds;
  if (month < 10) month = '0' + month;
  if (day < 10) day = '0' + day;
  return year + '/' + month + '/' + day + ' ' + timeString;
};
</script>
