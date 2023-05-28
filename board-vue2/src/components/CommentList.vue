<template>
  <v-list>
    <v-list-item-group v-model="selectedItem" color="primary">
      <v-list-item v-for="(comment, i) in comments" :key="i">
        <v-list-item-content>
          <v-list-item-title>{{ comment.replytext }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-list-item-subtitle
            >writer:{{ comment.replyer }}</v-list-item-subtitle
          >
          <v-btn
            v-if="comment.replyer === $store.state.user.username"
            color="error"
            x-small
            @click="
              () => {
                deleteComment(comment.rnum, comment.bnum);
              }
            "
            >Delete</v-btn
          >
        </v-list-item-action>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  props: {
    comments: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    selectedItem: 1,
    items: [
      { text: 'Real-Time', icon: 'mdi-clock' },
      { text: 'Audience', icon: 'mdi-account' },
      { text: 'Conversions', icon: 'mdi-flag' },
    ],
    rnum: 0,
  }),
  methods: {
    deleteComment(rnum, bnum) {
      console.log(`rnum:${rnum}, bnum:${bnum}`);
      fetch('http://localhost/api/deleteComment/' + rnum, {
        method: 'delete',
      }).then((res) => {
        if (res.ok) {
          this.$emit('getComment', bnum);
        }
      });
    },
  },
};
</script>

<style></style>
