<template>
  <v-container fill-height style="max-width: 450px">
    <v-layout align-center row wrap>
      <v-flex xs12>
        <v-card>
          <v-toolbar flat>
            <v-toolbar-title>LOGIN</v-toolbar-title>
          </v-toolbar>
          <div class="pa-3">
            <v-text-field v-model="username" label="username" ref="pass">
            </v-text-field>
            <v-text-field v-model="password" type="password" label="password">
            </v-text-field>
            <v-btn color="primary" depressd block large @click="login"
              >LOGIN</v-btn
            >
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      username: null,
      password: null,
      users: [],
      pass: null,
    };
  },
  mounted() {
    this.$refs.pass.focus();
  },
  methods: {
    login() {
      fetch('http://localhost/auth/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.id !== 0) {
            this.$store.dispatch('changeUser', data);
            this.$store.commit('changeItem', true);
            this.$router.push('/');
          } else {
            alert('username or password mismatch');
            this.username = null;
            this.password = null;
            this.$refs.pass.focus();
          }
        });
    },
  },
};
</script>

<style></style>
