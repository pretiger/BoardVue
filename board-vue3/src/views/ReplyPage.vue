<template>
  <div>
    <h1>Board Reply Page</h1>
    <v-table style="margin: 10px">
      <tr>
        <th class="text-left" width="10%">Subject</th>
        <td class="text-left" width="90%">
          <v-text-field v-model="inSubject" />
        </td>
      </tr>
      <tr>
        <th class="text-left">Content</th>
        <td class="text-left">
          <v-textarea name="input-7-1" solo v-model="inContent" />
        </td>
      </tr>
      <tr>
        <th class="text-left">File</th>
        <td class="text-left">
          <v-file-input
            multiple
            label="File input"
            v-model="files"
          ></v-file-input>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <v-btn color="success" @click="replyBoard">Reply</v-btn>
        </td>
      </tr>
    </v-table>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
const store = useStore();
const router = useRouter();
const route = useRoute();
let inSubject = ref(null);
let inContent = ref(null);
let board = ref({});
let files = [];
const getBoard = (num) => {
  fetch('http://localhost/api/board/' + num + '/replyForm/', {
    headers: {
      'Content-Type': 'application/json',
      // Authorization: 'Bearer ' + this.$store.state.user.token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      board.value = data.dto;
      inSubject.value = data.dto.subject;
      inContent.value = data.dto.content;
    });
};
getBoard(route.params.num);
const replyBoard = () => {
  const formData = new FormData();
  formData.append('subject', inSubject.value);
  formData.append('content', inContent.value);
  formData.append('writer', store.state.user.username);
  formData.append('subgroup', board.value.subgroup);
  formData.append('sublevel', board.value.sublevel);
  formData.append('substep', board.value.substep);
  files.map((file) => formData.append('files', file));
  fetch('http://localhost/api/board/reply', {
    method: 'post',
    headers: {
      // Authorization: 'Bearer ' + this.$store.state.user.token,
    },
    body: formData,
  }).then((res) => {
    if (res.ok) {
      alert('reply success!');
      router.push({ name: 'home' });
    }
  });
};
</script>
