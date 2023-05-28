<template>
  <div>
    <h1>Board Detail Reply</h1>
    <v-simple-table>
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
        <td colspan="4">
          <v-btn color="success" @click="replyBoard">Reply</v-btn>
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
    };
  },
  created() {
    fetch(
      'http://localhost/api/board/' + this.$route.params.num + '/replyForm/',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.$store.state.user.token,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(1, data);
        this.board = data.dto;
        this.inSubject = data.dto.subject;
        this.inContent = data.dto.content;
      });
  },
  methods: {
    replyBoard() {
      console.log(this.board);
      const formData = new FormData();
      formData.append('subject', this.inSubject);
      formData.append('content', this.inContent);
      formData.append('writer', this.$store.state.user.username);
      formData.append('subgroup', this.board.subgroup);
      formData.append('sublevel', this.board.sublevel);
      formData.append('substep', this.board.substep);
      this.files.map((file) => formData.append('files', file));
      fetch('http://localhost/api/board/reply', {
        method: 'post',
        headers: {
          Authorization: 'Bearer ' + this.$store.state.user.token,
        },
        body: formData,
      }).then((res) => {
        if (res.ok) {
          alert('reply success!');
          this.$router.push({ name: 'BoardListPage' });
        }
      });
    },
  },
};
</script>

<style></style>
