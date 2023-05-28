<template>
  <div>
    <h1>Board Detail</h1>
    <v-simple-table>
      <tr>
        <th class="text-left" width="10%">Num</th>
        <td class="text-left" width="40%">{{ board.num }}</td>
        <th class="text-left" width="10%">Writer</th>
        <td class="text-left" width="40%">{{ board.writer }}</td>
      </tr>
      <tr>
        <th class="text-left">Subject</th>
        <td class="text-left" colspan="3">{{ board.subject }}</td>
      </tr>
      <tr>
        <th class="text-left">Content</th>
        <td class="text-left" colspan="3">
          <v-textarea :value="board.content" readonly solo />
        </td>
      </tr>
      <tr>
        <th class="text-left">File</th>
        <td class="text-left">
          <span v-for="(file, idx) in files" :key="idx">
            <a
              href="#"
              style="text-decoration: none"
              @click="() => download(file)"
              >{{ originalName(file) }}
            </a>
            <a
              href="#"
              v-if="$store.state.user.username === board.writer"
              style="color: red"
              @click="() => fileDelete(file)"
              >[delete]</a
            >&nbsp;&nbsp;
          </span>
        </td>
      </tr>
      <tr>
        <td colspan="4">
          <v-btn
            v-if="board.writer === $store.state.user.username"
            color="blue-grey"
            @click="
              $router.push({ name: 'UpdatePage', params: { num: board.num } })
            "
            >UPDATE</v-btn
          >
          <v-btn
            color="error"
            @click="deleteBoard"
            v-if="board.writer === $store.state.user.username"
            >DELETE</v-btn
          >
          <v-btn
            v-if="$store.state.user.username !== null"
            color="success"
            @click="
              $router.push({ name: 'ReplyPage', params: { num: board.num } })
            "
            >REPLY</v-btn
          >
        </td>
      </tr>
    </v-simple-table>
    <v-row align="center" class="a" v-if="$store.state.user.username !== null">
      <v-text-field label="comment" v-model="inComment" />
      <v-btn color="success" x-small @click="saveComment">SAVE</v-btn>
    </v-row>
    <CommentList :comments="comments" @getComment="getComment" />
  </div>
</template>

<script>
import CommentList from '@/components/CommentList.vue';
export default {
  components: { CommentList },
  created() {
    fetch('http://localhost/api/detailForm/' + this.$route.params.num)
      .then((res) => res.json())
      .then((data) => {
        this.board = data;
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
    this.getComment(this.$route.params.num);
  },
  data() {
    return {
      board: {},
      inComment: null,
      comments: [],
      files: [],
    };
  },
  methods: {
    fileDelete(filename) {
      fetch('http://localhost/api/board/deleteFile/?filename=' + filename).then(
        (res) => {
          if (res.ok) {
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
          }
        }
      );
    },
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
    deleteBoard() {
      console.log('deleteBoard num : ', this.board.num);
      if (confirm('삭제하시겠습니까?')) {
        fetch('http://localhost/api/board/delete/', {
          method: 'delete',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            num: this.board.num,
            count: this.board.count,
          }),
        }).then((res) => {
          if (res.ok) {
            alert('삭제완료');
            this.$router.push({ name: 'BoardListPage' });
          }
        });
      }
    },
    getComment(num) {
      fetch('http://localhost/api/commentList/' + num)
        .then((res) => res.json())
        .then((data) => {
          this.comments = data;
        });
    },
    saveComment() {
      fetch('http://localhost/board/api/comment', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bnum: this.board.num,
          replytext: this.inComment,
          replyer: this.$store.getters.getUsername,
        }),
      }).then((res) => {
        if (res.ok) {
          this.inComment = '';
          this.getComment(this.board.num);
        }
      });
    },
  },
};
</script>

<style scoped>
.a {
  margin: 10px;
}
</style>
