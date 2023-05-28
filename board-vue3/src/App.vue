<template>
  <v-app id="inspire">
    <v-app-bar color="primary">
      <v-app-bar-nav-icon @click="changeVal"></v-app-bar-nav-icon>
      <v-toolbar-title
        ><router-link to="/" style="text-decoration: none; color: aliceblue"
          >Board</router-link
        ></v-toolbar-title
      >
      <template v-slot:append>
        <v-toolbar-title v-if="store.getters.getUsername !== null">
          <v-btn
            variant="outlined"
            size="small"
            color="success"
            @click="router.push('/write')"
            >Board Write</v-btn
          >
          {{ store.getters.getUsername }} logging
          <v-btn
            type="button"
            variant="outlined"
            size="x-small"
            color="red"
            @click="logout"
            >logout</v-btn
          >
        </v-toolbar-title>
      </template>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer">
      <v-toolbar-title>
        <v-icon
          size="small"
          color="purple-darken-2"
          icon="mdi-dialpad"
        ></v-icon>
        <v-btn variant="text" @click="router.push('/login')">Login</v-btn>
      </v-toolbar-title>
      <v-toolbar-title>
        <v-icon size="small" icon="mdi-account"></v-icon>
        <v-btn variant="text" @click="router.push('/join')">Join</v-btn>
      </v-toolbar-title>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const router = useRouter();
let drawer = ref(true);
const changeVal = () => (drawer.value = !drawer.value);
const logout = () => {
  console.log('logout clicked');
  store.commit('initUser');
};
</script>
