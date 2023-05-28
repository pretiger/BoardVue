<template>
  <v-list>
    <v-list-item v-for="(comment, i) in props.comments" :key="i">
      <template v-slot:prepend>
        <v-list-item-title>{{ comment.replytext }}</v-list-item-title>
      </template>
      <template v-slot:append>
        <v-list-item-subtitle
          >writer:{{ comment.replyer }}</v-list-item-subtitle
        >
        <v-btn
          v-if="comment.replyer === store.state.user.username"
          color="error"
          size="x-small"
          @click="
            () => {
              deleteComment(comment.rnum, comment.bnum);
            }
          "
          >Delete</v-btn
        >
      </template>
    </v-list-item>
  </v-list>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const props = defineProps({
  comments: {
    type: Array,
    required: true,
  },
});
const emit = defineEmits(['getComment']);
const deleteComment = (rnum, bnum) => {
  fetch('http://localhost/api/deleteComment/' + rnum, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: 'Bearer ' + this.$store.state.user.token,
    },
  }).then((res) => {
    if (res.ok) {
      emit('getComment', bnum);
    }
  });
};
</script>
