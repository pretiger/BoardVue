<template>
  <v-sheet width="450" class="mx-auto" style="margin: 100px">
    <v-toolbar flat>
      <v-toolbar-title style="text-align: center">JOIN</v-toolbar-title>
    </v-toolbar>

    <v-text-field v-model="username" label="Username" ref="pass" />
    <v-text-field v-model="password" label="Password" type="password" />
    <v-text-field v-model="email" label="Email" type="email" />
    <v-select
      v-model="role"
      label="Role"
      :items="['ROLE_USER', 'ROLE_ADMIN']"
    ></v-select>
    <v-btn type="button" block class="mt-4" color="primary" @click="login"
      >Save</v-btn
    >
  </v-sheet>
</template>
<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
const router = useRouter();
let pass = ref(null);
const store = useStore();
let username = ref(null);
let password = ref(null);
let email = ref(null);
let role = ref(null);
onMounted(() => pass.value.focus());
const login = () => {
  fetch('http://localhost/auth/insert', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
      email: email.value,
      role: role.value,
    }),
  }).then((res) => {
    console.log('res', res);
    if (res.ok) {
      console.log('User create success!');
      fetch('http://localhost/auth/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username.value,
          password: password.value,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('loginsuccess', data);
          store.commit('changeUser', data);
          router.push({ name: 'home' });
        });
    }
  });
};
</script>
