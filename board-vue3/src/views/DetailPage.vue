<template>
  <div>
    <h1>Board Detail</h1>
    <v-sheet style="margin: 20px">
      <v-table>
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
                v-if="store.state.user.username === board.writer"
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
              v-if="board.writer === store.state.user.username"
              color="blue-grey"
              @click="
                router.push({ name: 'update', params: { num: board.num } })
              "
              >UPDATE</v-btn
            >
            <v-btn
              color="error"
              @click="deleteBoard"
              v-if="board.writer === store.state.user.username"
              >DELETE</v-btn
            >
            <v-btn
              v-if="store.state.user.username !== null"
              color="success"
              @click="
                router.push({ name: 'reply', params: { num: board.num } })
              "
              >REPLY</v-btn
            >
          </td>
        </tr>
      </v-table>
    </v-sheet>
    <v-row align="center" class="a" v-if="store.state.user.username !== null">
      <v-text-field label="comment" v-model="inComment" />
      <v-btn color="success" size="x-small" @click="saveComment">SAVE</v-btn>
    </v-row>
    <CommentList :comments="comments" @getComment="getComment" />
  </div>
</template>

<script setup>
import CommentList from '@/components/CommentList.vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { ref } from 'vue';
const store = useStore();
const router = useRouter();
const route = useRoute();
let board = ref({});
let inComment = ref(null);
let comments = ref([]);
let files = ref([]);
const getComment = (num) => {
  fetch('http://localhost/api/commentList/' + num, {
    headers: {
      'Content-Type': 'application/json',
      // Authorization: 'Bearer ' + this.$store.state.user.token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      comments.value = data;
    });
};
const originalName = (filename) => {
  return filename.substr(filename.lastIndexOf('_') + 1);
};
const initLoad = () => {
  fetch('http://localhost/api/detailForm/' + route.params.num, {
    headers: {
      'Content-Type': 'application/json',
      // Authorization: 'Bearer ' + this.$store.state.user.token,
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error('error', res);
      return res.json();
    })
    .then((data) => {
      board.value = data;
      fetch('http://localhost/api/board/attachList/' + route.params.num, {
        headers: {
          'Content-Type': 'application/json',
          // Authorization: 'Bearer ' + this.$store.state.user.token,
        },
      })
        .then((res) => res.json())
        .then((data) => (files.value = data));
    })
    .catch((res) => {
      console.log('error res', res);
      alert('data not found');
      router.push({ name: 'BoardListPage' });
    });
  getComment(route.params.num);
};
initLoad();
const fileDelete = (filename) => {
  fetch('http://localhost/api/board/deleteFile/?filename=' + filename, {
    headers: {
      'Content-Type': 'application/json',
      // Authorization: 'Bearer ' + this.$store.state.user.token,
    },
  }).then((res) => {
    if (res.ok) {
      fetch('http://localhost/api/board/attachList/' + route.params.num, {
        headers: {
          'Content-Type': 'application/json',
          // Authorization: 'Bearer ' + this.$store.state.user.token,
        },
      })
        .then((res) => res.json())
        .then((data) => (files.value = data));
    }
  });
};
const download = (filename) => {
  fetch('http://localhost/api/board/downloadFile/?filename=' + filename, {
    // Authorization: 'Bearer ' + this.$store.state.user.token,
  })
    .then((res) => res.blob())
    .then((data) => {
      let a = document.createElement('a');
      a.href = window.URL.createObjectURL(data);
      a.download = originalName(filename);
      a.click();
    });
};

const deleteBoard = () => {
  if (confirm('삭제하시겠습니까?')) {
    fetch('http://localhost/api/board/delete/', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: 'Bearer ' + this.$store.state.user.token,
      },
      body: JSON.stringify({
        num: board.value.num,
        count: board.value.count,
      }),
    }).then((res) => {
      if (res.ok) {
        alert('삭제완료');
        router.push({ name: 'home' });
      }
    });
  }
};
const saveComment = () => {
  fetch('http://localhost/api/board/comment', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: 'Bearer ' + this.$store.state.user.token,
    },
    body: JSON.stringify({
      bnum: board.value.num,
      replytext: inComment.value,
      replyer: store.getters.getUsername,
    }),
  }).then((res) => {
    if (res.ok) {
      inComment.value = '';
      getComment(board.value.num);
    }
  });
};
</script>
