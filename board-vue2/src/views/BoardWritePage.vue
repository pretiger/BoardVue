<template>
  <div>
    <h1>Board Write Page</h1>
    <v-simple-table style="margin: 10px">
      <tr>
        <th class="text-left" width="10%">Subject</th>
        <td class="text-left" width="90%">
          <v-text-field v-model="inSubject" ref="pass" />
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
      <tr></tr>
      <tr>
        <td colspan="2">
          <v-btn color="success" @click="saveBoard">Save</v-btn>
        </td>
      </tr>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      board: {},
      inSubject: null,
      inContent: null,
      comments: [],
      files: [],
      pass: null,
    };
  },
  mounted() {
    this.$refs.pass.focus();
  },
  methods: {
    data() {
      return {
        files: [],
      };
    },
    saveBoard() {
      const formData = new FormData();
      formData.append('subject', this.inSubject);
      formData.append('content', this.inContent);
      formData.append('writer', this.$store.state.user.username);
      this.files.map((file) => formData.append('files', file));
      fetch('http://localhost/api/board/insert', {
        method: 'post',
        headers: {
          //        Authorization: 'Bearer ' + user.token,
        },
        body: formData,
      }).then((res) => {
        if (res.ok) {
          alert('insert success!');
          this.$router.push({ name: 'BoardListPage' });
        }
      });
    },
  },
};
</script>

<style></style>
