<template>
  <div>
    <h1>Board Detail Update</h1>
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
      files2: [],
    };
  },
  created() {
    fetch('http://localhost/api/detailForm/' + this.$route.params.num)
      .then((res) => res.json())
      .then((data) => {
        this.board = data;
        this.inSubject = data.subject;
        this.inContent = data.content;
        fetch(
          'http://localhost/api/board/attachList/' + this.$route.params.num,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
          .then((res) => res.json())
          .then((data) => (this.files = data));
      });
  },
  methods: {
    download(filename) {
      fetch('http://localhost/api/board/downloadFile/?filename=' + filename)
        .then((res) => res.blob())
        .then((data) => {
          let a = document.createElement('a');
          a.href = window.URL.createObjectURL(data);
          a.download = this.originalName(filename);
          a.click();
        });
    },
    originalName(filename) {
      return filename.substr(filename.lastIndexOf('_') + 1);
    },
    updateBoard() {
      console.log(this.inSubject, this.inContent);
      const formData = new FormData();
      formData.append('num', this.board.num);
      formData.append('subject', this.inSubject);
      formData.append('content', this.inContent);
      this.files2.map((file) => formData.append('files', file));
      fetch('http://localhost/api/board/update', {
        method: 'put',
        headers: {
          //        Authorization: 'Bearer ' + user.token,
        },
        body: formData,
      }).then((res) => {
        if (res.ok) {
          alert('update success!');
          this.$router.push({
            name: 'BoardDetailPage',
            params: { num: this.board.num },
          });
        }
      });
    },
  },
};
</script>

<style></style>
