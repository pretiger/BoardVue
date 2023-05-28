<template>
  <div>
    <h1>Board Detail Update</h1>
    <v-table>
      <tr>
        <th class="text-left" width="10%">Num</th>
        <td class="text-left" width="40%">{{ board.num }}</td>
        <th class="text-left" width="10%">Writer</th>
        <td class="text-left" width="40%">{{ board.writer }}</td>
      </tr>
      <tr>
        <th class="text-left">Subject</th>
        <td class="text-left" colspan="3">
          <v-text-field v-model="inSubject" />
        </td>
      </tr>
      <tr>
        <th class="text-left">Content</th>
        <td class="text-left" colspan="3">
          <v-textarea name="input-7-1" solo v-model="inContent" />
        </td>
      </tr>
      <tr>
        <th class="text-left" rowspan="2">File</th>
        <td class="text-left" colspan="3">
          <a
            v-for="(file, idx) in files"
            :key="idx"
            href="#"
            style="text-decoration: none"
            @click="() => download(file)"
            >{{ originalName(file) }}&nbsp;&nbsp;</a
          >
        </td>
      </tr>
      <tr>
        <td class="text-left" colspan="3">
          <v-file-input
            multiple
            label="File input"
            v-model="files2"
          ></v-file-input>
        </td>
      </tr>
      <tr>
        <v-btn color="success" @click="updateBoard">UPDATE</v-btn>
      </tr>
    </v-table>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref } from 'vue';
const router = useRouter();
const route = useRoute();
let board = ref({});
let inSubject = ref(null);
let inContent = ref(null);
let files = [];
let files2 = [];
const initLoad = (num) => {
  fetch('http://localhost/api/detailForm/' + num, {
    headers: {
      'Content-Type': 'application/json',
      // Authorization: 'Bearer ' + this.$store.state.user.token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      board.value = data;
      inSubject.value = data.subject;
      inContent.value = data.content;
      fetch('http://localhost/api/board/attachList/' + num, {
        headers: {
          'Content-Type': 'application/json',
          // Authorization: 'Bearer ' + this.$store.state.user.token,
        },
      })
        .then((res) => res.json())
        .then((data) => (files = data));
    });
};
initLoad(route.params.num);
const originalName = (filename) => {
  return filename.substr(filename.lastIndexOf('_') + 1);
};
const download = (filename) => {
  fetch('http://localhost/api/board/downloadFile/?filename=' + filename, {
    headers: {
      // Authorization: 'Bearer ' + this.$store.state.user.token,
    },
  })
    .then((res) => res.blob())
    .then((data) => {
      let a = document.createElement('a');
      a.href = window.URL.createObjectURL(data);
      a.download = originalName(filename);
      a.click();
    });
};
const updateBoard = () => {
  console.log(inSubject.value, inContent.value);
  const formData = new FormData();
  formData.append('num', board.value.num);
  formData.append('subject', inSubject.value);
  formData.append('content', inContent.value);
  files2.map((file) => formData.append('files', file));
  fetch('http://localhost/api/board/update', {
    method: 'put',
    headers: {
      // Authorization: 'Bearer ' + this.$store.state.user.token,
    },
    body: formData,
  }).then((res) => {
    if (res.ok) {
      alert('update success!');
      router.push({
        name: 'detail',
        params: { num: board.value.num },
      });
    }
  });
};
</script>
