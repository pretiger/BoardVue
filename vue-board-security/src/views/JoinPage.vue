<template>
  <v-container fill-height style="max-width: 500px">
    <v-layout align-center row wrap>
      <v-flex xs12>
        <v-card>
          <v-toolbar flat>
            <v-toolbar-title>Member Join</v-toolbar-title>
          </v-toolbar>
          <div class="pa-3">
            <v-text-field v-model="username" label="username" />
            <v-text-field v-model="password" type="password" label="password" />
            <v-text-field v-model="email" label="email" />
            <v-select v-model="role" :items="select" label="role" />
            <v-btn color="primary" depressd block large @click="save"
              >Save</v-btn
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
      email: null,
      role: null,
      select: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_GUEST'],
      users: [],
    };
  },
  methods: {
    save() {
      console.log(this.username, this.password, this.email, this.role);
      fetch('http://localhost/auth/insert', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
          email: this.email,
          role: this.role,
        }),
      }).then((res) => {
        if (res.ok) {
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
              if (data.id !== 0) {
                this.$store.dispatch('changeUser', data);
                this.$router.push('/');
              } else {
                alert('username or password mismatch');
              }
            });
        } else {
          alert('username or password create fail');
        }
      });
    },
  },
};
</script>

<style></style>
