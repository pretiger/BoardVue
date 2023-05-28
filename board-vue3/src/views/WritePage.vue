<template>
  <div>
    <h1>Board Write Page</h1>
    <v-table style="margin: 10px">
      <tr>
        <th class="text-left" width="10%">Subject</th>
        <td class="text-left" width="90%">
          <v-text-field v-model="inSubject" ref="subject" />
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
          <v-btn color="success" @click="saveBoard">Save</v-btn>
        </td>
      </tr>
    </v-table>
  </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
const store = useStore();
const router = useRouter();
let inSubject = ref(null);
let inContent = ref(null);
let subject = ref(null);
let files = [];
onMounted(() => subject.value.focus());
const saveBoard = () => {
  const formData = new FormData();
  formData.append('subject', inSubject.value);
  formData.append('content', inContent.value);
  formData.append('writer', store.state.user.username);
  files.map((file) => formData.append('files', file));
  fetch('http://localhost/api/board/insert', {
    method: 'post',
    headers: {
      // Authorization: 'Bearer ' + this.$store.state.user.token,
    },
    body: formData,
  }).then((res) => {
    if (res.ok) {
      alert('insert success!');
      router.push({ name: 'home' });
    }
  });
};
</script>
